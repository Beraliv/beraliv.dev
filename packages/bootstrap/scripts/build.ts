// Builds the standalone arm64 binary and syncs the version across the npm packages.
// Requires Bun at build time only (the published binary needs no runtime).
import { execFileSync } from 'node:child_process';
import { chmodSync, copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const read = (p: string) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const write = (p: string, data: unknown) => writeFileSync(join(root, p), JSON.stringify(data, null, 2) + '\n');

const { version } = read('package.json');
const platformPkg = '@beraliv/bootstrap-darwin-arm64';

mkdirSync(join(root, 'dist'), { recursive: true });
const out = join(root, 'dist', 'bootstrap-darwin-arm64');
execFileSync('bun', ['build', 'src/cli.ts', '--compile', '--target=bun-darwin-arm64', '--outfile', out], {
  cwd: root,
  stdio: 'inherit',
});
chmodSync(out, 0o755);
execFileSync('codesign', ['--force', '--sign', '-', out], { stdio: 'inherit' });

const platform = read('npm/darwin-arm64/package.json');
write('npm/darwin-arm64/package.json', { ...platform, name: platformPkg, version });
mkdirSync(join(root, 'npm/darwin-arm64/bin'), { recursive: true });
copyFileSync(out, join(root, 'npm/darwin-arm64/bin/bootstrap'));
chmodSync(join(root, 'npm/darwin-arm64/bin/bootstrap'), 0o755);

const launcher = read('npm/bootstrap/package.json');
write('npm/bootstrap/package.json', {
  ...launcher,
  version,
  optionalDependencies: { [platformPkg]: version },
});

copyFileSync(join(root, 'scripts/install.sh'), join(root, 'dist/install.sh'));
console.log(`built ${out} (version ${version})`);
