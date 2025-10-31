import { expect } from "earl";
import { formatDate } from ".";

describe(formatDate.name, () => {
  it("returns the string", () => {
    expect(formatDate(new Date(1994, 0, 26))).toEqual("26 Jan 1994");
  });
});
