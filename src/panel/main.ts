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
const cores = el('div', 'cores');
cpu.card.append(cores);
const memory = statCard('Memory', COLORS.memory, formatBytes);
const memoryShare = el('div', 'stack');
memory.card.append(memoryShare);

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
  el('div', 'section-head', '', [el('span', 'label', 'Processes'), el('span', 'grow')]),
  el('div', 'head-cells', '', [el('b'), el('span', '', 'CPU'), el('span', '', 'Memory')]),
  groupsBox,
]);

const outsideBox = el('div');
const outsideSection = el('div', 'section', '', [
  el('div', 'section-head', '', [el('span', 'label', 'OpenCode outside OpenChamber')]),
  outsideBox,
]);
outsideSection.hidden = true;

const footnote = el('div', 'footnote', 'CPU is a share of the whole machine, so rows add up. Memory is resident memory: pages a process shares with others count in each of them.');

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

const processRow = (process: ProcessRow, largest: number, color: string): HTMLElement => {
  const who = el('div', 'who');
  who.style.paddingInlineStart = `${process.depth * 14}px`;
  if (process.depth > 0) who.append(el('span', 'tick'));
  who.append(el('span', 'pname', process.name));
  for (const port of process.ports) who.append(el('span', 'port', `:${port}`));
  const args = commandArguments(process.name, process.command);
  if (args) who.append(el('span', 'pcmd', args));
  const bar = el('i');
  bar.style.width = `${Math.max(2, (process.memory / Math.max(1, largest)) * 100)}%`;
  bar.style.background = color;
  const mem = el('span', 'cell mem num', formatBytes(process.memory), [bar]);
  const row = el('div', 'proc', '', [who, el('span', 'cell num', formatPercent(process.cpu)), mem]);
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

const renderGroup = (group: GroupLike, label: string, color: string): HTMLElement => {
  const details = document.createElement('details');
  details.className = 'group';
  details.open = openGroups.has(group.id);
  details.addEventListener('toggle', () => {
    if (details.open) openGroups.add(group.id);
    else openGroups.delete(group.id);
  });
  const swatch = el('span', 'swatch');
  swatch.style.background = color;
  const total = group.processes.length + group.hidden;
  const name = el('span', 'name', label, [el('span', 'count', `${total}`)]);
  const summary = document.createElement('summary');
  summary.append(chevron(), swatch, name, el('span', 'num muted', formatPercent(group.cpu)), el('span', 'num', formatBytes(group.memory)));
  const largest = Math.max(0, ...group.processes.map((process) => process.memory));
  const rows = el('div', 'rows', '', group.processes.map((process) => processRow(process, largest, color)));
  if (group.hidden > 0) rows.append(el('div', 'more', `${group.hidden} more, smaller processes not shown`));
  details.append(summary, rows);
  return details;
};

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
  cores.replaceChildren(...system.perCore.map((value) => {
    const fill = el('span');
    fill.style.height = `${Math.max(4, value)}%`;
    fill.style.background = COLORS.cpu;
    const core = el('div', 'core', '', [fill]);
    core.title = formatPercent(value);
    return core;
  }));

  // Memory
  memory.value.textContent = formatBytes(system.memoryUsed);
  memory.side.textContent = formatPercent((system.memoryUsed / Math.max(1, system.memoryTotal)) * 100);
  memory.sub.textContent = `of ${formatBytes(system.memoryTotal)} · ${formatBytes(Math.max(0, system.memoryTotal - system.memoryUsed))} free`;
  memory.chart.update(snapshot.history.system.memory, system.memoryTotal);
  const appInUsed = Math.min(app.memory, system.memoryUsed);
  renderStack(memoryShare, [
    { value: appInUsed, color: COLORS.app, label: `OpenChamber ${formatBytes(app.memory)}` },
    { value: system.memoryUsed - appInUsed, color: COLORS.memory, label: `Everything else ${formatBytes(system.memoryUsed - appInUsed)}` },
  ], system.memoryTotal);

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
  groupsBox.replaceChildren(...app.groups.map((group) => renderGroup(group, GROUP_LABELS[group.id], groupColor(group.id))));

  // OpenCode elsewhere on this machine
  outsideSection.hidden = snapshot.outside.length === 0;
  if (snapshot.outside.length > 0) {
    const cpuSum = snapshot.outside.reduce((sum, row) => sum + (row.cpu ?? 0), 0);
    const memorySum = snapshot.outside.reduce((sum, row) => sum + row.memory, 0);
    // Each row already carries its children's totals.
    outsideBox.replaceChildren(renderGroup(
      { id: 'outside', cpu: cpuSum, memory: memorySum, processes: snapshot.outside, hidden: 0 },
      'OpenCode',
      'var(--oc-muted)',
    ));
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
