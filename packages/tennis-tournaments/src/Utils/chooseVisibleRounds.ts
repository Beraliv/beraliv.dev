import { RoundApiModel } from "../Types/RoundApiModel";
import { RoundsApiModel } from "../Types/RoundsApiModel";

const chooseVisibleRounds = ({
  currentRound,
  rounds,
}: RoundsApiModel): RoundApiModel[] => {
  const firstThreeRounds = rounds.slice(0, 3);

  if (!currentRound) {
    return firstThreeRounds;
  }

  const startIndex = rounds.findIndex(
    (round) => round.id === currentRound.id && round.slug === currentRound.slug
  );

  if (startIndex === -1) {
    return firstThreeRounds;
  }

  // if we're close to the end, pick previous rounds
  const effectiveStartIndex = Math.min(startIndex, rounds.length - 3);

  return rounds.slice(effectiveStartIndex, effectiveStartIndex + 3);
};

export { chooseVisibleRounds };
