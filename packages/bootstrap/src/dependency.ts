import type { Context } from './context.ts';
import type { DepId, DependsOn } from './graph.ts';

export type Status = 'ok' | 'missing' | 'outdated' | 'needs-setup';

export type CheckResult = {
  status: Status;
  current?: string;
  latest?: string;
  detail?: string;
};

export interface Dependency<Id extends DepId = DepId> {
  id: Id;
  name: string;
  dependsOn: DependsOn<Id>;
  check(ctx: Context): Promise<CheckResult>;
  install(ctx: Context): Promise<void>;
  update?(ctx: Context): Promise<void>;
  setup?(ctx: Context): Promise<void>;
}

// Ensures a dependency's `dependsOn` matches the graph at compile time.
export function define<Id extends DepId>(dep: Dependency<Id>): Dependency<Id> {
  return dep;
}

// Any dependency, for heterogeneous lists. `Dependency` alone defaults to an empty `dependsOn`.
export type AnyDependency = { [K in DepId]: Dependency<K> }[DepId];
