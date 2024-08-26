interface YearsFromParameters {
  year: number;
  month: number;
  day: number;
}

export function YearsFrom({ year, month, day }: YearsFromParameters) {
  const start = new Date(year, month, day);
  const now = new Date();

  return new Date(now.getTime() - start.getTime()).getFullYear() - 1970;
}
