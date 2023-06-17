import { TENNIS_PLAYER_IMG_URL_MAPPING } from "../Constants/TENNIS_PLAYER_IMG_URL_MAPPING";
import { Api } from "../Types/Api";
import { TennisPlayer } from "../Types/TennisPlayer";

type Team = Api["events"][number]["awayTeam" | "homeTeam"];

const createTennisPlayerFromTeam = (team: Team): TennisPlayer => {
  // Kyrgios N. => [Kyrgios, N.]
  const [lastName, firstName] = team.name.split(" ").map((name) => name.trim());

  const imageUrl = TENNIS_PLAYER_IMG_URL_MAPPING[lastName.toLowerCase()] || "";

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
