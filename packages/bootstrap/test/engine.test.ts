import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkAll, applyFixes, actionFor } from '../src/engine.ts';
import { formatRow } from '../src/ui.ts';
import { createContext } from '../src/context.ts';
import type { AnyDependency, CheckResult } from "../src/dependency.ts";

const fake = (id: string, dependsOn: string[], result: CheckResult, log: string[] = []): AnyDependency =>
  ({
    id,
    name: id,
    dependsOn,
    check: async () => result,
    install: async () => {
      log.push(`install ${id}`);
    },
  }) as unknown as AnyDependency;

const ctx = createContext(async () => ({ code: 1, stdout: '', stderr: '' }));

test('checkAll returns results for every dependency', async () => {
  const deps = [fake('a', [], { status: 'ok' }), fake('b', ['a'], { status: 'missing' })];
  const report = await checkAll(deps, ctx);
  assert.equal(report.get('a')?.status, 'ok');
  assert.equal(report.get('b')?.status, 'missing');
});

test('actionFor maps statuses to actions', () => {
  const dep = fake('x', [], { status: 'ok' });
  assert.equal(actionFor(dep, { status: 'ok' }), undefined);
  assert.equal(actionFor(dep, { status: 'missing' }), 'install');
  assert.equal(actionFor(dep, { status: 'outdated' }), 'install');
});

test('applyFixes skips dependents of a failed dependency and keeps going', async () => {
  const log: string[] = [];
  const failing = { ...fake('a', [], { status: 'missing' }), install: async () => { throw new Error('boom'); } } as unknown as AnyDependency;
  const deps = [failing, fake('b', ['a'], { status: 'missing' }, log), fake('c', [], { status: 'missing' }, log)];
  const report = await checkAll(deps, ctx);
  const out: string[] = [];
  await applyFixes(deps, report, ctx, (l) => out.push(l));
  assert.deepEqual(log, ['install c']);
  assert.ok(out.some((l) => l.includes('b: skipped')));
});

test('formatRow uses the traffic-light format', () => {
  assert.equal(formatRow({ name: 'git', result: { status: 'ok', current: '2.50', latest: '2.50' } }), '🟢 git: 2.50 → 2.50');
  assert.equal(formatRow({ name: 'git', result: { status: 'outdated', current: '2.49', latest: '2.50' } }), '🔴 git: 2.49 → 2.50');
  assert.equal(formatRow({ name: 'claude', result: { status: 'needs-setup' } }), '🔴 claude: not logged in');
});
