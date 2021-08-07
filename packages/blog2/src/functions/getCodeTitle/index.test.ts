import { getCodeTitle } from ".";

describe(getCodeTitle.name, () => {
  test("returns undefined if meta is undefined", () => {
    const actual = getCodeTitle(undefined);
    const expected = undefined;

    expect(actual).toEqual<typeof actual>(expected);
  });

  test("returns undefined if meta does NOT match", () => {
    const actual = getCodeTitle("random-string");
    const expected = undefined;

    expect(actual).toEqual<typeof actual>(expected);
  });

  test("returns title", () => {
    const actual = getCodeTitle("title=Testing title");
    const expected = "Testing title";

    expect(actual).toEqual<typeof actual>(expected);
  });
});
