interface YearsSinceProps {
  year: number;
  month: number;
  day: number;
}

export const yearsSince = ({ year, month, day }: YearsSinceProps): number => {
  const start = new Date(year, month, day);
  const now = new Date();

  return new Date(now.getTime() - start.getTime()).getFullYear() - 1970;
};
