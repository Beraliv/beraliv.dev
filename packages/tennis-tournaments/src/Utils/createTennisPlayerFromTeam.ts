import { TENNIS_PLAYER_IMG_URL_MAPPING } from "../Constants/TENNIS_PLAYER_IMG_URL_MAPPING";
import { TennisPlayer } from "../Types/TennisPlayer";
import * as EventResponse from "../event-mock.json";

type Team = (typeof EventResponse)["event"]["awayTeam" | "homeTeam"];

const createTennisPlayerFromTeam = (team: Team): TennisPlayer => {
  // Nadal, Rafael => [Nadal, Rafael]
  const [lastName, firstName] = team.fullName
    .split(",")
    .map((name) => name.trim());

  const imageUrl = TENNIS_PLAYER_IMG_URL_MAPPING[lastName.toLowerCase()] || "";

  return {
    country: team.country.name,
    firstName,
    imageUrl,
    lastName,
    ranking: team.ranking,
  };
};

export { createTennisPlayerFromTeam };
