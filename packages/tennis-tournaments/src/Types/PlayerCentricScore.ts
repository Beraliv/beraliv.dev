/**
 * game score with points (0, 15, 30, 40, A) for live events
 */
interface GameScore {
  points: string;
}

/**
 * set score with games (0, 1, 2, 3, 4, 5, 6, 7)
 */
interface SetScore {
  points: number;
  tieBreak?: never;
}

/**
 * set score with games (0, 1, 2, 3, 4, 5, 6, 7) and tie break (7, 8, 9, 10, etc)
 */
interface SetWithTieBreakScore {
  points: number;
  tieBreak: number;
}

/**
 * match score with sets (0, 1, 2, 3)
 */
interface MatchScore {
  points: number;
}

type PlayerCentricScore =
  | { home: GameScore; away: GameScore; type: "game" }
  | { home: SetScore; away: SetScore; type: "set" }
  | {
      home: SetWithTieBreakScore;
      away: SetWithTieBreakScore;
      type: "setWithTieBreak";
    }
  | { home: MatchScore; away: MatchScore; type: "match" };

export {
  type PlayerCentricScore,
  type SetWithTieBreakScore,
  type SetScore,
  type GameScore,
};
