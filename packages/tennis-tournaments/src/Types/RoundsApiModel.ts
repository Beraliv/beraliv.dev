import { RoundApiModel } from "./RoundApiModel";

interface RoundsApiModel {
  currentRound?: RoundApiModel;
  rounds: RoundApiModel[];
}

export { type RoundsApiModel };
