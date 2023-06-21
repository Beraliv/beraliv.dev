import { RoundApiModel } from "../Types/RoundApiModel";
import { RoundsApiModel } from "../Types/RoundsApiModel";
import { createRoundApiModel } from "./createRoundApiModel";
import { isDefined } from "./isDefined";

interface FetchRoundsParameters {
  seasonId: string;
  tournamentId: string;
}

const RAPID_API_HOST = process.env.RAPID_API_HOST;
const RAPID_API_KEY = process.env.RAPID_API_KEY;

const fetchRounds = async ({
  seasonId,
  tournamentId,
}: FetchRoundsParameters): Promise<RoundsApiModel> => {
  if (seasonId === "") {
    return Promise.resolve({
      rounds: [],
    });
  }

  if (tournamentId === "") {
    return Promise.resolve({
      rounds: [],
    });
  }

  const response = await fetch(
    `https://${RAPID_API_HOST}/api/tennis/tournament/${tournamentId}/season/${seasonId}/rounds`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_API_KEY,
        "X-RapidAPI-Host": RAPID_API_HOST,
      },
    }
  );

  const data = await response.json();

  const roundsApiModel: RoundsApiModel = {
    currentRound: createRoundApiModel(data.currentRound) || undefined,
    rounds: (data.rounds as RoundApiModel[])
      .map((round) => createRoundApiModel(round))
      .filter(isDefined),
  };

  return roundsApiModel;
};

export { fetchRounds };
