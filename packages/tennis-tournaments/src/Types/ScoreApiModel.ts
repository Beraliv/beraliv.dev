type ScoreApiModel = {
  [key in 1 | 2 | 3 | 4 | 5 as `period${key}` | `period${key}TieBreak`]?:
    | number
    | undefined;
};

export { type ScoreApiModel };
