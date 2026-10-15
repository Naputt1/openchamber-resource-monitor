# Resource Monitor for OpenChamber

See what your machine is doing and how much of it OpenChamber takes: CPU and memory for the whole system, for OpenChamber and OpenCode with everything they started, and for the dev servers running under them.

The rail panel has live CPU and memory charts, a per-core strip, and OpenChamber's footprint split into the app, OpenCode (with the commands, MCP servers and dev servers agents started), and the built-in terminal. Dev servers are listed with their ports, who started them, and what they cost. A short readout in the chat's Work Status panel shows the same numbers at a glance.

It only reads. Nothing in it stops or changes a process.

## Install

In OpenChamber, open Settings → Integrations and press Install on the Resource Monitor card, or add this repository's Git URL in Settings → Extensions. Approve the local service when asked: the numbers come from a small process OpenChamber starts next to the panel.

Web and desktop, on macOS, Linux and Windows. The phone app and VS Code don't load extensions.

## How it finds OpenChamber's processes

OpenChamber starts the extension's service itself, so the service's parent process is the app: the Electron main process on desktop, the server for `openchamber serve`. Everything under that process is OpenChamber's. OpenCode is the `opencode` child, and the shells under it belong to agents. Other shells under the app are the built-in terminal. A process in that tree that listens on a TCP port is a dev server, except the app's and OpenCode's own servers.

Some processes leave the tree. A server that daemonizes itself, or a container started with `docker compose up -d`, belongs to another parent and isn't shown. OpenCode started outside OpenChamber, such as a TUI in another terminal, is listed separately.

When the connected OpenChamber runs on another machine, the monitor shows that machine, where OpenCode and its dev servers actually run.

## What the numbers mean

- CPU is a share of the whole machine, all cores together, so rows add up to the totals. Activity Monitor and `top` count 100% per core instead.
- Memory is resident memory. Pages several processes share, such as Electron's, count in each of them, so the app's total runs a little high.
- System memory in use is counted the way the OS's own monitor does: app memory, wired and compressed on macOS, total minus available on Linux, used physical memory on Windows.

## Where the numbers come from

| | Processes | Ports | Memory |
| --- | --- | --- | --- |
| macOS | `ps` | `lsof` | `vm_stat` |
| Linux | `/proc` | `/proc/net/tcp` and each process's sockets | `/proc/meminfo` |
| Windows | one PowerShell kept running (`Get-CimInstance Win32_Process`) | `netstat -ano` | Node's `os` |

Sampling runs every 2 seconds while the panel or the Work Status section is on screen. Twenty seconds after the last view it stops, and so does the PowerShell helper on Windows.

## Build

```bash
bun install
bun run build   # writes panel/main.js, status/main.js and service/main.js
bun run test
bun run typecheck
```

The built files are committed: OpenChamber installs extensions without building them. Bump `version` in `package.json` to ship an update through Git.

## License

MIT
