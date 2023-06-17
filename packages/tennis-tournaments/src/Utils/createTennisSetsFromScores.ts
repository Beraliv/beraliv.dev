import { TennisSet } from "../Types/TennisSet";
import * as EventResponse from "../event-mock.json";

type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type Score = {
  [key in 1 | 2 | 3 | 4 | 5 as `period${key}` | `period${key}TieBreak`]?:
    | number
    | undefined;
};

const createTennisSetsFromScores = (
  homeScore: Score,
  awayScore: Score
): TennisSet[] => {
  const sets: DeepPartial<TennisSet>[] = [
    [
      { games: homeScore.period1, tieBreak: homeScore.period1TieBreak },
      { games: awayScore.period1, tieBreak: awayScore.period1TieBreak },
    ],
    [
      { games: homeScore.period2, tieBreak: homeScore.period2TieBreak },
      { games: awayScore.period2, tieBreak: awayScore.period2TieBreak },
    ],
    [
      { games: homeScore.period3, tieBreak: homeScore.period3TieBreak },
      { games: awayScore.period3, tieBreak: awayScore.period3TieBreak },
    ],
    [
      { games: homeScore.period4, tieBreak: homeScore.period4TieBreak },
      { games: awayScore.period4, tieBreak: awayScore.period4TieBreak },
    ],
    [
      { games: homeScore.period5, tieBreak: homeScore.period5TieBreak },
      { games: awayScore.period5, tieBreak: awayScore.period5TieBreak },
    ],
  ];

  return sets.filter((set): set is TennisSet =>
    set.every((score) => typeof score?.games === "number")
  );
};

export { createTennisSetsFromScores };
