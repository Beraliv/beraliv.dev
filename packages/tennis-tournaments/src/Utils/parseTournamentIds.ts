import { TENNIS_MATCH_TYPES } from "../Constants/TENNIS_MATCH_TYPES";
import { TournamentIds } from "../Types/TournamentIds";
import { logger } from "./logger";

const parseTournamentIds = (tournamentId: string): TournamentIds => {
  const keyValues = tournamentId.split("&");

  let obj: Record<string, number> = {};

  for (let keyValue of keyValues) {
    const [key, stringifiedValue] = keyValue.split("=");
    const value = parseInt(stringifiedValue, 10);

    if (!(TENNIS_MATCH_TYPES as unknown as string[]).includes(key)) {
      logger.warn("parseTournamentIds", {
        message: "Value is added for unknown key",
        key,
        value,
      });
    }

    obj[key] = value;
  }

  for (let tennisMatchType of TENNIS_MATCH_TYPES) {
    if (!obj[tennisMatchType]) {
      logger.warn("parseTournamentIds", {
        message: "No value is found for the key",
        key: tennisMatchType,
      });
    }
  }

  return obj;
};

export { parseTournamentIds };
