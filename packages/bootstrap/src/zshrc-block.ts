export const BEGIN = '# >>> @beraliv/bootstrap >>>';
export const END = '# <<< @beraliv/bootstrap <<<';

// Snippets are keyed by dependency id and emitted in registry order.
export function buildBlock(snippets: readonly { id: string; body: string }[]): string {
  const lines = snippets.flatMap((s) => [`# ${s.id}`, s.body]);
  return [BEGIN, ...lines, END].join('\n');
}

export function findBlock(source: string): string | undefined {
  const start = source.indexOf(BEGIN);
  if (start === -1) return undefined;
  const end = source.indexOf(END, start);
  if (end === -1) return undefined;
  return source.slice(start, end + END.length);
}

// Replaces the managed block, or appends one. Content outside the markers is kept as-is.
export function upsertBlock(source: string, block: string): string {
  const existing = findBlock(source);
  if (existing !== undefined) return source.replace(existing, () => block);
  const separator = source.length === 0 || source.endsWith('\n') ? '' : '\n';
  return `${source}${separator}\n${block}\n`;
}
