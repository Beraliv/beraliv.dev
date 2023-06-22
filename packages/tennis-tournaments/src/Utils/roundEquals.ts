import { RoundApiModel } from "../Types/RoundApiModel";

const roundEquals = (round1: RoundApiModel, round2: RoundApiModel): boolean => {
  return round1.id === round2.id && round1.slug === round2.slug;
};

export { roundEquals };
