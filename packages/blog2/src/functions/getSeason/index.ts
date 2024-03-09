import { getObjectEntries } from "../getObjectEntries";

const SEASONS = {
  winter: [0, 1, 11],
  spring: [2, 3, 4],
  summer: [5, 6, 7],
  autumn: [8, 9, 10],
} satisfies Record<string, number[]>;

type SeasonType = keyof typeof SEASONS;

export const getSeason = (
  date: Pick<Date, "getMonth">
): SeasonType | undefined => {
  const month = date.getMonth();
  for (const [season, months] of getObjectEntries(SEASONS)) {
    if (months.includes(month)) {
      return season;
    }
  }

  return undefined;
};
