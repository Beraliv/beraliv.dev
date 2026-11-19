import type { Context } from '../context.ts';
import { define } from '../dependency.ts';
import { brewPackage } from './brew.ts';

const formula = brewPackage({ id: 'git', name: 'git', dependsOn: ['homebrew'], kind: 'formula', token: 'git' });

export default define({
  ...formula,
  async check(ctx: Context) {
    const result = await formula.check(ctx);
    if (result.status === 'missing') return result;
    // The Homebrew git must win over Apple's /usr/bin/git.
    const r = await ctx.exec('zsh', ['-ic', 'command -v git']);
    const path = r.stdout.trim().split('\n').at(-1) ?? '';
    return path.startsWith('/opt/homebrew/') ? result : { status: 'missing', detail: `git resolves to ${path}` };
  },
});
