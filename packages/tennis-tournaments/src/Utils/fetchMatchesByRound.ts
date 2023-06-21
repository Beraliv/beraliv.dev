import { MatchesByRoundApiModel } from "../Types/MatchesByRoundApiModel";

interface FetchMatchesByRoundParameters {
  roundId: number;
  seasonId: string;
  slug: string;
  tournamentId: string;
}

const RAPID_API_HOST = process.env.RAPID_API_HOST;
const RAPID_API_KEY = process.env.RAPID_API_KEY;

const fetchMatchesByRound = async ({
  roundId,
  seasonId,
  slug,
  tournamentId,
}: FetchMatchesByRoundParameters): Promise<MatchesByRoundApiModel> =>
  (
    await fetch(
      `https://${RAPID_API_HOST}/api/tennis/tournament/${tournamentId}/season/${seasonId}/events/round/${roundId}/slug/${slug}`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": RAPID_API_HOST,
        },
      }
    )
  ).json();

export { fetchMatchesByRound };
