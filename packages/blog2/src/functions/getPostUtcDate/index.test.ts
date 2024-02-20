import { expect } from "earljs";
import { Milliseconds } from "../../types/Milliseconds";
import { getPostUtcDate } from "./";

describe(getPostUtcDate.name, () => {
  it("returns milliseconds", () => {
    const actual = getPostUtcDate({ rawDate: "2021-03-26" });
    const expected = 1616716800000 as Milliseconds;

    expect(actual).toEqual(expected);
  });

  it("throws error if raw date cannot be parsed", () => {
    expect(() => getPostUtcDate({ rawDate: "" })).toThrow(
      "Post date format is incorrect: "
    );
  });
});
