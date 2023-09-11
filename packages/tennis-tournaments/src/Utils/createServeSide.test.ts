import { describe, it, expect } from "vitest";

import { CreateServeSideOptions, createServeSide } from "./createServeSide";
import { PlayerCentricScore } from "../Types/PlayerCentricScore";

interface TestCase {
  it: string;
  scores: PlayerCentricScore[];
  options: CreateServeSideOptions;
  expected: ReturnType<typeof createServeSide>;
}

const FINISHED_MATCH: PlayerCentricScore[] = [
  { type: "match", home: { points: 3 }, away: { points: 1 } },
];

const JUST_STARTED_GAME: PlayerCentricScore[] = [
  { type: "game", home: { points: "0" }, away: { points: "30" } },
];

const EVEN_GAMES_IN: PlayerCentricScore[] = [
  { type: "set", home: { points: 1 }, away: { points: 3 } },
  { type: "game", home: { points: "0" }, away: { points: "30" } },
];

const EVEN_GAMES_AND_TIE_BREAK_IN: PlayerCentricScore[] = [
  {
    type: "setWithTieBreak",
    home: { points: 7, tieBreak: 7 },
    away: { points: 6, tieBreak: 5 },
  },
  { type: "set", home: { points: 1 }, away: { points: 0 } },
  { type: "game", home: { points: "0" }, away: { points: "30" } },
];

const JUST_STARTED_TIE_BREAK: PlayerCentricScore[] = [
  {
    type: "set",
    home: { points: 6 },
    away: { points: 6 },
  },
  { type: "game", home: { points: "0" }, away: { points: "0" } },
];

const ONE_POINT_PLAYED_IN_TIE_BREAK: PlayerCentricScore[] = [
  {
    type: "set",
    home: { points: 6 },
    away: { points: 6 },
  },
  { type: "game", home: { points: "1" }, away: { points: "0" } },
];

const ODD_GAMES_IN: PlayerCentricScore[] = [
  { type: "set", home: { points: 3 }, away: { points: 2 } },
  { type: "game", home: { points: "A" }, away: { points: "30" } },
];

const ODD_GAMES_AND_TIE_BREAK_IN: PlayerCentricScore[] = [
  {
    type: "setWithTieBreak",
    home: { points: 7, tieBreak: 7 },
    away: { points: 6, tieBreak: 5 },
  },
  { type: "set", home: { points: 0 }, away: { points: 0 } },
  { type: "game", home: { points: "A" }, away: { points: "30" } },
];

const SAME_SIDE_SERVES: number[] = [0, 3, 4, 7, 8, 11, 12];
const ANOTHER_SIDE_SERVES: number[] = [1, 2, 5, 6, 9, 10, 13];

const getGamesAndTieBreakIn = (
  totalPointsInTieBreak: number
): PlayerCentricScore[] => [
  {
    type: "set",
    home: { points: 6 },
    away: { points: 6 },
  },
  {
    type: "game",
    home: { points: `${totalPointsInTieBreak}` },
    away: { points: "0" },
  },
];

const testCases: TestCase[] = [
  {
    it: "match is NOT started",
    scores: [],
    options: { firstToServe: undefined },
    expected: undefined,
  },
  {
    it: "match is finished",
    scores: FINISHED_MATCH,
    options: { firstToServe: undefined },
    expected: undefined,
  },
  {
    it: "game just started",
    scores: JUST_STARTED_GAME,
    options: { firstToServe: "home" },
    expected: "home",
  },
  {
    it: "number of finished games is even (excluding tie break)",
    scores: EVEN_GAMES_IN,
    options: { firstToServe: "away" },
    expected: "away",
  },
  {
    it: "number of finished games is even (including tie break)",
    scores: EVEN_GAMES_AND_TIE_BREAK_IN,
    options: { firstToServe: "home" },
    expected: "home",
  },
  {
    it: "number of finished games is odd (excluding tie break)",
    scores: ODD_GAMES_IN,
    options: { firstToServe: "home" },
    expected: "away",
  },
  {
    it: "number of finished games is odd (including tie break)",
    scores: ODD_GAMES_AND_TIE_BREAK_IN,
    options: { firstToServe: "away" },
    expected: "home",
  },
  {
    it: "tie break just started",
    scores: JUST_STARTED_TIE_BREAK,
    options: { firstToServe: "away" },
    expected: "away",
  },
  {
    it: "one point is played in tie break",
    scores: ONE_POINT_PLAYED_IN_TIE_BREAK,
    options: { firstToServe: "away" },
    expected: "home",
  },
  ...SAME_SIDE_SERVES.map(
    (totalNumberOfPoints): TestCase => ({
      it: `${totalNumberOfPoints} point(s) are played in tie break`,
      scores: getGamesAndTieBreakIn(totalNumberOfPoints),
      options: { firstToServe: "away" },
      expected: "away",
    })
  ),
  ...ANOTHER_SIDE_SERVES.map(
    (totalNumberOfPoints): TestCase => ({
      it: `${totalNumberOfPoints} point(s) are played in tie break`,
      scores: getGamesAndTieBreakIn(totalNumberOfPoints),
      options: { firstToServe: "away" },
      expected: "home",
    })
  ),
];

describe(createServeSide.name, () => {
  it.each(testCases)("$it", ({ scores, options, expected }) => {
    expect(createServeSide(scores, options)).toBe(expected);
  });
});
