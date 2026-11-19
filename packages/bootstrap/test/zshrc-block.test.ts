import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildBlock, upsertBlock, findBlock, BEGIN, END } from '../src/zshrc-block.ts';

const snippets = [{ id: 'nvm', body: 'export NVM_DIR=1' }];

test('upsertBlock appends to a file without a managed block', () => {
  const out = upsertBlock('alias ll=ls\n', buildBlock(snippets));
  assert.equal(out, `alias ll=ls\n\n${buildBlock(snippets)}\n`);
});

test('upsertBlock is idempotent', () => {
  const once = upsertBlock('', buildBlock(snippets));
  assert.equal(upsertBlock(once, buildBlock(snippets)), once);
});

test('upsertBlock replaces stale content and keeps lines outside the markers', () => {
  const source = `before\n${BEGIN}\nold\n${END}\nafter\n`;
  const out = upsertBlock(source, buildBlock(snippets));
  assert.equal(out, `before\n${buildBlock(snippets)}\nafter\n`);
  assert.equal(findBlock(out), buildBlock(snippets));
});
