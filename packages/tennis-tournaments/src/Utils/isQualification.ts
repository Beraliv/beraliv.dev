import { RoundApiModel } from "../Types/RoundApiModel";

const isQualification = (round: RoundApiModel): boolean => {
  return round.name.includes("Qualification");
};

export { isQualification };
