import { expect } from "earl";
import { Milliseconds } from "../../types/Milliseconds";
import { getPostUtcDate } from "./";

describe(getPostUtcDate.name, () => {
  it("returns milliseconds", () => {
    const actual = getPostUtcDate({ rawCreated: "2021-03-26" });
    const expected = 1616716800000 as Milliseconds;

    expect(actual).toEqual(expected);
  });

  it("throws error if raw date cannot be parsed", () => {
    expect(() => getPostUtcDate({ rawCreated: "" })).toThrow(
      "Post date format is incorrect: "
    );
  });
});
