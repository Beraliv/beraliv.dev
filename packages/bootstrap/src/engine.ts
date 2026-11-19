import type { Context } from './context.ts';
import type { AnyDependency, CheckResult } from './dependency.ts';
import { levels } from './graph.ts';
import { formatRow, summarize, type Row } from './ui.ts';

export type Action = 'install' | 'update' | 'setup';
export type Report = Map<string, CheckResult>;

// Runs checks level by level. Results are returned keyed by id, so the caller prints them in registry order.
export async function checkAll(deps: readonly AnyDependency[], ctx: Context): Promise<Report> {
  const byId = new Map(deps.map((d) => [d.id as string, d]));
  const graph = Object.fromEntries(deps.map((d) => [d.id, d.dependsOn as readonly string[]]));
  const report: Report = new Map();
  for (const level of levels(graph)) {
    const results = await Promise.all(level.map((id) => byId.get(id)!.check(ctx)));
    level.forEach((id, i) => report.set(id, results[i]));
  }
  return report;
}

export function actionFor(dep: AnyDependency, result: CheckResult): Action | undefined {
  if (result.status === 'ok') return undefined;
  if (result.status === 'needs-setup') return dep.setup ? 'setup' : undefined;
  if (result.status === 'outdated') return dep.update ? 'update' : 'install';
  return 'install';
}

export function rowsFor(deps: readonly AnyDependency[], report: Report): Row[] {
  return deps.map((d) => ({ name: d.name, result: report.get(d.id)! }));
}

export function print(deps: readonly AnyDependency[], report: Report, log: (line: string) => void) {
  const rows = rowsFor(deps, report);
  rows.forEach((row) => log(formatRow(row)));
  log(summarize(rows));
}

// Applies actions in topological order. A failed dependency causes its dependents to be skipped.
export async function applyFixes(
  deps: readonly AnyDependency[],
  report: Report,
  ctx: Context,
  log: (line: string) => void,
): Promise<void> {
  const byId = new Map(deps.map((d) => [d.id as string, d]));
  const graph = Object.fromEntries(deps.map((d) => [d.id, d.dependsOn as readonly string[]]));
  const failed = new Set<string>();
  for (const level of levels(graph)) {
    for (const id of level) {
      const dep = byId.get(id)!;
      const result = report.get(id)!;
      const action = actionFor(dep, result);
      if (!action) continue;
      const blocked = dep.dependsOn.some((d) => failed.has(d));
      if (blocked) {
        failed.add(id);
        log(`⏭  ${dep.name}: skipped, a dependency failed`);
        continue;
      }
      try {
        log(`▶  ${dep.name}: ${action}`);
        if (action === 'install') await dep.install(ctx);
        else if (action === 'update') await dep.update!(ctx);
        else await dep.setup!(ctx);
      } catch (err) {
        failed.add(id);
        log(`✖  ${dep.name}: ${(err as Error).message}`);
      }
    }
  }
}
