import { RoundApiModel } from "../Types/RoundApiModel";
import { RoundsApiModel } from "../Types/RoundsApiModel";
import {
  VisibleRoundOrder,
  getVisibleRoundOrders,
} from "./getVisibleRoundOrders";
import { roundEquals } from "./roundEquals";

interface VisibleRound extends RoundApiModel {
  order: VisibleRoundOrder;
}

const chooseVisibleRounds = ({
  currentRound,
  rounds,
}: RoundsApiModel): VisibleRound[] => {
  const firstThreeRounds: VisibleRound[] = rounds
    .slice(0, 3)
    .map((round, index) => ({
      ...round,
      order: index as VisibleRoundOrder,
    }));

  if (!currentRound) {
    return firstThreeRounds;
  }

  const startIndex = rounds.findIndex((round) =>
    roundEquals(round, currentRound)
  );

  if (startIndex === -1) {
    return firstThreeRounds;
  }

  // if we're close to the end, pick previous rounds
  // if we're close to the beginning, pick next rounds
  const effectiveStartIndex = Math.max(
    0,
    Math.min(startIndex - 1, rounds.length - 3)
  );

  const slicedRounds = rounds.slice(
    effectiveStartIndex,
    effectiveStartIndex + 3
  );

  const currentSlicedRoundIndex = slicedRounds.findIndex((round) =>
    roundEquals(round, currentRound)
  ) as VisibleRoundOrder;

  const orders = getVisibleRoundOrders(currentSlicedRoundIndex);

  return slicedRounds.map((round, index) => ({
    ...round,
    order: orders[index],
  }));
};

export { chooseVisibleRounds };
