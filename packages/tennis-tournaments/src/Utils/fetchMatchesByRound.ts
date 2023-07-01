import { MatchesByRoundApiModel } from "../Types/MatchesByRoundApiModel";
import { fetchTennisApi } from "./fetchTennisApi";

interface FetchMatchesByRoundParameters {
  roundId: number;
  seasonId: string;
  slug: string;
  tournamentId: string;
}

const fetchMatchesByRound = async ({
  roundId,
  seasonId,
  slug,
  tournamentId,
}: FetchMatchesByRoundParameters): Promise<MatchesByRoundApiModel | null> => {
  const response = await fetchTennisApi(
    `tournament/${tournamentId}/season/${seasonId}/events/round/${roundId}/slug/${slug}`
  );

  try {
    const data: MatchesByRoundApiModel = await response.json();

    return data;
  } catch (error) {
    // It may happen when requesting round that wasn't played yet
    console.error(error);

    return null;
  }
};

export { fetchMatchesByRound };
