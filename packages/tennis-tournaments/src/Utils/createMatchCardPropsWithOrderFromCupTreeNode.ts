import { TENNIS_PLAYER_PLACEHOLDER } from "../Constants/TENNIS_PLAYER_PLACEHOLDER";
import { CupNodeApiModel } from "../Types/CupTreesApiModel";
import { TennisSet } from "../Types/TennisSet";
import type { MatchCardPropsWithOrder } from "./createRoundsFromCupTrees";
import { createTennisPlayerFromTeam } from "./createTennisPlayerFromTeam";

const createMatchCardPropsWithOrderFromCupTreeNode = (
  node: CupNodeApiModel
): MatchCardPropsWithOrder => {
  const order = node.order;

  // TODO: extract full score instead of sets only

  const score =
    node.status && node.status.includes(":")
      ? node.status.split(":").map((value) => parseInt(value, 10))
      : undefined;

  const homePlayer = node.leftParticipant;
  const awayPlayer = node.rightParticipant;

  return {
    awayPlayer: awayPlayer
      ? createTennisPlayerFromTeam(awayPlayer.team, awayPlayer.teamSeed)
      : TENNIS_PLAYER_PLACEHOLDER,
    homePlayer: homePlayer
      ? createTennisPlayerFromTeam(homePlayer.team, homePlayer.teamSeed)
      : TENNIS_PLAYER_PLACEHOLDER,
    order,
    sets: score ? [score.map((sets) => ({ games: sets })) as TennisSet] : [],
    status: node.eventInProgress
      ? { type: "IN_PROGRESS" }
      : node.finished
      ? {
          type: "FINISHED",
          winner:
            homePlayer && homePlayer.winner
              ? "home"
              : awayPlayer && awayPlayer.winner
              ? "away"
              : undefined,
        }
      : { type: "DID_NOT_STARTED" },
  };
};

export { createMatchCardPropsWithOrderFromCupTreeNode };
