import { MatchCardProps } from "../MatchCard";
import { VisibleRoundOrder } from "./getVisibleRoundOrders";
import { fetchTennisApi } from "./fetchTennisApi";
import { CupTreesApiModel } from "../Types/CupTreesApiModel";
import {
  AllRounds,
  createRoundsFromCupTrees,
} from "./createRoundsFromCupTrees";

interface FetchTournamentTreeParameters {
  seasonId: string;
  tournamentId: string;
}

interface SimpleTournamentRound {
  matches: MatchCardProps[];
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

  const response = await fetchTennisApi(
    `tournament/${tournamentId}/season/${seasonId}/cup-trees`
  );

  try {
    const cupTreesApiModel: CupTreesApiModel = await response.json();

    const roundsData = createRoundsFromCupTrees(cupTreesApiModel);

    return roundsData;
  } catch (error) {
    // It may happen when requesting round that wasn't played yet

    return [];
  }
};

export { fetchTournamentTree, type SimpleTournamentRound };
