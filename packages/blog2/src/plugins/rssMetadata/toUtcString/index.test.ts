import { expect } from "earl";
import { Milliseconds } from "../../../types/Milliseconds";
import { toUtcString } from "./";

describe(toUtcString.name, () => {
  it("returns UTC string for milliseconds", () => {
    const actual = toUtcString(1616716800000 as Milliseconds);
    const expected = "Fri, 26 Mar 2021 00:00:00 GMT";

    expect(actual).toEqual(expected);
  });
});
