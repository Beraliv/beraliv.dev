import { expect } from "earljs";
import { isWinter } from "./";

describe(isWinter.name, () => {
  it("returns true for January", () => {
    const actual = isWinter(new Date("Jan 01"));

    expect(actual).toEqual(true);
  });

  it("returns true for February", () => {
    const actual = isWinter(new Date("Feb 01"));

    expect(actual).toEqual(true);
  });

  it("returns false for March", () => {
    const actual = isWinter(new Date("Mar 01"));

    expect(actual).toEqual(false);
  });

  it("returns false for April", () => {
    const actual = isWinter(new Date("Apr 01"));

    expect(actual).toEqual(false);
  });

  it("returns false for May", () => {
    const actual = isWinter(new Date("May 01"));

    expect(actual).toEqual(false);
  });

  it("returns false for June", () => {
    const actual = isWinter(new Date("Jun 01"));

    expect(actual).toEqual(false);
  });

  it("returns false for July", () => {
    const actual = isWinter(new Date("Jul 01"));

    expect(actual).toEqual(false);
  });

  it("returns false for August", () => {
    const actual = isWinter(new Date("Aug 01"));

    expect(actual).toEqual(false);
  });

  it("returns false for September", () => {
    const actual = isWinter(new Date("Sep 01"));

    expect(actual).toEqual(false);
  });

  it("returns false for October", () => {
    const actual = isWinter(new Date("Oct 01"));

    expect(actual).toEqual(false);
  });

  it("returns false for November", () => {
    const actual = isWinter(new Date("Nov 01"));

    expect(actual).toEqual(false);
  });

  it("returns true for December", () => {
    const actual = isWinter(new Date("Dec 01"));

    expect(actual).toEqual(true);
  });
});
