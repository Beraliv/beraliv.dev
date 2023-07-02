import { TeamApiModel } from "../Types/TeamApiModel";
import { TennisPlayer } from "../Types/TennisPlayer";
import { getImageUrlByLastName } from "./getImageUrlByLastName";

const NAME_SEPARATOR = " ";

const createTennisPlayerFromTeam = (
  team: TeamApiModel,
  teamSeed: string | undefined
): TennisPlayer => {
  // de Minaur A. => [de, Minaur, A.]
  // Kyrgios N. => [Kyrgios, N.]
  const names = team.name.split(NAME_SEPARATOR).map((name) => name.trim());

  const firstName = names.at(-1) || "";
  const lastName = names.slice(0, -1).join(NAME_SEPARATOR);
  const imageUrl = getImageUrlByLastName(lastName);

  // Use seed instead of rating – https://rapidapi.com/fluis.lacasse/api/tennisapi1/discussions/94248
  // because global rating always changes but seed stays the same and connected to tournament
  const seed = typeof teamSeed === "string" ? Number(teamSeed) : -1;

  return {
    country: "",
    firstName,
    id: team.id,
    imageUrl,
    lastName,
    seed,
  };
};

export { createTennisPlayerFromTeam };
