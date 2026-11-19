#!/usr/bin/env node
// Launcher: runs the standalone binary shipped in @beraliv/bootstrap-darwin-arm64.
const { spawnSync } = require('node:child_process');

const PLATFORM_PACKAGE = '@beraliv/bootstrap-darwin-arm64';

if (process.platform !== 'darwin' || process.arch !== 'arm64') {
  console.error('@beraliv/bootstrap only supports macOS on Apple Silicon (arm64).');
  process.exit(1);
}

let binary;
try {
  binary = require.resolve(`${PLATFORM_PACKAGE}/bin/bootstrap`);
} catch {
  console.error(`Missing ${PLATFORM_PACKAGE}. Try reinstalling without --omit=optional.`);
  process.exit(1);
}

const result = spawnSync(binary, process.argv.slice(2), { stdio: 'inherit' });
process.exit(result.status ?? 1);
