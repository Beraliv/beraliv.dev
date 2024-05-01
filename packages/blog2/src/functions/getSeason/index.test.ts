import { expect } from "earl";
import { getSeason } from ".";

describe(getSeason.name, () => {
  it("returns winter for January", () => {
    expect(getSeason({ getMonth: () => 0 })).toEqual("winter");
  });

  it("returns winter for February", () => {
    expect(getSeason({ getMonth: () => 1 })).toEqual("winter");
  });

  it("returns spring for March", () => {
    expect(getSeason({ getMonth: () => 2 })).toEqual("spring");
  });

  it("returns spring for April", () => {
    expect(getSeason({ getMonth: () => 3 })).toEqual("spring");
  });

  it("returns spring for May", () => {
    expect(getSeason({ getMonth: () => 4 })).toEqual("spring");
  });

  it("returns summer for June", () => {
    expect(getSeason({ getMonth: () => 5 })).toEqual("summer");
  });

  it("returns summer for July", () => {
    expect(getSeason({ getMonth: () => 6 })).toEqual("summer");
  });

  it("returns summer for August", () => {
    expect(getSeason({ getMonth: () => 7 })).toEqual("summer");
  });

  it("returns autumn for September", () => {
    expect(getSeason({ getMonth: () => 8 })).toEqual("autumn");
  });

  it("returns autumn for October", () => {
    expect(getSeason({ getMonth: () => 9 })).toEqual("autumn");
  });

  it("returns autumn for November", () => {
    expect(getSeason({ getMonth: () => 10 })).toEqual("autumn");
  });

  it("returns winter for December", () => {
    expect(getSeason({ getMonth: () => 11 })).toEqual("winter");
  });

  it("returns undefined for negative month index", () => {
    expect(getSeason({ getMonth: () => -1 })).toEqual(undefined);
  });

  it("returns undefined for >11 month index", () => {
    expect(getSeason({ getMonth: () => 12 })).toEqual(undefined);
  });
});
