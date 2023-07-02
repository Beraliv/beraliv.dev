import { RoundApiModel } from "../Types/RoundApiModel";
import { RoundsApiModel } from "../Types/RoundsApiModel";
import { createRoundApiModel } from "./createRoundApiModel";
import { fetchTennisApi } from "./fetchTennisApi";
import { isDefined } from "./isDefined";
import { isQualification } from "./isQualification";

interface FetchRoundsParameters {
  seasonId: string;
  tournamentId: string;
}

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

  const response = await fetchTennisApi(
    `tournament/${tournamentId}/season/${seasonId}/rounds`
  );

  const data = await response.json();

  const roundsApiModel: RoundsApiModel = {
    currentRound: createRoundApiModel(data.currentRound) || undefined,
    rounds: (data.rounds as RoundApiModel[])
      .map((round) => createRoundApiModel(round))
      .filter(isDefined)
      // Qualifications are hidden because they are not adapted for UI
      .filter((round) => !isQualification(round)),
  };

  return roundsApiModel;
};

export { fetchRounds };
