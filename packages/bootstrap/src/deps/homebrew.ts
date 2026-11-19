import { define } from '../dependency.ts';

export default define({
  id: 'homebrew',
  name: 'Homebrew',
  dependsOn: [],
  async check(ctx) {
    const r = await ctx.exec('brew', ['--version']);
    if (r.code !== 0) return { status: 'missing' };
    const current = r.stdout.split('\n')[0].replace('Homebrew ', '').trim();
    return { status: 'ok', current, latest: current };
  },
  async install(ctx) {
    const script =
      '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"';
    const r = await ctx.exec('/bin/bash', ['-c', script], { inherit: true });
    if (r.code !== 0) throw new Error('Homebrew installation failed');
  },
  async update(ctx) {
    await ctx.exec('brew', ['update'], { inherit: true });
  },
});
