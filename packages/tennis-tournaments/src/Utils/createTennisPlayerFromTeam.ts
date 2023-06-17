import { TennisPlayer } from "../Types/TennisPlayer";
import * as EventResponse from "../event-mock.json";

type Team = (typeof EventResponse)["event"]["awayTeam" | "homeTeam"];

const createTennisPlayerFromTeam = (team: Team): TennisPlayer => {
  return {
    imageUrl: "",
    country: team.country.name,
    // e.g. Nadal, Rafael
    name: team.fullName,
    ranking: team.ranking,
  };
};

export { createTennisPlayerFromTeam };
