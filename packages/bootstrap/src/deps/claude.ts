import { define } from '../dependency.ts';
import { brewPackage } from './brew.ts';

const cask = brewPackage({ id: 'claude', name: 'Claude Code', dependsOn: ['homebrew'], kind: 'cask', token: 'claude-code' });

export default define({
  ...cask,
  async check(ctx) {
    const result = await cask.check(ctx);
    if (result.status !== 'ok' && result.status !== 'outdated') return result;
    const r = await ctx.exec('claude', ['auth', 'status', '--json']);
    const loggedIn = r.code === 0 && (JSON.parse(r.stdout || '{}') as { loggedIn?: boolean }).loggedIn === true;
    return loggedIn ? result : { ...result, status: 'needs-setup' };
  },
  async setup(ctx) {
    await ctx.exec('claude', ['auth', 'login'], { inherit: true });
  },
});
