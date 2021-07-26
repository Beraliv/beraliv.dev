import { createLocalLinkId } from ".";

describe(createLocalLinkId.name, () => {
  test("does NOT change one word", () => {
    const actual = createLocalLinkId("word");
    const expected = "word";

    expect(actual).toEqual(expected);
  });

  test("replaces space with hyphen", () => {
    const actual = createLocalLinkId("two words");
    const expected = "two-words";

    expect(actual).toEqual(expected);
  });

  test("replaces all spaces with hyphens", () => {
    const actual = createLocalLinkId("oh my god how many words here");
    const expected = "oh-my-god-how-many-words-here";

    expect(actual).toEqual(expected);
  });

  test("makes lower case", () => {
    const actual = createLocalLinkId("HELLO ITS ME");
    const expected = "hello-its-me";

    expect(actual).toEqual(expected);
  });

  test("removes punctuation from words", () => {
    const actual = createLocalLinkId("Hello, how are you?");
    const expected = "hello-how-are-you";

    expect(actual).toEqual(expected);
  });
});
