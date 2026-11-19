import type { CheckResult } from './dependency.ts';

export type Row = { name: string; result: CheckResult };

export function formatRow({ name, result }: Row): string {
  const { status, current, latest, detail } = result;
  if (status === 'needs-setup') return `🔴 ${name}: not logged in`;
  if (status === 'missing') {
    const target = latest ? ` → ${latest}` : '';
    const note = detail ? ` (${detail})` : '';
    return `🔴 ${name}: not installed${target}${note}`;
  }
  const icon = status === 'ok' ? '🟢' : '🔴';
  if (current === undefined) return `${icon} ${name}`;
  return `${icon} ${name}: ${current} → ${latest ?? current}`;
}

export function summarize(rows: Row[]): string {
  const bad = rows.filter((r) => r.result.status !== 'ok').length;
  return bad === 0 ? 'All dependencies are up to date.' : `${bad} of ${rows.length} need attention.`;
}
