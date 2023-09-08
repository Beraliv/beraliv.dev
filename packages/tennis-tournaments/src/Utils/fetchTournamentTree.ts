import { VisibleRoundOrder } from "./getVisibleRoundOrders";
import { fetchTennisApi } from "./fetchTennisApi";
import { CupTreesApiModel } from "../Types/CupTreesApiModel";
import {
  AllRounds,
  MatchCardPropsWithOrder,
  createRoundsFromCupTrees,
} from "./createRoundsFromCupTrees";
import { logger } from "./logger";

interface FetchTournamentTreeParameters {
  seasonId: string;
  tournamentId: number | undefined;
}

interface SimpleTournamentRound {
  matches: MatchCardPropsWithOrder[];
  order: VisibleRoundOrder;
  title: string;
}

const fetchTournamentTree = async ({
  seasonId,
  tournamentId,
}: FetchTournamentTreeParameters): Promise<AllRounds[]> => {
  if (!seasonId) {
    return Promise.resolve([]);
  }

  if (tournamentId === undefined) {
    return Promise.resolve([]);
  }

  logger.log("fetchTournamentTree", {
    seasonId,
    tournamentId,
  });

  const response = await fetchTennisApi(
    `tournament/${tournamentId}/season/${seasonId}/cup-trees`
  );

  try {
    const cupTreesApiModel: CupTreesApiModel = await response.json();

    const roundsData = createRoundsFromCupTrees(cupTreesApiModel);

    return roundsData;
  } catch (error) {
    logger.error(error, {
      context: "Error may happen when requesting round that was NOT played yet",
    });

    return [];
  }
};

export { fetchTournamentTree, type SimpleTournamentRound };
