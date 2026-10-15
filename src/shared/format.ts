// Number formatting shared by the panel and the Work Status section.
import type { GroupId } from './snapshot.ts';

let locale = 'en';
export const setLocale = (next: string): void => {
  locale = next || 'en';
};

const number = (value: number, digits: number): string => new Intl.NumberFormat(locale, {
  minimumFractionDigits: digits,
  maximumFractionDigits: digits,
}).format(value);

/** 1024-based, the way Activity Monitor and Task Manager count. */
export const formatBytes = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = Math.max(0, bytes);
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  const digits = unit >= 3 && value < 100 ? 1 : 0;
  return `${number(value, digits)} ${units[unit]}`;
};

export const formatPercent = (value: number | null): string => {
  if (value === null) return '–';
  if (value > 0 && value < 0.1) return '<0.1%';
  return `${number(value, value < 10 ? 1 : 0)}%`;
};

export const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86_400);
  const hours = Math.floor((seconds % 86_400) / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  if (days > 0) return `${days} d ${hours} h`;
  if (hours > 0) return `${hours} h ${minutes} min`;
  return `${minutes} min`;
};

/**
 * The arguments of a command line, without the executable's path: the row
 * already names the process. `/usr/local/bin/node server.js --port 3000`
 * reads `server.js --port 3000`. A command that doesn't start with the
 * process's own path is returned whole.
 */
export const commandArguments = (name: string, command: string): string => {
  const unquoted = command.replace(/^"([^"]+)"/, '$1');
  if (!name || !/^([A-Za-z]:)?[\\/]/.test(unquoted)) return command;
  let index = -1;
  // `.../OpenChamber Helper.app/Contents/MacOS/OpenChamber Helper --type=gpu`: the
  // executable is the occurrence followed by its arguments, not the bundle folder.
  while ((index = unquoted.indexOf(name, index + 1)) >= 0) {
    if (!/[\\/]/.test(unquoted[index - 1] ?? '')) continue;
    const after = unquoted.slice(index + name.length).replace(/^\.exe/i, '');
    if (after === '' || after.startsWith(' ')) return after.trim();
  }
  return command;
};

export const platformName = (platform: string): string => {
  if (platform === 'darwin') return 'macOS';
  if (platform === 'win32') return 'Windows';
  if (platform === 'linux') return 'Linux';
  return platform;
};

export const GROUP_LABELS: Record<GroupId, string> = {
  app: 'OpenChamber',
  opencode: 'OpenCode',
  terminals: 'Terminal',
};

/** Who started a dev server, in the words the user knows. */
export const SERVER_ORIGIN: Record<GroupId, string> = {
  app: 'OpenChamber',
  opencode: 'Agent',
  terminals: 'Terminal',
};

// The machine's series use status colours, which differ in every theme.
// OpenChamber's parts are shades of the theme's primary colour, so the
// footprint reads as one thing split in three.
export const COLORS = {
  cpu: 'var(--oc-info)',
  memory: 'var(--oc-success)',
  app: 'var(--oc-primary)',
  opencode: 'color-mix(in srgb, var(--oc-primary) 50%, var(--oc-fg))',
  terminals: 'var(--oc-muted)',
} as const;
