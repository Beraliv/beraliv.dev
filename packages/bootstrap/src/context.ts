import { homedir } from 'node:os';
import { join } from 'node:path';

export type ExecResult = { code: number; stdout: string; stderr: string };
export type ExecOptions = { inherit?: boolean };
export type Exec = (cmd: string, args?: string[], opts?: ExecOptions) => Promise<ExecResult>;

export type Versions = { installed: string; current: string };
export type BrewOutdated = { formulae: Map<string, Versions>; casks: Map<string, Versions> };

export interface Context {
  exec: Exec;
  home: string;
  confirm(question: string): Promise<boolean>;
  pause(message: string): Promise<void>;
  // Memoized `brew outdated --json=v2 --greedy`, shared across dependencies.
  brewOutdated(): Promise<BrewOutdated>;
}

type OutdatedJson = {
  formulae?: { name: string; installed_versions?: string[]; current_version: string }[];
  casks?: { token?: string; name: string; installed_versions?: string | string[]; current_version: string }[];
};

export function parseBrewOutdated(json: string): BrewOutdated {
  const data = JSON.parse(json) as OutdatedJson;
  const formulae = new Map<string, Versions>();
  for (const f of data.formulae ?? []) {
    const installed = [f.installed_versions ?? []].flat().at(-1) ?? '';
    formulae.set(f.name, { installed, current: f.current_version });
  }
  const casks = new Map<string, Versions>();
  for (const c of data.casks ?? []) {
    const installed = [c.installed_versions ?? []].flat().at(-1) ?? '';
    casks.set(c.token ?? c.name, { installed, current: c.current_version });
  }
  return { formulae, casks };
}

const EMPTY: BrewOutdated = { formulae: new Map(), casks: new Map() };

export function createContext(exec: Exec, overrides: Partial<Context> = {}): Context {
  let outdated: Promise<BrewOutdated> | undefined;
  return {
    exec,
    home: homedir(),
    confirm: async () => false,
    pause: async () => {},
    brewOutdated() {
      outdated ??= exec('brew', ['outdated', '--json=v2', '--greedy']).then((r) =>
        r.code === 0 ? parseBrewOutdated(r.stdout) : EMPTY,
      );
      return outdated;
    },
    ...overrides,
  };
}

export const zshrcPath = (ctx: Context) => join(ctx.home, '.zshrc');
