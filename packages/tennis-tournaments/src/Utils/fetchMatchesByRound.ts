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
}: FetchMatchesByRoundParameters): Promise<MatchesByRoundApiModel> => {
  const response = await fetchTennisApi(
    `tournament/${tournamentId}/season/${seasonId}/events/round/${roundId}/slug/${slug}`
  );

  const data: MatchesByRoundApiModel = await response.json();

  return data;
};

export { fetchMatchesByRound };
