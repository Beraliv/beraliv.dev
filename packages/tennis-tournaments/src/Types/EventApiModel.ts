import { EventStatusApiModel } from "./EventStatusApiModel";
import { RoundApiModel } from "./RoundApiModel";
import { ScoreApiModel } from "./ScoreApiModel";
import { TeamApiModel } from "./TeamApiModel";

interface EventApiModel {
  awayScore: ScoreApiModel;
  awayTeamSeed: string | undefined;
  awayTeam: TeamApiModel;
  homeScore: ScoreApiModel;
  firstToServe: 0 | 1 | 2;
  homeTeamSeed: string | undefined;
  homeTeam: TeamApiModel;
  roundInfo: RoundApiModel;
  status: EventStatusApiModel;
  winnerCode: 0 | 1 | 2;
}

export { type EventApiModel };
