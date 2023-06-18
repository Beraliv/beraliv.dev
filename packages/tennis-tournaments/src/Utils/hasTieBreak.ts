import { TennisSet } from "../Types/TennisSet";

const hasTieBreak = (
  set: TennisSet[0]
): set is Extract<TennisSet[0], { tieBreak: any }> => "tieBreak" in set;

export { hasTieBreak };
