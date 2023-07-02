import { RoundApiModel } from "../Types/RoundApiModel";

const createRoundApiModel = (data: {}): RoundApiModel | null => {
  const round = "round" in data ? data.round : null;
  const name = "name" in data ? data.name : null;
  const slug = "slug" in data ? data.slug : null;

  if (
    typeof round === "number" &&
    typeof name === "string" &&
    typeof slug === "string"
  ) {
    return {
      id: round,
      name,
      slug,
    };
  }

  return null;
};

export { createRoundApiModel };
