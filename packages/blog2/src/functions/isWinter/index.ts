const WINTER_MONTHS = [0, 1, 11];

export const isWinter = (date: Date): boolean => {
  const month = date.getMonth();
  return WINTER_MONTHS.includes(month);
};
