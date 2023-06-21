type TennisSet =
  | [home: { games: number }, away: { games: number }]
  | [
      home: { games: number; tieBreak: number },
      away: { games: number; tieBreak: number }
    ];

export { type TennisSet };
