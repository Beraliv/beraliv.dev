import { PlayerCentricScore } from "../Types/PlayerCentricScore";

const getGameScore = (points: string) => {
  const numberOrNaN = parseInt(points, 10);

  if (isNaN(numberOrNaN)) {
    // NaN means it's A (advantage)
    // so setting it to higher than the greatest possible value (which is 40)

    return 50;
  }

  return numberOrNaN;
};

const doesWinSet = (score: PlayerCentricScore): boolean => {
  if (score.type === "game") {
    return getGameScore(score.home.points) > getGameScore(score.away.points);
  }

  if (score.type === "set" || score.type === "match") {
    return score.home.points > score.away.points;
  }

  if (score.type === "setWithTieBreak") {
    return score.home.tieBreak > score.away.tieBreak;
  }

  // safe fallback
  return false;
};

export { doesWinSet };
