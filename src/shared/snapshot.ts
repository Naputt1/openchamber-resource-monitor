// The one answer the service gives: `GET /snapshot`. The panel and the Work
// Status section both read it, so the shape lives here and nowhere else.

/** Points of history the service keeps: three minutes at one sample every two seconds. */
export const HISTORY_POINTS = 90;

/**
 * CPU of a process, a group or a dev server counts 100 per core, as Activity
 * Monitor and `top` do, so 250 is two and a half cores busy. Only the
 * machine's own CPU (`SystemStats.cpu`) is a share of all cores, 0..100.
 */
export type Percent = number;

export type GroupId = 'app' | 'opencode' | 'terminals';

export interface ProcessRow {
  pid: number;
  ppid: number;
  name: string;
  /** Trimmed command line; empty when the OS would not tell us. */
  command: string;
  /** `null` until two samples exist. */
  cpu: Percent | null;
  /** Resident memory in bytes. */
  memory: number;
  /** Depth under the group's first process, for indentation. */
  depth: number;
  ports: number[];
}

export interface ProcessGroup {
  id: GroupId;
  cpu: Percent;
  memory: number;
  /** Tree order: a parent comes right before its children. */
  processes: ProcessRow[];
  /** Processes left out past the per-group limit. */
  hidden: number;
}

export interface DevServer {
  pid: number;
  /** What the server is: `vite` for `node .../vite.js`. */
  name: string;
  /** The process name the OS reports: `node`. */
  executable: string;
  command: string;
  ports: number[];
  group: GroupId;
  /** CPU and memory of the listening process and everything under it. */
  cpu: Percent;
  memory: number;
}

export interface Series {
  /** Oldest first, one point per sample. */
  cpu: Percent[];
  memory: number[];
}

export interface SystemStats {
  hostname: string;
  /** Node's `process.platform`: `darwin`, `linux`, `win32`, ... */
  platform: string;
  release: string;
  arch: string;
  cpuModel: string;
  cores: number;
  cpu: Percent | null;
  /** 1, 5 and 15 minute load; `null` on Windows, which has none. */
  load: [number, number, number] | null;
  memoryTotal: number;
  memoryUsed: number;
  uptimeSeconds: number;
}

export type Warning =
  /** The process list could not be read; only system numbers are shown. */
  | 'processes-unavailable'
  /** Listening ports could not be read; dev servers are not detected. */
  | 'ports-unavailable';

export interface Snapshot {
  at: number;
  intervalMs: number;
  system: SystemStats;
  app: {
    rootPid: number;
    rootName: string;
    cpu: Percent;
    memory: number;
    groups: ProcessGroup[];
  };
  /**
   * OpenCode running on this machine outside OpenChamber's tree, a TUI in
   * another terminal for example. CPU and memory include its children.
   */
  outside: ProcessRow[];
  servers: DevServer[];
  history: {
    system: Series;
    app: Series;
  };
  warnings: Warning[];
}
