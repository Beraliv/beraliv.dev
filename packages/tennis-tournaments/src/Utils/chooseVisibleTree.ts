import { RoundsApiModel } from "../Types/RoundsApiModel";
import { chooseVisibleRounds } from "./chooseVisibleRounds";
import { AllRounds } from "./createRoundsFromCupTrees";
import { SimpleTournamentRound } from "./fetchTournamentTree";

interface ChooseVisibleTreeParameters {
  tree: AllRounds[] | undefined;
  rounds: RoundsApiModel | undefined;
}

const chooseVisibleTree = ({
  tree,
  rounds,
}: ChooseVisibleTreeParameters): SimpleTournamentRound[] => {
  if (!tree) {
    return [];
  }

  if (!rounds) {
    return [];
  }

  if (!rounds.currentRound) {
    return [];
  }

  const visibleRounds = chooseVisibleRounds(rounds);

  const visibleTree: SimpleTournamentRound[] = [];

  for (const visibleRound of visibleRounds) {
    // name in VisibleRound matches title in AllRounds
    const treeRounds = tree.find((round) => round.title === visibleRound.name);

    if (!treeRounds) {
      continue;
    }

    visibleTree.push({
      title: visibleRound.name,
      order: visibleRound.order,
      matches: treeRounds.matches,
    });
  }

  return visibleTree;
};

export { chooseVisibleTree };
