import { MatchCardProps } from "../MatchCard";
import { CupTreesApiModel } from "../Types/CupTreesApiModel";
import { breadthFirstTraversal } from "./breadthFirstTraversal";
import { createTennisPlayerFromTeam } from "./createTennisPlayerFromTeam";

interface AllRounds {
  matches: MatchCardProps[];
  title: string;
}

interface MatchCardPropsWithOrder extends MatchCardProps {
  order: number;
}

const createRoundsFromCupTrees = (model: CupTreesApiModel): AllRounds[] => {
  const roundTitlesByType: Record<string, string> = {};
  const roundMatchesByType: Record<string, MatchCardPropsWithOrder[]> = {};

  // Parsing Model API

  for (const cupTree of model.cupTrees) {
    for (const views of cupTree.views) {
      for (const view of views) {
        breadthFirstTraversal(view, (node) => {
          const type = node.round.type;
          const title = node.round.description;
          const order = node.order;

          const homePlayer = node.leftParticipant;
          const awayPlayer = node.rightParticipant;

          const match: MatchCardPropsWithOrder = {
            awayPlayer: createTennisPlayerFromTeam(
              awayPlayer.team,
              awayPlayer.teamSeed
            ),
            homePlayer: createTennisPlayerFromTeam(
              homePlayer.team,
              homePlayer.teamSeed
            ),
            order,
            sets: [],
            status: node.eventInProgress
              ? { type: "IN_PROGRESS" }
              : node.finished
              ? {
                  type: "FINISHED",
                  winner: homePlayer.winner
                    ? "home"
                    : awayPlayer.winner
                    ? "away"
                    : undefined,
                }
              : { type: "DID_NOT_STARTED" },
          };

          roundTitlesByType[type] = title;

          if (!roundMatchesByType[type]) {
            roundMatchesByType[type] = [];
          }

          // removing matches with identical order
          // as there is the same data between views
          if (
            !roundMatchesByType[type].some(
              (storedMatch) => storedMatch.order === match.order
            )
          ) {
            roundMatchesByType[type].push(match);
          }
        });
      }
    }
  }

  // e.g. [64, 32, 16, 8, 4, 2, 1]
  const sortedRoundTypes = Object.keys(roundMatchesByType)
    .map((round) => parseInt(round, 10))
    .sort((a, b) => b - a);

  const roundTitles = sortedRoundTypes.map((round) => roundTitlesByType[round]);
  const roundsMatches = sortedRoundTypes.map(
    (round) => roundMatchesByType[round]
  );

  const rounds: AllRounds[] = [];

  for (let i = 0; i < sortedRoundTypes.length; i++) {
    const roundTitle = roundTitles[i];
    const roundMatches = roundsMatches[i].sort(
      (round1, round2) => round1.order - round2.order
    );

    rounds.push({
      matches: roundMatches,
      title: roundTitle,
    });
  }

  return rounds;
};

export { createRoundsFromCupTrees, type AllRounds };
