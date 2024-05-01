import { expect } from "earl";
import { getLocationSearchParameters } from ".";

describe(getLocationSearchParameters.name, () => {
  it("returns empty object if search is empty", () => {
    const actual = getLocationSearchParameters("");
    const expected = {};

    expect(actual).toEqual(expected);
  });

  it("returns object with one key if search has only one GET parameter", () => {
    const actual = getLocationSearchParameters("?key=value");
    const expected = { key: "value" };

    expect(actual).toEqual(expected);
  });
});
