import { TennisMatchType } from "../Types/TennisMatchType";
import { TournamentIds } from "../Types/TournamentIds";
import { getObjectKeys } from "./getObjectKeys";

const MATCH_TYPE_ENTRIES: Record<TennisMatchType, string> = {
  men: "Men Singles",
  women: "Women Singles",
};

const getMatchTypeEntries = (
  tournamentIds: TournamentIds
): Partial<Record<TennisMatchType, string>> => {
  const result: Partial<Record<TennisMatchType, string>> = {};
  const existingMatchTypes = getObjectKeys(tournamentIds);

  for (const existingMatchType of existingMatchTypes) {
    result[existingMatchType] = MATCH_TYPE_ENTRIES[existingMatchType];
  }

  return result;
};

export { getMatchTypeEntries };
