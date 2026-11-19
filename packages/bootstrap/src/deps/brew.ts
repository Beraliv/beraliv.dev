import { access } from 'node:fs/promises';
import type { Context } from '../context.ts';
import { define, type CheckResult, type Dependency } from '../dependency.ts';
import type { DepId, DependsOn } from '../graph.ts';

type BrewKind = 'formula' | 'cask';

export type BrewPackageOptions<Id extends DepId> = {
  id: Id;
  name: string;
  dependsOn: DependsOn<Id>;
  kind: BrewKind;
  token: string;
  // Cask apps that may have been installed outside Homebrew, e.g. "/Applications/Google Chrome.app".
  app?: string;
};

const exists = (path: string) => access(path).then(() => true, () => false);
const caskFlag = (kind: BrewKind) => (kind === 'cask' ? ['--cask'] : []);

// Installed version reported by `brew list --versions`, e.g. "ffmpeg 7.1 7.1.1".
async function installedVersion(ctx: Context, kind: BrewKind, token: string): Promise<string | undefined> {
  const r = await ctx.exec('brew', ['list', ...caskFlag(kind), '--versions', token]);
  if (r.code !== 0) return undefined;
  const words = r.stdout.trim().split(/\s+/);
  return words.length > 1 ? words[words.length - 1] : undefined;
}

// A Homebrew formula or cask. Upgrade status comes from the shared `brew outdated --greedy` call.
export function brewPackage<Id extends DepId>(opts: BrewPackageOptions<Id>): Dependency<Id> {
  const { kind, token, app } = opts;

  const check = async (ctx: Context): Promise<CheckResult> => {
    const current = await installedVersion(ctx, kind, token);
    if (current === undefined) {
      if (app && (await exists(app))) return { status: 'missing', detail: `${app} is not managed by Homebrew` };
      return { status: 'missing' };
    }
    const outdated = await ctx.brewOutdated();
    const entry = (kind === 'cask' ? outdated.casks : outdated.formulae).get(token);
    if (entry) return { status: 'outdated', current: entry.installed, latest: entry.current };
    return { status: 'ok', current, latest: current };
  };

  const install = async (ctx: Context) => {
    // --adopt takes over an app that was installed by hand, so Homebrew can upgrade it later.
    const adopt = app && (await exists(app)) ? ['--adopt'] : [];
    const r = await ctx.exec('brew', ['install', ...caskFlag(kind), ...adopt, token], { inherit: true });
    if (r.code !== 0) throw new Error(`brew install ${token} failed`);
  };

  const update = async (ctx: Context) => {
    const r = await ctx.exec('brew', ['upgrade', ...caskFlag(kind), token], { inherit: true });
    if (r.code !== 0) throw new Error(`brew upgrade ${token} failed`);
  };

  return define({ ...opts, check, install, update });
}
