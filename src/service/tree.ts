// Which processes are OpenChamber's, and what they are. Pure, so it is tested.
import type { RawProcess } from './parse.ts';
import type { DevServer, GroupId, Percent, ProcessGroup, ProcessRow } from '../shared/snapshot.ts';

export const GROUP_PROCESS_LIMIT = 60;
const COMMAND_MAX = 400;

export interface TreeMember {
  process: RawProcess;
  /** 0 for the root, 1 for its children, and so on. */
  depth: number;
  /** The root's child this process descends from; the root's own pid for the root. */
  branch: number;
}

const normalizedName = (name: string): string => name.replace(/^-/, '').replace(/\.exe$/i, '').toLowerCase();

export const isOpenCodeName = (name: string): boolean => /^opencode(-cli)?$/.test(normalizedName(name));

const SHELLS = new Set(['zsh', 'bash', 'sh', 'fish', 'dash', 'ksh', 'tcsh', 'csh', 'nu', 'pwsh', 'powershell', 'cmd', 'elvish', 'xonsh']);
export const isShellName = (name: string): boolean => SHELLS.has(normalizedName(name));

const childrenOf = (processes: readonly RawProcess[]): Map<number, RawProcess[]> => {
  const children = new Map<number, RawProcess[]>();
  for (const process of processes) {
    // pid 0 on Windows lists itself as its own parent.
    if (process.pid === process.ppid) continue;
    const list = children.get(process.ppid) ?? [];
    list.push(process);
    children.set(process.ppid, list);
  }
  return children;
};

/**
 * Everything under `rootPid`, the process that started this service.
 * The service's own children (the `ps` it is running right now) are left
 * out; the service itself stays, so its own cost is visible.
 */
export const collectTree = (processes: readonly RawProcess[], rootPid: number, selfPid: number): Map<number, TreeMember> => {
  const byPid = new Map(processes.map((process) => [process.pid, process]));
  const children = childrenOf(processes);
  const members = new Map<number, TreeMember>();
  const root = byPid.get(rootPid);
  if (!root) return members;
  const stack: TreeMember[] = [{ process: root, depth: 0, branch: rootPid }];
  while (stack.length > 0) {
    const member = stack.pop();
    if (!member || members.has(member.process.pid)) continue;
    members.set(member.process.pid, member);
    if (member.process.pid === selfPid) continue;
    for (const child of children.get(member.process.pid) ?? []) {
      // Windows keeps a dead parent's pid on its children and reuses pids, so a
      // process older than its "parent" belongs to someone else.
      const { startedAt: childStart } = child;
      const { startedAt: parentStart } = member.process;
      if (childStart !== undefined && parentStart !== undefined && childStart < parentStart) continue;
      stack.push({ process: child, depth: member.depth + 1, branch: member.depth === 0 ? child.pid : member.branch });
    }
  }
  return members;
};

const servesOpenCode = (name: string, command: string): boolean => isOpenCodeName(name) && /\sserve(\s|$)/.test(command);

/**
 * A child of the root is OpenCode when it is OpenCode, or a thin wrapper
 * (Windows starts `opencode.cmd` through cmd) whose own child serves it.
 * Other shells under the root are the built-in terminal.
 */
export const classifyBranches = (
  members: ReadonlyMap<number, TreeMember>,
  commands: ReadonlyMap<number, string>,
): Map<number, GroupId> => {
  const groups = new Map<number, GroupId>();
  for (const member of members.values()) {
    if (member.depth !== 1) continue;
    const { pid, name } = member.process;
    if (isOpenCodeName(name)) { groups.set(pid, 'opencode'); continue; }
    const wrapsOpenCode = [...members.values()].some((other) => other.branch === pid && other.depth === 2
      && servesOpenCode(other.process.name, commands.get(other.process.pid) ?? ''));
    if (wrapsOpenCode) groups.set(pid, 'opencode');
    else groups.set(pid, isShellName(name) ? 'terminals' : 'app');
  }
  return groups;
};

const RUNTIMES = new Set(['node', 'bun', 'deno', 'python', 'python3', 'ruby', 'php', 'java', 'npm', 'pnpm', 'yarn', 'npx', 'bunx', 'uv', 'go', 'cargo', 'dotnet']);

/** A readable name for a listening process: `vite` for `node .../vite/bin/vite.js dev`. */
export const describeProcess = (name: string, command: string): string => {
  const base = normalizedName(name);
  if (!RUNTIMES.has(base)) return name.replace(/\.exe$/i, '');
  const args = command.trim().split(/\s+/).slice(1).filter((arg) => !arg.startsWith('-'));
  const first = args[0] === 'run' || args[0] === 'exec' || args[0] === 'x' ? args[1] : args[0];
  if (!first) return base;
  const script = first.replace(/^.*[\\/]/, '').replace(/\.(c|m)?(j|t)s$|\.py$/, '');
  // `.../next/dist/bin/next`, `.../bin/cli.js`: the package name says more than `cli`.
  if (['cli', 'index', 'main', 'bin', 'start'].includes(script)) {
    const parts = first.split(/[\\/]/);
    const pkg = parts.lastIndexOf('node_modules');
    if (pkg >= 0 && parts[pkg + 1]) return parts[pkg + 1]?.startsWith('@') ? `${parts[pkg + 1]}/${parts[pkg + 2] ?? ''}` : parts[pkg + 1] ?? base;
  }
  return script || base;
};

const trimCommand = (command: string): string => (command.length > COMMAND_MAX ? `${command.slice(0, COMMAND_MAX - 1)}…` : command);

interface BuildInput {
  members: ReadonlyMap<number, TreeMember>;
  processes: readonly RawProcess[];
  rootPid: number;
  selfPid: number;
  cpu: ReadonlyMap<number, Percent | null>;
  commands: ReadonlyMap<number, string>;
  ports: ReadonlyMap<number, number[]>;
}

export interface TreeView {
  rootName: string;
  cpu: Percent;
  memory: number;
  groups: ProcessGroup[];
  servers: DevServer[];
  outside: ProcessRow[];
}

const GROUP_ORDER: GroupId[] = ['app', 'opencode', 'terminals'];

export const buildTreeView = ({ members, processes, rootPid, selfPid, cpu, commands, ports }: BuildInput): TreeView => {
  const branches = classifyBranches(members, commands);
  const groupOf = (member: TreeMember): GroupId => (member.depth === 0 ? 'app' : branches.get(member.branch) ?? 'app');
  const children = childrenOf(processes);
  const byPid = new Map(processes.map((process) => [process.pid, process]));
  const row = (process: RawProcess, depth: number): ProcessRow => ({
    pid: process.pid,
    ppid: process.ppid,
    name: process.pid === selfPid ? 'Resource Monitor' : process.name.replace(/\.exe$/i, ''),
    // The service's command line is the app's runtime running this package: noise.
    command: process.pid === selfPid ? '' : trimCommand(commands.get(process.pid) ?? ''),
    cpu: cpu.get(process.pid) ?? null,
    memory: process.memory,
    depth,
    // The service's own loopback port is how OpenChamber talks to it, not a server of yours.
    ports: process.pid === selfPid ? [] : [...(ports.get(process.pid) ?? [])].sort((a, b) => a - b),
  });

  // Subtree totals inside the tree, for dev servers and the outside list.
  const subtree = (pid: number, inTree: boolean): { cpu: number; memory: number } => {
    let total = { cpu: 0, memory: 0 };
    const stack = [pid];
    const seen = new Set<number>();
    while (stack.length > 0) {
      const current = stack.pop();
      if (current === undefined || seen.has(current)) continue;
      seen.add(current);
      const process = byPid.get(current);
      if (!process || (inTree && !members.has(current))) continue;
      total = { cpu: total.cpu + (cpu.get(current) ?? 0), memory: total.memory + process.memory };
      if (current === selfPid) continue;
      for (const child of children.get(current) ?? []) stack.push(child.pid);
    }
    return total;
  };

  const groups: ProcessGroup[] = [];
  for (const id of GROUP_ORDER) {
    const inGroup = [...members.values()].filter((member) => groupOf(member) === id);
    if (inGroup.length === 0) continue;
    // The app group starts at the root; the others at the root's children that lead them.
    const tops = inGroup
      .filter((member) => (id === 'app' ? member.depth === 0 : member.depth === 1))
      .sort((a, b) => b.process.memory - a.process.memory);
    // Depth-first, heaviest sibling first, so the expensive branch reads top-down.
    const ordered: ProcessRow[] = [];
    const visit = (member: TreeMember, depth: number): void => {
      ordered.push(row(member.process, depth));
      if (member.process.pid === selfPid) return;
      const kids = (children.get(member.process.pid) ?? [])
        .map((child) => members.get(child.pid))
        .filter((child): child is TreeMember => child !== undefined && groupOf(child) === id)
        .sort((a, b) => b.process.memory - a.process.memory);
      for (const kid of kids) visit(kid, depth + 1);
    };
    for (const top of tops) visit(top, 0);
    const totalCpu = inGroup.reduce((sum, member) => sum + (cpu.get(member.process.pid) ?? 0), 0);
    const totalMemory = inGroup.reduce((sum, member) => sum + member.process.memory, 0);
    groups.push({
      id,
      cpu: totalCpu,
      memory: totalMemory,
      processes: ordered.slice(0, GROUP_PROCESS_LIMIT),
      hidden: Math.max(0, ordered.length - GROUP_PROCESS_LIMIT),
    });
  }

  // The OpenCode server answers the app on a port too; that is not a dev server.
  const openCodeServers = new Set([...members.values()]
    .filter((member) => isOpenCodeName(member.process.name) && groupOf(member) === 'opencode'
      && (member.depth === 1 || servesOpenCode(member.process.name, commands.get(member.process.pid) ?? '')))
    .map((member) => member.process.pid));
  // Dev servers are what agents and the terminal started. The app's own children
  // (other extensions' services, tunnel helpers) listen on ports too, but they are
  // OpenChamber's plumbing and stay in its process list.
  const servers: DevServer[] = [];
  for (const member of members.values()) {
    const listening = ports.get(member.process.pid);
    const { pid, name } = member.process;
    if (!listening?.length || groupOf(member) === 'app' || openCodeServers.has(pid)) continue;
    const command = commands.get(pid) ?? '';
    servers.push({
      pid,
      name: describeProcess(name, command),
      executable: name.replace(/\.exe$/i, ''),
      command: trimCommand(command),
      ports: [...listening].sort((a, b) => a - b),
      group: groupOf(member),
      ...subtree(pid, true),
    });
  }
  servers.sort((a, b) => (a.ports[0] ?? 0) - (b.ports[0] ?? 0));

  const outside = processes
    .filter((process) => !members.has(process.pid) && isOpenCodeName(process.name))
    // A child opencode under another opencode is the same instance's helper.
    .filter((process) => !isOpenCodeName(byPid.get(process.ppid)?.name ?? ''))
    .map((process) => ({ ...row(process, 0), ...subtree(process.pid, false) }))
    .sort((a, b) => b.memory - a.memory);

  const total = subtree(rootPid, true);
  return {
    rootName: members.get(rootPid)?.process.name.replace(/\.exe$/i, '') ?? 'OpenChamber',
    cpu: total.cpu,
    memory: total.memory,
    groups,
    servers,
    outside,
  };
};
