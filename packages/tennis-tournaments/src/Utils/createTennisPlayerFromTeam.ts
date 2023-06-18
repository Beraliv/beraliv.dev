import { Api } from "../Types/Api";
import { TennisPlayer } from "../Types/TennisPlayer";

type Team = Api["events"][number]["awayTeam" | "homeTeam"];

const createTennisPlayerFromTeam = (team: Team): TennisPlayer => {
  // Kyrgios N. => [Kyrgios, N.]
  const [lastName, firstName] = team.name.split(" ").map((name) => name.trim());

  const imageUrl = `https://res.cloudinary.com/beraliv/image/upload/v1687048409/tennis_tournaments/players/${lastName.toLowerCase()}.avif`;

  return {
    country: "",
    firstName,
    imageUrl,
    lastName,
    // Ranking is up-to-date so it only shows what's the current ranking based on ATP or WTA
    // https://rapidapi.com/fluis.lacasse/api/tennisapi1/discussions/94248
    ranking: team.ranking,
  };
};

export { createTennisPlayerFromTeam };