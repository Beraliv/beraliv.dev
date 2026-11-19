import { access, rm } from 'node:fs/promises';
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
  // false: only check that the app is installed, without comparing versions (e.g. Docker).
  checkOutdated?: boolean;
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
  const { kind, token, app, checkOutdated = true } = opts;

  const check = async (ctx: Context): Promise<CheckResult> => {
    const current = await installedVersion(ctx, kind, token);
    if (current === undefined) {
      if (app && (await exists(app))) {
        // An app installed by hand counts as installed when versions are not checked.
        if (!checkOutdated) return { status: 'ok' };
        return { status: 'missing', detail: `${app} is not managed by Homebrew` };
      }
      return { status: 'missing' };
    }
    if (!checkOutdated) return { status: 'ok', current };
    const outdated = await ctx.brewOutdated();
    const entry = (kind === 'cask' ? outdated.casks : outdated.formulae).get(token);
    if (entry) return { status: 'outdated', current: entry.installed, latest: entry.current };
    return { status: 'ok', current, latest: current };
  };

  const install = async (ctx: Context) => {
    // An app installed by hand is removed first, so that Homebrew installs its own copy.
    if (app && (await exists(app))) {
      await rm(app, { recursive: true, force: true });
      // Fails when Homebrew does not know the cask, which is expected here; the install below is what matters.
      await ctx.exec('brew', ['uninstall', ...caskFlag(kind), token]);
    }
    const r = await ctx.exec('brew', ['install', ...caskFlag(kind), token], { inherit: true });
    if (r.code !== 0) throw new Error(`brew install ${token} failed`);
  };

  const update = async (ctx: Context) => {
    const r = await ctx.exec('brew', ['upgrade', ...caskFlag(kind), token], { inherit: true });
    if (r.code !== 0) throw new Error(`brew upgrade ${token} failed`);
  };

  return define({ ...opts, check, install, update });
}
