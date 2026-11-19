import { access, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import type { Context } from '../context.ts';
import { define } from '../dependency.ts';

const GITHUB_KEYS_URL = 'https://github.com/settings/ssh/new';

const exists = (path: string) => access(path).then(() => true, () => false);

async function createKey(ctx: Context) {
  const sshDir = join(ctx.home, '.ssh');
  const keyPath = join(sshDir, 'id_ed25519');
  await mkdir(sshDir, { recursive: true, mode: 0o700 });
  const keygen = await ctx.exec('ssh-keygen', ['-t', 'ed25519', '-f', keyPath], { inherit: true });
  if (keygen.code !== 0) throw new Error('ssh-keygen failed');
  await ctx.exec('sh', ['-c', `pbcopy < "${keyPath}.pub"`]);
  await ctx.exec('open', [GITHUB_KEYS_URL]);
  await ctx.pause(`Public key copied to clipboard and ${GITHUB_KEYS_URL} opened. Paste it, then press Enter to continue.`);
}

export default define({
  id: 'git-ssh-key',
  name: 'git SSH key',
  dependsOn: ['git'],
  async check(ctx) {
    const present = await exists(join(ctx.home, '.ssh', 'id_ed25519.pub'));
    return present ? { status: 'ok' } : { status: 'missing', detail: '~/.ssh/id_ed25519.pub not found' };
  },
  install: createKey,
});
