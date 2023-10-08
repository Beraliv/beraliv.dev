import { SeasonApiModel } from "./SeasonApiModel";

interface SeasonsApiModel {
  currentSeason?: SeasonApiModel;
  seasons: SeasonApiModel[];
}

export { type SeasonsApiModel };
