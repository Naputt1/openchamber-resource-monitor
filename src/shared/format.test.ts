import { describe, expect, test } from 'bun:test';

import { commandArguments, formatBytes, formatPercent } from './format.ts';

describe('commandArguments', () => {
  test('drops the executable path the row already names', () => {
    expect(commandArguments('node', '/usr/local/bin/node /repo/node_modules/.bin/vite --port 5173')).toBe('/repo/node_modules/.bin/vite --port 5173');
    expect(commandArguments('Python', '/Applications/Xcode.app/Contents/Developer/Library/Frameworks/Python3.framework/Versions/3.9/Resources/Python.app/Contents/MacOS/Python -m http.server 8799'))
      .toBe('-m http.server 8799');
    expect(commandArguments('OpenChamber Helper (GPU)', '/Applications/OpenChamber.app/Contents/Frameworks/OpenChamber Helper (GPU).app/Contents/MacOS/OpenChamber Helper (GPU) --type=gpu-process'))
      .toBe('--type=gpu-process');
    expect(commandArguments('node', '"C:\\Program Files\\nodejs\\node.exe" vite')).toBe('vite');
    expect(commandArguments('opencode', '/Users/me/.opencode/bin/opencode')).toBe('');
  });

  test('keeps commands that do not start with the process path', () => {
    expect(commandArguments('bun', 'bun server/index.js --port 3917')).toBe('bun server/index.js --port 3917');
    expect(commandArguments('zsh', '-zsh')).toBe('-zsh');
    expect(commandArguments('node', '/opt/other/runtime script.js')).toBe('/opt/other/runtime script.js');
  });
});

describe('formatting', () => {
  test('bytes and percents', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(340 * 1024 * 1024)).toBe('340 MB');
    expect(formatBytes(12.94 * 1024 ** 3)).toBe('12.9 GB');
    expect(formatPercent(null)).toBe('–');
    expect(formatPercent(0.04)).toBe('<0.1%');
    expect(formatPercent(4.25)).toBe('4.3%');
    expect(formatPercent(44.4)).toBe('44%');
  });
});
