import { SeasonApiModel } from "../Types/SeasonApiModel";

const createSeasonApiModel = (data: {}): SeasonApiModel | null => {
  const id = "id" in data ? data.id : null;
  const name = "name" in data ? data.name : null;
  const year = "year" in data ? data.year : null;

  if (
    typeof id === "number" &&
    typeof name === "string" &&
    typeof year === "string"
  ) {
    return {
      id,
      name,
      year,
    };
  }

  return null;
};

export { createSeasonApiModel };
