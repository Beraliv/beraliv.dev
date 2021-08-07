import { getCodeLanguageType } from ".";
import { CODE_LANGUAGES } from "../../constants/CODE_LANGUAGES";

describe(getCodeLanguageType.name, () => {
  test("returns undefined if className does NOT match", () => {
    // @ts-expect-error
    const actual = getCodeLanguageType("random-string");
    const expected = undefined;

    expect(actual).toEqual<typeof actual>(expected);
  });

  test("returns undefined if matched language is unknown", () => {
    // @ts-expect-error
    const actual = getCodeLanguageType("language-");
    const expected = undefined;

    expect(actual).toEqual<typeof actual>(expected);
  });

  CODE_LANGUAGES.forEach((language) => {
    test(`returns ${language} as it matches and is in the known list of languages`, () => {
      const actual = getCodeLanguageType(`language-${language}`);
      const expected = language;

      expect(actual).toEqual<typeof actual>(expected);
    });
  });
});
