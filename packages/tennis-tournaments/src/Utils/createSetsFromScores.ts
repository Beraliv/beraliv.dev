import * as EventResponse from "../event-mock.json";

type Score = Partial<
  (typeof EventResponse)["event"]["awayScore" | "homeScore"]
>;

type Set = [home: number, away: number];

const createSetsFromScores = (homeScore: Score, awayScore: Score): Set[] => {
  const sets = [
    [homeScore.period1, awayScore.period1],
    [homeScore.period2, awayScore.period2],
    [homeScore.period3, awayScore.period3],
    [homeScore.period4, awayScore.period4],
    [homeScore.period5, awayScore.period5],
  ];

  return sets.filter((set): set is Set =>
    set.every((score) => typeof score === "number")
  );
};

export { createSetsFromScores };
