import { expect } from "earljs";
import { Milliseconds } from "../../types/Milliseconds";
import { getPostUtcDate } from "./";

describe(getPostUtcDate.name, () => {
  test("returns milliseconds for correct date", () => {
    const actual = getPostUtcDate({ date: "2021-03-26" });
    const expected = 1616716800000 as Milliseconds;

    expect(actual).toEqual(expected);
  });

  test("throws error if date cannot be parsed", () => {
    expect(() => getPostUtcDate({ date: "" })).toThrow(
      /Post date format is incorrect: /
    );
  });
});
