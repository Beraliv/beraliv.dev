import { SeasonApiModel } from "../Types/SeasonApiModel";
import { SeasonsApiModel } from "../Types/SeasonsApiModel";
import { createSeasonApiModel } from "./createSeasonApiModel";
import { fetchTennisApi } from "./fetchTennisApi";
import { isDefined } from "./isDefined";
import { logger } from "./logger";

const fetchSeasons = async (
  tournamentId: number | undefined
): Promise<SeasonsApiModel> => {
  if (tournamentId === undefined) {
    return Promise.resolve({
      seasons: [],
    });
  }

  logger.log("fetchSeasons", {
    tournamentId,
  });

  const response = await fetchTennisApi(`tournament/${tournamentId}/seasons`);

  const data = await response.json();

  const seasons = (data.seasons as SeasonApiModel[])
    .map((season) => createSeasonApiModel(season))
    .filter(isDefined);

  const roundsApiModel: SeasonsApiModel = {
    currentSeason: seasons[0],
    seasons,
  };

  return roundsApiModel;
};

export { fetchSeasons };
