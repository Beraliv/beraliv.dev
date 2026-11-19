import type { Context } from '../context.ts';
import { define } from '../dependency.ts';

// Node major version managed by this tool. Change it in one place.
export const NODE_MAJOR = '24';

const isVersion = (s: string) => /^v\d+\.\d+\.\d+$/.test(s);

// nvm is a shell function, so it runs through zsh after sourcing nvm.sh (not relying on ~/.zshrc).
// Returns the last line of stdout, or "" on failure.
const NVM_SH = '/opt/homebrew/opt/nvm/nvm.sh';

async function nvmOutput(ctx: Context, command: string): Promise<string> {
  const r = await ctx.exec('zsh', ['-c', `. "${NVM_SH}" >/dev/null 2>&1; ${command}`]);
  if (r.code !== 0) return '';
  return r.stdout.trim().split('\n').at(-1)?.trim() ?? '';
}

async function installNode(ctx: Context) {
  const command = `nvm install ${NODE_MAJOR} && nvm alias default ${NODE_MAJOR}`;
  const r = await ctx.exec('zsh', ['-c', `. "${NVM_SH}"; ${command}`], { inherit: true });
  if (r.code !== 0) throw new Error(`nvm install ${NODE_MAJOR} failed`);
}

export default define({
  id: 'node',
  name: `Node ${NODE_MAJOR}`,
  dependsOn: ['nvm'],
  async check(ctx) {
    const installed = await nvmOutput(ctx, `nvm version ${NODE_MAJOR}`);
    const latest = await nvmOutput(ctx, `nvm version-remote ${NODE_MAJOR}`);
    if (!isVersion(installed)) return { status: 'missing', latest: isVersion(latest) ? latest : undefined };
    if (!isVersion(latest) || latest === installed) return { status: 'ok', current: installed, latest: installed };
    return { status: 'outdated', current: installed, latest };
  },
  install: installNode,
  update: installNode,
});
