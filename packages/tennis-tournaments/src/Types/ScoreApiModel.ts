type InProgressScoreApiModel = {
  current?: number;
  display?: number;
  point?: string;
};

type FinishedScoreApiModel = {
  [key in 1 | 2 | 3 | 4 | 5 as `period${key}` | `period${key}TieBreak`]?:
    | number
    | undefined;
};

type ScoreApiModel = InProgressScoreApiModel & FinishedScoreApiModel;

export { type ScoreApiModel };
