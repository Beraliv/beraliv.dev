import { expect } from "earl";
import { getObjectEntries } from ".";

describe(getObjectEntries.name, () => {
  it("returns empty array for empty object", () => {
    expect(getObjectEntries({})).toEqual([]);
  });

  it("returns one pair for object with one key", () => {
    expect(getObjectEntries({ key: "value" })).toEqual([["key", "value"]]);
  });

  it("returns pairs for object with more than one key", () => {
    expect(getObjectEntries({ key1: "value1", key2: "value2" })).toEqual([
      ["key1", "value1"],
      ["key2", "value2"],
    ]);
  });
});
