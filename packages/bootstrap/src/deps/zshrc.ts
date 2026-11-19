import { readFile, writeFile } from 'node:fs/promises';
import { define } from '../dependency.ts';
import { zshrcPath } from '../context.ts';
import { SHELL_SNIPPETS } from '../snippets.ts';
import { buildBlock, findBlock, upsertBlock } from '../zshrc-block.ts';

const expected = () => buildBlock(SHELL_SNIPPETS);

export default define({
  id: 'zshrc',
  name: '.zshrc',
  dependsOn: [],
  async check(ctx) {
    const source = await readFile(zshrcPath(ctx), 'utf8').catch(() => undefined);
    if (source === undefined) return { status: 'missing' };
    return findBlock(source) === expected() ? { status: 'ok' } : { status: 'missing', detail: 'managed block out of date' };
  },
  async install(ctx) {
    const path = zshrcPath(ctx);
    const source = await readFile(path, 'utf8').catch(() => '');
    await writeFile(path, upsertBlock(source, expected()));
  },
});
