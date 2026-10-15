import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

import { mountChart } from '../shared/chart.ts';
import { FAILURE_TEXT, POLL_MS, startPolling, type PollFailure } from '../shared/client.ts';
import {
  COLORS,
  GROUP_LABELS,
  SERVER_ORIGIN,
  commandArguments,
  formatBytes,
  formatPercent,
  formatUptime,
  platformName,
  processLabel,
  setLocale,
} from '../shared/format.ts';
import { el } from '../shared/dom.ts';
import { BASE_STYLE, PANEL_STYLE } from '../shared/style.ts';
import { HISTORY_POINTS, type DevServer, type GroupId, type ProcessRow, type Snapshot } from '../shared/snapshot.ts';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');
const style = document.createElement('style');
style.textContent = BASE_STYLE + PANEL_STYLE;
document.head.append(style);

const INTERVAL_SECONDS = POLL_MS / 1000;

// ----- Skeleton, built once -----

const banner = el('div', 'banner');
banner.hidden = true;

const hostName = el('div', 'host-name', 'This machine');
const hostMeta = el('div', 'host-meta', 'Reading…');
const live = el('div', 'live stale', 'Starting');
const head = el('div', 'head');
head.append(el('div', 'titles', '', [hostName, hostMeta]), live);

const statCard = (label: string, color: string, format: (value: number) => string) => {
  const value = el('span', 'big num', '–');
  const side = el('span', 'sub num');
  const top = el('div', 'card-top', '', [el('span', 'label', label), el('span', 'grow'), side]);
  const chart = mountChart({ color, height: 56, capacity: HISTORY_POINTS, format, intervalSeconds: INTERVAL_SECONDS });
  const sub = el('div', 'sub num');
  const card = el('div', 'card', '', [top, value, chart.element, sub]);
  return { card, value, side, sub, chart };
};

const cpu = statCard('CPU', COLORS.cpu, formatPercent);
const memory = statCard('Memory', COLORS.memory, formatBytes);

const grid = el('div', 'grid', '', [cpu.card, memory.card]);

const appValue = el('span', 'big num', '–');
const appCpuValue = el('span', 'sub num');
const appChart = mountChart({ color: COLORS.app, height: 44, capacity: HISTORY_POINTS, format: formatBytes, intervalSeconds: INTERVAL_SECONDS });
const appStack = el('div', 'stack');
const appLegend = el('div', 'legend');
const appCard = el('div', 'card', '', [
  el('div', 'card-top', '', [el('span', 'label', 'OpenChamber'), el('span', 'grow'), appCpuValue]),
  appValue,
  el('div', 'sub', 'The app, OpenCode, and everything they started'),
  appChart.element,
  appStack,
  appLegend,
]);

const serversCount = el('span', 'sub num');
const serversList = el('div', 'servers');
const serversEmpty = el('div', 'empty', 'No dev servers right now. Servers started by an agent or in the terminal show up here with their ports.');
const serversSection = el('div', 'section', '', [
  el('div', 'section-head', '', [el('span', 'label', 'Dev servers'), serversCount]),
  serversList,
  serversEmpty,
]);

const groupsBox = el('div');
const processesSection = el('div', 'section', '', [
  el('div', 'section-head', '', [el('span', 'label', 'Processes')]),
  groupsBox,
]);

const outsideBox = el('div');
const outsideSection = el('div', 'section', '', [
  el('div', 'section-head', '', [el('span', 'label', 'OpenCode outside OpenChamber')]),
  outsideBox,
]);
outsideSection.hidden = true;

const footnote = el('div', 'footnote', 'Process CPU counts 100% per core, as Activity Monitor does. The CPU card above is the whole machine. Memory is resident memory: pages a process shares with others count in each of them.');

root.append(banner, head, grid, appCard, serversSection, processesSection, outsideSection, footnote);

// ----- Rendering -----

const openGroups = new Set<string>(['app', 'opencode', 'terminals']);

const chevron = (): SVGSVGElement => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.setAttribute('class', 'chevron');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M6 4l4 4-4 4');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '1.6');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  svg.append(path);
  return svg;
};

const groupColor = (id: GroupId): string => COLORS[id];

// Below one percent of a core a number is noise; it stays readable but recedes.
const cpuCell = (value: number | null): HTMLElement => el('span', value !== null && value >= 1 ? 'cell num' : 'cell num quiet', formatPercent(value));

const processRow = (process: ProcessRow, role: 'root' | 'self' | 'other'): HTMLElement => {
  const { title, detail } = processLabel(process, role);
  const who = el('div', 'who', '', [el('span', 'pname', title)]);
  if (detail) who.append(el('span', 'pdetail', detail));
  const row = el('div', 'proc', '', [who, cpuCell(process.cpu), el('span', 'cell num', formatBytes(process.memory))]);
  row.style.setProperty('--depth', String(process.depth));
  row.title = `${process.name} · pid ${process.pid}${process.command ? `\n${process.command}` : ''}`;
  return row;
};

/** A process group, or the made-up group of OpenCode instances outside the app. */
interface GroupLike {
  id: string;
  cpu: number;
  memory: number;
  processes: ProcessRow[];
  hidden: number;
}

const renderGroup = (group: GroupLike, label: string, color: string, roleOf: (row: ProcessRow) => 'root' | 'self' | 'other'): HTMLElement => {
  const details = document.createElement('details');
  details.className = 'group';
  details.open = openGroups.has(group.id);
  details.addEventListener('toggle', () => {
    if (details.open) openGroups.add(group.id);
    else openGroups.delete(group.id);
  });
  const dot = el('span', 'dot');
  dot.style.background = color;
  const total = group.processes.length + group.hidden;
  const name = el('span', 'gname', '', [chevron(), dot, el('b', '', label), el('span', 'count', String(total))]);
  const summary = document.createElement('summary');
  summary.append(name, cpuCell(group.cpu), el('span', 'cell num', formatBytes(group.memory)));
  const rows = el('div', 'rows', '', group.processes.map((process) => processRow(process, roleOf(process))));
  if (group.hidden > 0) rows.append(el('div', 'more', `${group.hidden} smaller processes not shown`));
  details.append(summary, rows);
  return details;
};

const processTable = (groups: HTMLElement[]): HTMLElement => el('div', 'table', '', [
  el('div', 'thead', '', [el('span', '', 'Process'), el('span', 'cell', 'CPU'), el('span', 'cell', 'Memory')]),
  ...groups,
]);

const renderServer = (server: DevServer): HTMLElement => {
  const title = el('div', 'title', '', [
    ...server.ports.map((port) => el('span', 'port', `:${port}`)),
    el('b', '', server.name),
    el('span', 'origin', SERVER_ORIGIN[server.group]),
  ]);
  const stats = el('div', 'stats num', `${formatPercent(server.cpu)} · ${formatBytes(server.memory)}`);
  const row = el('div', 'server', '', [title, stats]);
  const args = commandArguments(server.executable, server.command);
  if (args) row.append(el('div', 'command', args));
  row.title = `pid ${server.pid}${server.command ? `\n${server.command}` : ''}`;
  return row;
};

const renderStack = (target: HTMLElement, parts: { value: number; color: string; label: string }[], total: number): void => {
  target.replaceChildren(...parts.filter((part) => part.value > 0).map((part) => {
    const span = el('span');
    span.style.width = `${Math.min(100, (part.value / Math.max(1, total)) * 100)}%`;
    span.style.background = part.color;
    span.title = part.label;
    return span;
  }));
};

const WARNING_TEXT = {
  'processes-unavailable': 'The process list could not be read just now. OpenChamber\'s numbers are from the last reading that worked.',
  'ports-unavailable': 'Listening ports could not be read, so dev servers are not detected.',
} as const;

let failure: PollFailure | null = null;

const render = (snapshot: Snapshot): void => {
  const { system, app } = snapshot;

  // Header
  hostName.textContent = system.hostname;
  hostMeta.textContent = [
    platformName(system.platform),
    system.arch,
    system.cpuModel,
    `up ${formatUptime(system.uptimeSeconds)}`,
  ].filter(Boolean).join(' · ');
  live.textContent = `Live · every ${INTERVAL_SECONDS} s`;
  live.classList.remove('stale');

  // CPU
  cpu.value.textContent = formatPercent(system.cpu);
  cpu.side.textContent = `${system.cores} cores`;
  cpu.sub.textContent = system.load ? `Load ${system.load.map((value) => value.toFixed(2)).join(' · ')}` : 'All cores together';
  cpu.chart.update(snapshot.history.system.cpu, 100);

  // Memory
  memory.value.textContent = formatBytes(system.memoryUsed);
  memory.side.textContent = formatPercent((system.memoryUsed / Math.max(1, system.memoryTotal)) * 100);
  memory.sub.textContent = `of ${formatBytes(system.memoryTotal)} · ${formatBytes(Math.max(0, system.memoryTotal - system.memoryUsed))} free`;
  memory.chart.update(snapshot.history.system.memory, system.memoryTotal);

  // OpenChamber footprint
  appValue.textContent = formatBytes(app.memory);
  appCpuValue.textContent = `${formatPercent(app.cpu)} CPU`;
  const appPeak = Math.max(app.memory, ...snapshot.history.app.memory);
  appChart.update(snapshot.history.app.memory, appPeak * 1.15);
  renderStack(appStack, app.groups.map((group) => ({ value: group.memory, color: groupColor(group.id), label: GROUP_LABELS[group.id] })), app.memory);
  appLegend.replaceChildren(...app.groups.map((group) => {
    const swatch = el('span', 'swatch');
    swatch.style.background = groupColor(group.id);
    const count = group.processes.length + group.hidden;
    return el('div', 'legend-row', '', [
      swatch,
      el('span', 'name', `${GROUP_LABELS[group.id]}`, [el('span', 'muted', ` · ${count} ${count === 1 ? 'process' : 'processes'}`)]),
      el('span', 'value num muted', formatPercent(group.cpu)),
      el('span', 'value num', formatBytes(group.memory)),
    ]);
  }));

  // Dev servers
  serversCount.textContent = snapshot.servers.length > 0 ? String(snapshot.servers.length) : '';
  serversList.replaceChildren(...snapshot.servers.map(renderServer));
  serversList.hidden = snapshot.servers.length === 0;
  serversEmpty.hidden = snapshot.servers.length > 0;

  // Processes
  const roleOf = (row: ProcessRow): 'root' | 'self' | 'other' => (row.pid === app.rootPid ? 'root' : row.name === 'Resource Monitor' && row.ppid === app.rootPid ? 'self' : 'other');
  groupsBox.replaceChildren(processTable(app.groups.map((group) => renderGroup(group, GROUP_LABELS[group.id], groupColor(group.id), roleOf))));

  // OpenCode elsewhere on this machine
  outsideSection.hidden = snapshot.outside.length === 0;
  if (snapshot.outside.length > 0) {
    const cpuSum = snapshot.outside.reduce((sum, row) => sum + (row.cpu ?? 0), 0);
    const memorySum = snapshot.outside.reduce((sum, row) => sum + row.memory, 0);
    // Each row already carries its children's totals.
    outsideBox.replaceChildren(processTable([renderGroup(
      { id: 'outside', cpu: cpuSum, memory: memorySum, processes: snapshot.outside, hidden: 0 },
      'OpenCode',
      'var(--oc-muted)',
      () => 'other',
    )]));
  }

  // Problems the snapshot reported
  const problems = snapshot.warnings.map((warning) => WARNING_TEXT[warning]);
  banner.hidden = problems.length === 0 && failure === null;
  banner.classList.toggle('error', false);
  banner.textContent = problems.join(' ');
};

const showFailure = (next: PollFailure): void => {
  failure = next;
  banner.hidden = false;
  banner.classList.add('error');
  banner.textContent = FAILURE_TEXT[next];
  live.textContent = 'Paused';
  live.classList.add('stale');
};

let started = false;
host.onReady((context) => {
  applyHostReady(context, document.documentElement);
  setLocale(context.locale);
  if (started) return;
  started = true;
  startPolling(host, root, (snapshot) => {
    failure = null;
    render(snapshot);
  }, showFailure);
});
