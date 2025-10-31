import { expect } from "earl";
import { parseDate } from ".";

describe(parseDate.name, () => {
  it("returns the date", () => {
    expect(parseDate("1994-01-26", "test-slug")).toEqual(new Date(1994, 0, 26));
  });

  it("throws the error when month is lower than 1", () => {
    expect(() => parseDate("2024-00-18", "test-slug")).toThrow(
      'Cannot use month index -1 for slug "test-slug"'
    );
  });

  it("throws the error when month is greater than 12", () => {
    expect(() => parseDate("2024-13-18", "test-slug")).toThrow(
      'Cannot use month index 12 for slug "test-slug"'
    );
  });

  it("throws the error when day is lower than 1", () => {
    expect(() => parseDate("2024-01-00", "test-slug")).toThrow(
      'Cannot use day 0 for a month index 0 and slug "test-slug"'
    );
  });

  it("throws the error when month is greater than the max for a specified month", () => {
    // Jan
    expect(() => parseDate("2024-01-32", "test-slug")).toThrow(
      'Cannot use day 32 for a month index 0 and slug "test-slug"'
    );
    // Feb
    expect(() => parseDate("2024-02-30", "test-slug")).toThrow(
      'Cannot use day 30 for a month index 1 and slug "test-slug"'
    );
    //   Mar
    expect(() => parseDate("2024-03-32", "test-slug")).toThrow(
      'Cannot use day 32 for a month index 2 and slug "test-slug"'
    );
    //   Apr
    expect(() => parseDate("2024-04-31", "test-slug")).toThrow(
      'Cannot use day 31 for a month index 3 and slug "test-slug"'
    );
    //   May
    expect(() => parseDate("2024-05-32", "test-slug")).toThrow(
      'Cannot use day 32 for a month index 4 and slug "test-slug"'
    );
    //   Jun
    expect(() => parseDate("2024-06-31", "test-slug")).toThrow(
      'Cannot use day 31 for a month index 5 and slug "test-slug"'
    );
    //   Jul
    expect(() => parseDate("2024-07-32", "test-slug")).toThrow(
      'Cannot use day 32 for a month index 6 and slug "test-slug"'
    );
    //   Aug
    expect(() => parseDate("2024-08-32", "test-slug")).toThrow(
      'Cannot use day 32 for a month index 7 and slug "test-slug"'
    );
    //   Sep
    expect(() => parseDate("2024-09-31", "test-slug")).toThrow(
      'Cannot use day 31 for a month index 8 and slug "test-slug"'
    );
    //   Oct
    expect(() => parseDate("2024-10-32", "test-slug")).toThrow(
      'Cannot use day 32 for a month index 9 and slug "test-slug"'
    );
    //   Nov
    expect(() => parseDate("2024-11-31", "test-slug")).toThrow(
      'Cannot use day 31 for a month index 10 and slug "test-slug"'
    );
    //   Dec
    expect(() => parseDate("2024-12-32", "test-slug")).toThrow(
      'Cannot use day 32 for a month index 11 and slug "test-slug"'
    );
  });
});
