import { ScoreApiModel } from "../Types/ScoreApiModel";
import {
  GameScore,
  PlayerCentricScore,
  SetScore,
  SetWithTieBreakScore,
} from "../Types/PlayerCentricScore";
import { MatchStatus } from "../Types/MatchStatus";

const createGameScore = (
  homeScore: ScoreApiModel,
  awayScore: ScoreApiModel,
  status: MatchStatus
): PlayerCentricScore | undefined => {
  if (status.type !== "IN_PROGRESS") {
    // when match is NOT in progress, game score isn't required

    return undefined;
  }

  const home = { points: homeScore.point } as GameScore;
  const away = { points: awayScore.point } as GameScore;

  const hasPoints =
    typeof home.points === "number" && typeof away.points === "number";

  if (hasPoints) {
    return { home, away, type: "game" };
  }

  return undefined;
};

const createSetOrSetWithTieBreakScore = <Key extends 1 | 2 | 3 | 4 | 5>(
  homeScore: ScoreApiModel,
  awayScore: ScoreApiModel,
  key: Key
): PlayerCentricScore | undefined => {
  const home = {
    points: homeScore[`period${key}`],
    tieBreak: homeScore[`period${key}TieBreak`],
  } as SetWithTieBreakScore | SetScore;
  const away = {
    points: awayScore[`period${key}`],
    tieBreak: awayScore[`period${key}TieBreak`],
  } as SetWithTieBreakScore | SetScore;

  const hasPoints =
    typeof home.points === "number" && typeof away.points === "number";
  const hasTieBreaks =
    typeof home.tieBreak === "number" && typeof away.tieBreak === "number";

  if (hasPoints && hasTieBreaks) {
    return { home, away, type: "setWithTieBreak" };
  }

  if (hasPoints) {
    return { home, away, type: "set" } as PlayerCentricScore;
  }

  return undefined;
};

const createPlayerCentricScoreFromScores = (
  homeScore: ScoreApiModel,
  awayScore: ScoreApiModel,
  status: MatchStatus
): PlayerCentricScore[] => {
  const scores: (PlayerCentricScore | undefined)[] = [
    createGameScore(homeScore, awayScore, status),
    createSetOrSetWithTieBreakScore(homeScore, awayScore, 1),
    createSetOrSetWithTieBreakScore(homeScore, awayScore, 2),
    createSetOrSetWithTieBreakScore(homeScore, awayScore, 3),
    createSetOrSetWithTieBreakScore(homeScore, awayScore, 4),
    createSetOrSetWithTieBreakScore(homeScore, awayScore, 5),
  ];

  return scores.filter(
    (score): score is PlayerCentricScore => typeof score !== "undefined"
  );
};

export { createPlayerCentricScoreFromScores };
