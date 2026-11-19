// Source of truth for dependency ids and edges.
export const GRAPH = {
  homebrew: [],
  zshrc: [],
  claude: ['homebrew'],
  nvm: ['homebrew', 'zshrc'],
  node: ['nvm'],
  warp: ['homebrew', 'zshrc'],
  vscode: ['homebrew', 'zshrc'],
  ffmpeg: ['homebrew'],
  git: ['homebrew'],
  'git-ssh-key': ['git'],
  chrome: ['homebrew'],
  '1password': ['homebrew'],
  docker: ['homebrew'],
} as const satisfies { [Id in string]: readonly string[] };

export type DepId = keyof typeof GRAPH;

// A dependency may only list other ids, never its own.
export type DependsOn<Id extends DepId> = readonly Exclude<DepId, Id>[];

export const DEP_IDS = Object.keys(GRAPH) as DepId[];

// Returns the dependency levels (Kahn's algorithm). Throws on cycles or unknown ids.
export function levels(graph: Record<string, readonly string[]> = GRAPH): string[][] {
  const ids = Object.keys(graph);
  for (const id of ids) {
    for (const dep of graph[id]) {
      if (!(dep in graph)) throw new Error(`"${id}" depends on unknown id "${dep}"`);
      if (dep === id) throw new Error(`"${id}" depends on itself`);
    }
  }
  const done = new Set<string>();
  const result: string[][] = [];
  let remaining = ids;
  while (remaining.length > 0) {
    const level = remaining.filter((id) => graph[id].every((d) => done.has(d)));
    if (level.length === 0) throw new Error(`cycle detected among: ${remaining.join(', ')}`);
    level.forEach((id) => done.add(id));
    result.push(level);
    remaining = remaining.filter((id) => !done.has(id));
  }
  return result;
}
