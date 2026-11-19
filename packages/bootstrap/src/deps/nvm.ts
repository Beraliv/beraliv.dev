import { access, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { define } from '../dependency.ts';
import { brewPackage } from './brew.ts';

const formula = brewPackage({ id: 'nvm', name: 'nvm', dependsOn: ['homebrew', 'zshrc'], kind: 'formula', token: 'nvm' });

export default define({
  ...formula,
  async check(ctx) {
    const result = await formula.check(ctx);
    if (result.status !== 'ok') return result;
    // nvm expects its data directory to exist.
    const hasDir = await access(join(ctx.home, '.nvm')).then(() => true, () => false);
    return hasDir ? result : { status: 'missing', detail: '~/.nvm missing' };
  },
  async install(ctx) {
    await formula.install(ctx);
    await mkdir(join(ctx.home, '.nvm'), { recursive: true });
  },
  update: formula.update,
});
