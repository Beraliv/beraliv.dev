const DAY_DATES = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const parseDate = (dateString: string, slug: string): Date => {
  const [yearString, monthString, dayString] = dateString.split("-");
  const year = Number(yearString);
  const monthIndex = Number(monthString) - 1;
  if (monthIndex < 0 || monthIndex > 11) {
    throw new Error(`Cannot use month index ${monthIndex} for slug "${slug}"`);
  }

  const dayDate = Number(dayString);
  const maxDayDate = DAY_DATES[monthIndex];
  if (dayDate < 1 || dayDate > maxDayDate) {
    throw new Error(
      `Cannot use day ${dayDate} for a month index ${monthIndex} and slug "${slug}"`
    );
  }

  const date = new Date(year, monthIndex, dayDate);
  return date;
};
