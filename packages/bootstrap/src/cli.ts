#!/usr/bin/env node
import { createInterface } from 'node:readline/promises';
import { exec } from './exec.ts';
import { createContext } from './context.ts';
import { checkAll, actionFor, applyFixes, print, rowsFor } from './engine.ts';
import { registry } from './deps/index.ts';
import type { AnyDependency } from './dependency.ts';
import { GRAPH, type DepId } from './graph.ts';

const VERSION = '0.1.0';
const HELP = `bootstrap ${VERSION}

Usage: bootstrap [options]

  (no options)      check, then offer fixes
  --check           check only; exit 1 if anything is not ok
  --yes, -y         apply fixes without asking
  --only <id>       limit to one dependency and the dependencies it needs
  --version         print version
  --help            print this help
`;

type Options = { check: boolean; yes: boolean; only?: DepId; help: boolean; version: boolean };

function parse(argv: string[]): Options | string {
  const opts: Options = { check: false, yes: false, help: false, version: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--check') opts.check = true;
    else if (arg === '--yes' || arg === '-y') opts.yes = true;
    else if (arg === '--help' || arg === '-h') opts.help = true;
    else if (arg === '--version') opts.version = true;
    else if (arg === '--only') {
      const id = argv[++i];
      if (!id || !(id in GRAPH)) return `unknown dependency id "${id ?? ''}"`;
      opts.only = id as DepId;
    } else return `unknown option "${arg}"`;
  }
  return opts;
}

// Closure of an id and everything it needs, in registry order.
function closure(deps: readonly AnyDependency[], id: string): AnyDependency[] {
  const byId = new Map(deps.map((d) => [d.id as string, d]));
  const keep = new Set<string>();
  const visit = (x: string) => {
    if (keep.has(x)) return;
    keep.add(x);
    byId.get(x)?.dependsOn.forEach((d) => visit(d));
  };
  visit(id);
  return deps.filter((d) => keep.has(d.id));
}

async function main(): Promise<number> {
  const parsed = parse(process.argv.slice(2));
  if (typeof parsed === 'string') {
    console.error(`bootstrap: ${parsed}\n\n${HELP}`);
    return 2;
  }
  if (parsed.help) {
    console.log(HELP);
    return 0;
  }
  if (parsed.version) {
    console.log(VERSION);
    return 0;
  }

  // Homebrew is arm64-only and not always on PATH in a fresh shell.
  process.env.PATH = `/opt/homebrew/bin:/opt/homebrew/sbin:${process.env.PATH ?? ''}`;

  const deps = parsed.only ? closure(registry, parsed.only) : registry;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const interactive = Boolean(process.stdin.isTTY) && !parsed.check;
  const ctx = createContext(exec, {
    confirm: async (q) => (await rl.question(`${q} [y/N] `)).trim().toLowerCase() === 'y',
    pause: async (msg) => {
      await rl.question(`${msg} `);
    },
  });

  try {
    const report = await checkAll(deps, ctx);
    print(deps, report, console.log);
    const pending = deps.filter((d) => actionFor(d, report.get(d.id)!));
    if (pending.length === 0) return 0;
    if (!interactive && !parsed.yes) return 1;

    console.log('\nPlanned:');
    for (const d of pending) console.log(`  - ${d.name}: ${actionFor(d, report.get(d.id)!)}`);
    if (!parsed.yes && !(await ctx.confirm('\nProceed?'))) return 1;

    console.log('');
    await applyFixes(deps, report, ctx, console.log);

    console.log('\nVerifying:');
    const after = await checkAll(deps, ctx);
    print(deps, after, console.log);
    const remaining = rowsFor(deps, after).some((r) => r.result.status !== 'ok');
    return remaining ? 1 : 0;
  } finally {
    rl.close();
  }
}

main().then((code) => process.exit(code));
