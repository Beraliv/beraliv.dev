import { TennisMatchType } from "../Types/TennisMatchType";
import { TournamentIds } from "../Types/TournamentIds";
import { logger } from "./logger";

interface ChooseTournamentIdParameters {
  matchType: TennisMatchType;
  tournamentIds: TournamentIds;
}

const chooseTournamentId = ({
  matchType,
  tournamentIds,
}: ChooseTournamentIdParameters): number | undefined => {
  logger.log("chooseTournamentId", {
    matchType,
  });

  return tournamentIds[matchType];
};

export { chooseTournamentId };
