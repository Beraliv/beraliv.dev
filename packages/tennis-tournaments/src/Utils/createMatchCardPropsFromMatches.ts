import { MatchCardProps } from "../MatchCard";
import { MatchesByRoundApiModel } from "../Types/MatchesByRoundApiModel";
import { createMatchStatusFromEvent } from "./createMatchStatusFromEvent";
import { createTennisPlayerFromTeam } from "./createTennisPlayerFromTeam";
import { createTennisSetsFromScores } from "./createTennisSetsFromScores";

const createMatchCardPropsFromMatches = (
  data: MatchesByRoundApiModel
): MatchCardProps[] =>
  data.events.map((event) => ({
    awayPlayer: createTennisPlayerFromTeam(event.awayTeam, event.awayTeamSeed),
    homePlayer: createTennisPlayerFromTeam(event.homeTeam, event.homeTeamSeed),
    sets: createTennisSetsFromScores(event.homeScore, event.awayScore),
    status: createMatchStatusFromEvent(event),
  }));

export { createMatchCardPropsFromMatches };
