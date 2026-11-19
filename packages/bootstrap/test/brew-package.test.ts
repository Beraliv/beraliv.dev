import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { brewPackage } from '../src/deps/brew.ts';
import { createContext, type ExecResult } from '../src/context.ts';

const ok = (stdout = ''): ExecResult => ({ code: 0, stdout, stderr: '' });
const fail: ExecResult = { code: 1, stdout: '', stderr: 'not installed' };
const exists = (path: string) => access(path).then(() => true, () => false);

async function makeApp() {
  const dir = await mkdtemp(join(tmpdir(), 'bootstrap-test-'));
  const app = join(dir, 'Docker.app');
  await mkdir(app);
  return app;
}

test('unmanaged app is removed, uninstalled, then installed with brew', async () => {
  const app = await makeApp();
  const calls: string[] = [];
  const ctx = createContext(async (cmd, args = []) => {
    calls.push([cmd, ...args].join(' '));
    return args[0] === 'uninstall' ? fail : ok();
  });
  const dep = brewPackage({ id: 'chrome', name: 'Chrome', dependsOn: ['homebrew'], kind: 'cask', token: 'google-chrome', app });

  assert.deepEqual(await dep.check(ctx), { status: 'missing', detail: `${app} is not managed by Homebrew` });
  await dep.install(ctx);

  assert.equal(await exists(app), false);
  assert.deepEqual(calls.slice(1), [
    'brew uninstall --cask google-chrome',
    'brew install --cask google-chrome',
  ]);
});

test('checkOutdated false only checks presence and never runs brew outdated', async () => {
  const app = await makeApp();
  const calls: string[] = [];
  const ctx = createContext(async (cmd, args = []) => {
    calls.push([cmd, ...args].join(' '));
    return fail;
  });
  const dep = brewPackage({
    id: 'docker',
    name: 'Docker',
    dependsOn: ['homebrew'],
    kind: 'cask',
    token: 'docker',
    app,
    checkOutdated: false,
  });

  assert.deepEqual(await dep.check(ctx), { status: 'ok' });
  assert.equal(await exists(app), true);
  assert.equal(calls.some((c) => c.includes('outdated')), false);
});
