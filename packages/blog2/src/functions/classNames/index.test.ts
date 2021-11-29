import { expect } from "earljs";
import { classNames } from ".";

describe(classNames.name, () => {
  test("accepts array of string", () => {
    const actual = classNames("1", "2", "3");
    const expected = "1 2 3";

    expect(actual).toEqual(expected);
  });

  test("accepts object with keys as string and values as boolean", () => {
    const actual = classNames({ "1": true }, { "2": true }, { "3": true });
    const expected = "1 2 3";

    expect(actual).toEqual(expected);
  });

  test("filters all the keys which has false values in object", () => {
    const actual = classNames(
      { "1": true },
      { "2": false },
      { "3": true },
      { "4": false },
      { "5": true },
      { "6": false }
    );
    const expected = "1 3 5";

    expect(actual).toEqual(expected);
  });

  test("does NOT filter the keys which has falsy values in object", () => {
    const actual = classNames(
      { "1": undefined },
      { "2": null },
      // @ts-expect-error
      { "3": 0 }
    );
    const expected = "";

    expect(actual).toEqual(expected);
  });
});
