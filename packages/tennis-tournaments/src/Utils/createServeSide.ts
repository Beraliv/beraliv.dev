import { PlayerCentricScore } from "../Types/PlayerCentricScore";
import { TennisSide } from "../Types/TennisSide";

interface CreateServeSideOptions {
  firstToServe: TennisSide | undefined;
}

const createServeSide = (
  scores: PlayerCentricScore[],
  { firstToServe }: CreateServeSideOptions
): TennisSide | undefined => {
  // match has NOT started yet

  if (scores.length === 0) {
    return undefined;
  }

  // match is finished

  if (scores.length === 1 && scores[0].type === "match") {
    return undefined;
  }

  let playedGames = 0;
  let playedTieBreakPoints = 0;
  let hasLiveTieBreak = false;

  for (const score of scores) {
    if (score.type === "set" || score.type === "setWithTieBreak") {
      playedGames += score.home.points;
      playedGames += score.away.points;

      if (score.away.points === 6 && score.home.points === 6) {
        hasLiveTieBreak = true;
      }
    }

    if (hasLiveTieBreak && score.type === "game") {
      playedTieBreakPoints += parseInt(score.home.points, 10);
      playedTieBreakPoints += parseInt(score.away.points, 10);
    }
  }

  if (hasLiveTieBreak) {
    const anotherSideTieBreakServe = (playedTieBreakPoints + 3) % 4 < 2;

    if (anotherSideTieBreakServe) {
      if (playedGames % 2 === 1) {
        return firstToServe;
      }

      if (firstToServe === "away") {
        return "home";
      }

      return "away";
    }
  }

  if (playedGames % 2 === 0) {
    return firstToServe;
  }

  if (firstToServe === "away") {
    return "home";
  }

  return "away";
};

export { createServeSide, type CreateServeSideOptions };
