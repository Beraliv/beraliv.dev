import { EventStatusApiModel } from "./EventStatusApiModel";
import { RoundApiModel } from "./RoundApiModel";
import { ScoreApiModel } from "./ScoreApiModel";
import { TeamApiModel } from "./TeamApiModel";

interface EventApiModel {
  awayScore: ScoreApiModel;
  awayTeam: TeamApiModel;
  awayTeamSeed: string | undefined;
  firstToServe: 0 | 1 | 2;
  homeScore: ScoreApiModel;
  homeTeam: TeamApiModel;
  homeTeamSeed: string | undefined;
  roundInfo: RoundApiModel;
  status: EventStatusApiModel;
  winnerCode: 0 | 1 | 2;
}

export { type EventApiModel };
