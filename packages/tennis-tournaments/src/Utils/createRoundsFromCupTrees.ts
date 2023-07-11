import { MatchCardProps } from "../MatchCard";
import { CupTreesApiModel } from "../Types/CupTreesApiModel";
import { breadthFirstTraversal } from "./breadthFirstTraversal";
import { convertRoundInformationToAllRounds } from "./convertRoundInformationToAllRounds";
import { createMatchCardPropsWithOrderFromCupTreeNode } from "./createMatchCardPropsWithOrderFromCupTreeNode";

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

  // Iterating over each cupTree, views and view
  // to extract all matches for all rounds

  for (const cupTree of model.cupTrees) {
    for (const views of cupTree.views) {
      for (const view of views) {
        breadthFirstTraversal(view, (node) => {
          const type = node.round.type;
          const title = node.round.description;

          const match = createMatchCardPropsWithOrderFromCupTreeNode(node);

          roundTitlesByType[type] = title;

          if (!roundMatchesByType[type]) {
            roundMatchesByType[type] = [];
          }

          // Removing matches with identical order
          // to remove duplicates between different views

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

  return convertRoundInformationToAllRounds(
    roundMatchesByType,
    roundTitlesByType
  );
};

export {
  createRoundsFromCupTrees,
  type AllRounds,
  type MatchCardPropsWithOrder,
};
