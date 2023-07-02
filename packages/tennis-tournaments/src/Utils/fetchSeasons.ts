import { SeasonApiModel } from "../Types/SeasonApiModel";
import { SeasonsApiModel } from "../Types/SeasonsApiModel";
import { createSeasonApiModel } from "./createSeasonApiModel";
import { fetchTennisApi } from "./fetchTennisApi";
import { isDefined } from "./isDefined";

const fetchSeasons = async (tournamentId: string): Promise<SeasonsApiModel> => {
  if (tournamentId === "") {
    return Promise.resolve({
      seasons: [],
    });
  }

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
