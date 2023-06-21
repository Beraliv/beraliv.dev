import { MatchCardProps } from "../MatchCard";
import { MatchesByRoundApiModel } from "../Types/MatchesByRoundApiModel";
import { createTennisPlayerFromTeam } from "./createTennisPlayerFromTeam";
import { createTennisSetsFromScores } from "./createTennisSetsFromScores";

const createMatchCardPropsFromMatches = (
  data: MatchesByRoundApiModel
): MatchCardProps[] =>
  data.events.map((event) => ({
    awayPlayer: createTennisPlayerFromTeam(event.awayTeam),
    homePlayer: createTennisPlayerFromTeam(event.homeTeam),
    sets: createTennisSetsFromScores(event.homeScore, event.awayScore),
    winner: event.winnerCode === 1 ? "home" : "away",
  }));

export { createMatchCardPropsFromMatches };
