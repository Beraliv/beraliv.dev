import { PlayerCentricScore } from "../Types/PlayerCentricScore";

const hasTieBreak = (
  score: PlayerCentricScore
): score is Extract<PlayerCentricScore, { type: "setWithTieBreak" }> =>
  score.type === "setWithTieBreak";

export { hasTieBreak };
