import { TeamApiModel } from "../Types/TeamApiModel";
import { TennisPlayer } from "../Types/TennisPlayer";

const createTennisPlayerFromTeam = (team: TeamApiModel): TennisPlayer => {
  // Kyrgios N. => [Kyrgios, N.]
  const [lastName, firstName] = team.name.split(" ").map((name) => name.trim());

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
