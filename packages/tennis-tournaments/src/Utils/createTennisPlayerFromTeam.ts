import { TeamApiModel } from "../Types/TeamApiModel";
import { TennisPlayer } from "../Types/TennisPlayer";

const NAME_SEPARATOR = " ";

const createTennisPlayerFromTeam = (team: TeamApiModel): TennisPlayer => {
  // de Minaur A. => [de, Minaur, A.]
  // Kyrgios N. => [Kyrgios, N.]
  const names = team.name.split(NAME_SEPARATOR).map((name) => name.trim());

  const firstName = names.at(-1) || "";
  const lastName = names.slice(0, -1).join(NAME_SEPARATOR);

  const imageUrl = `https://res.cloudinary.com/beraliv/image/upload/v1687048409/tennis_tournaments/players/${lastName.toLowerCase()}.avif`;

  return {
    country: "",
    firstName,
    id: team.id,
    imageUrl,
    lastName,
    // Ranking is up-to-date so it only shows what's the current ranking based on ATP or WTA
    // https://rapidapi.com/fluis.lacasse/api/tennisapi1/discussions/94248
    ranking: team.ranking,
  };
};

export { createTennisPlayerFromTeam };
