import { RoundApiModel } from "./RoundApiModel";
import { ScoreApiModel } from "./ScoreApiModel";
import { TeamApiModel } from "./TeamApiModel";

interface EventApiModel {
  awayScore: ScoreApiModel;
  awayTeam: TeamApiModel;
  homeScore: ScoreApiModel;
  homeTeam: TeamApiModel;
  roundInfo: RoundApiModel;
  winnerCode: 1 | 2;
}

export { type EventApiModel };
