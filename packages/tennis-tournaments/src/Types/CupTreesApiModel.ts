import { TeamApiModel } from "./TeamApiModel";
import { TreeNode } from "./TreeNode";

interface ParticipantApiModel {
  team: TeamApiModel;
  teamSeed?: string;
  winner: boolean;
}

/**
 * { description: 'Round of 128',   type: 64 }
 * ...
 * { description: 'Final',          type: 1 }
 */
interface CupRoundApiModel {
  description: string;
  type: number;
}

type CupNodeApiModel = TreeNode<{
  eventInProgress: boolean;
  finished: boolean;
  leftParticipant: ParticipantApiModel;
  order: number;
  rightParticipant: ParticipantApiModel;
  round: CupRoundApiModel;
  status?: string;
}>;

interface CupTreeApiModel {
  name: string;
  views: CupNodeApiModel[][];
}

interface CupTreesApiModel {
  cupTrees: CupTreeApiModel[];
}

export {
  type CupTreesApiModel,
  type CupTreeApiModel,
  type CupNodeApiModel,
  type CupRoundApiModel,
  type ParticipantApiModel,
};
