import { expect } from "earljs";
import { createLocalLinkId } from ".";

describe(createLocalLinkId.name, () => {
  it("does NOT change one word", () => {
    const actual = createLocalLinkId("word");
    const expected = "word";

    expect(actual).toEqual(expected);
  });

  it("replaces space with hyphen", () => {
    const actual = createLocalLinkId("two words");
    const expected = "two-words";

    expect(actual).toEqual(expected);
  });

  it("replaces all spaces with hyphens", () => {
    const actual = createLocalLinkId("oh my god how many words here");
    const expected = "oh-my-god-how-many-words-here";

    expect(actual).toEqual(expected);
  });

  it("makes lower case", () => {
    const actual = createLocalLinkId("HELLO ITS ME");
    const expected = "hello-its-me";

    expect(actual).toEqual(expected);
  });

  it("removes punctuation from words", () => {
    const actual = createLocalLinkId(
      "Hello, how\" are you? I'm: fine. Thanks!"
    );
    const expected = "hello-how-are-you-im-fine-thanks";

    expect(actual).toEqual(expected);
  });
});
