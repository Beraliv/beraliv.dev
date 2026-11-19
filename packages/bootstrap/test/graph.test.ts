import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GRAPH, levels } from '../src/graph.ts';
import { registry } from '../src/deps/index.ts';

test('levels groups dependencies by depth', () => {
  const lv = levels({ a: [], b: ['a'], c: ['a'], d: ['b', 'c'] });
  assert.deepEqual(lv, [['a'], ['b', 'c'], ['d']]);
});

test('levels rejects cycles', () => {
  assert.throws(() => levels({ a: ['b'], b: ['a'] }), /cycle/);
});

test('levels rejects self-dependency and unknown ids', () => {
  assert.throws(() => levels({ a: ['a'] }), /itself/);
  assert.throws(() => levels({ a: ['x'] }), /unknown/);
});

test('registry covers every graph id exactly once', () => {
  const ids = registry.map((d) => d.id).sort();
  assert.deepEqual(ids, Object.keys(GRAPH).sort());
});

test('each dependency declares the same edges as the graph', () => {
  for (const dep of registry) {
    assert.deepEqual([...dep.dependsOn].sort(), [...GRAPH[dep.id]].sort(), dep.id);
  }
});

test('registry order is a valid topological order', () => {
  const seen = new Set<string>();
  for (const dep of registry) {
    for (const d of dep.dependsOn) assert.ok(seen.has(d), `${dep.id} listed before ${d}`);
    seen.add(dep.id);
  }
});
