import { ScoreApiModel } from "../Types/ScoreApiModel";
import { TennisSet } from "../Types/TennisSet";

type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

const createTennisSetsFromScores = (
  homeScore: ScoreApiModel,
  awayScore: ScoreApiModel
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
