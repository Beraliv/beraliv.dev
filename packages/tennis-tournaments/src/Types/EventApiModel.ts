import { RoundApiModel } from "./RoundApiModel";
import { ScoreApiModel } from "./ScoreApiModel";
import { TeamApiModel } from "./TeamApiModel";

interface EventApiModel {
  awayScore: ScoreApiModel;
  awayTeamSeed: string | undefined;
  awayTeam: TeamApiModel;
  homeScore: ScoreApiModel;
  homeTeamSeed: string | undefined;
  homeTeam: TeamApiModel;
  roundInfo: RoundApiModel;
  winnerCode: 1 | 2;
}

export { type EventApiModel };
