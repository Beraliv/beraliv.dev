import { toKebabCase } from ".";

describe(toKebabCase.name, () => {
  test("does NOT change one word", () => {
    const actual = toKebabCase("word");
    const expected = "word";

    expect(actual).toEqual(expected);
  });

  test("replaces space with hyphen", () => {
    const actual = toKebabCase("two words");
    const expected = "two-words";

    expect(actual).toEqual(expected);
  });

  test("replaces all spaces with hyphens", () => {
    const actual = toKebabCase("oh my god how many words here");
    const expected = "oh-my-god-how-many-words-here";

    expect(actual).toEqual(expected);
  });
});
