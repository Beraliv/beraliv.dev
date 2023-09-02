import { EVENT_TYPES } from "../Constants/EVENT_TYPES";
import { TournamentIds } from "../Types/TournamentIds";
import { logger } from "./logger";

interface ChooseTournamentIdParameters {
  eventType: (typeof EVENT_TYPES)[number];
  tournamentIds: TournamentIds;
}

const chooseTournamentId = ({
  eventType,
  tournamentIds,
}: ChooseTournamentIdParameters): number => {
  logger.log("chooseTournamentId", {
    eventType,
  });

  return tournamentIds[eventType];
};

export { chooseTournamentId };
