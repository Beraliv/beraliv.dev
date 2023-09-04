import { RoundsApiModel } from "../Types/RoundsApiModel";

const getCurrentRound = (round: RoundsApiModel): string | undefined => {
  return round.currentRound?.name ?? round.rounds[0]?.name;
};

export { getCurrentRound };
