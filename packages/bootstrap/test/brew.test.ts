import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseBrewOutdated, createContext } from '../src/context.ts';

test('parseBrewOutdated reads formulae and casks', () => {
  const json = JSON.stringify({
    formulae: [{ name: 'ffmpeg', installed_versions: ['7.0'], current_version: '7.1' }],
    casks: [{ token: 'google-chrome', installed_versions: '140.0', current_version: '141.0' }],
  });
  const out = parseBrewOutdated(json);
  assert.deepEqual(out.formulae.get('ffmpeg'), { installed: '7.0', current: '7.1' });
  assert.deepEqual(out.casks.get('google-chrome'), { installed: '140.0', current: '141.0' });
});

test('brewOutdated runs brew once and is memoized', async () => {
  let calls = 0;
  const ctx = createContext(async () => {
    calls++;
    return { code: 0, stdout: '{"formulae":[],"casks":[]}', stderr: '' };
  });
  await ctx.brewOutdated();
  await ctx.brewOutdated();
  assert.equal(calls, 1);
});
