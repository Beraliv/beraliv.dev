import { TeamApiModel } from "../Types/TeamApiModel";
import { TennisPlayer } from "../Types/TennisPlayer";
import { convertWordToPascalCase } from "./convertWordToPascalCase";
import { getImageUrlByLastName } from "./getImageUrlByLastName";

const SLUG_SEPARATOR = "-";
const NAME_SEPARATOR = " ";

const createTennisPlayerFromTeam = (
  team: TeamApiModel,
  teamSeed: string | undefined
): TennisPlayer => {
  // First name is last in the slug, e.g.
  // * alcaraz-carlos => Carlos Alcaraz
  // * de-minaur-alex => Alex de Minaur
  const firstName = convertWordToPascalCase(
    team.slug.split(SLUG_SEPARATOR).at(-1) || ""
  );

  // de Minaur A. => [de, Minaur, A.]
  // Kyrgios N. => [Kyrgios, N.]
  const names = team.name.split(NAME_SEPARATOR).map((name) => name.trim());

  const lastName = names.slice(0, -1).join(NAME_SEPARATOR);

  const imageUrl = getImageUrlByLastName(team.slug);

  // Use seed instead of rating - https://rapidapi.com/fluis.lacasse/api/tennisapi1/discussions/94248
  // because global rating always changes but seed stays the same and connected to tournament
  const seed = typeof teamSeed === "string" ? Number(teamSeed) : -1;

  return {
    firstName,
    id: team.id,
    imageUrl,
    lastName,
    seed,
  };
};

export { createTennisPlayerFromTeam };
