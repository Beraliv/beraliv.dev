import { expect } from "earljs";
import { getAllPosts } from ".";

describe(getAllPosts.name, () => {
  it("returns all posts from content directory", () => {
    const posts = getAllPosts();
    const slugs = posts.map(({ name }) => name);

    expect(slugs).toEqual([
      "2018-10-04-scrollbar-customisation",
      "2019-12-17-amazon-prime-video-player-investigation",
      "2019-12-22-bbc-iplayer-geolocation-identification",
      "2020-01-07-whats-inside-udemy-player",
      "2020-05-04-research-joyn-scripts-obfuscation",
      "2020-10-06-work-in-video-advertising-player-in-yandex",
      "2021-03-26-typed-get",
      "2021-04-04-type-challenges",
      "2021-04-05-pick-under-the-hood",
      "2021-04-06-readonly-under-the-hood",
      "2021-04-07-making-object-out-of-tuple",
      "2021-04-08-infer-first-element",
      "2021-04-09-infer-length",
      "2021-04-12-exclude-under-the-hood",
      "2021-04-13-unwrapping-promises",
      "2021-04-14-boolean-condition",
      "2021-04-15-spread-in-tuple-types-in-typescript",
      "2021-04-16-includes-in-typescript",
      "2021-04-19-return-type-under-the-hood",
      "2021-04-21-omit-under-the-hood",
      "2021-04-23-partial-readonly",
      "2021-04-25-recursive-readonly-for-objects",
      "2021-04-27-making-union-out-of-tuple",
      "2021-04-28-chainable-options",
      "2021-04-29-infer-last-element",
      "2021-05-01-manipulation-with-tuple-elements",
      "2021-05-04-promise-all-under-the-hood",
      "2021-05-06-extract-under-the-hood",
      "2021-05-07-opaque-type-in-typescript",
      "2021-05-10-trim-left-in-typescript",
      "2021-05-11-trim-in-typescript",
      "2021-05-14-type-aliases-for-string-manipulation",
      "2021-05-17-replace-occurrence-in-a-string-in-typescript",
      "2021-05-22-replace-all-occurrences-in-a-string-in-typescript",
      "2021-05-23-append-argument",
      "2021-05-30-permutations-in-typescript",
      "2021-05-31-string-length-in-typescript",
      "2021-06-13-flatten-tuple-type-in-typescript",
      "2021-06-16-append-to-object",
      "2021-06-19-making-union-out-of-string",
      "2021-06-21-absolute-in-typescript",
      "2021-07-05-spread-in-typescript",
      "2021-11-27-tuple-filter",
      "2021-11-29-split",
      "2021-12-03-string-to-number",
      "2021-12-07-get-optional",
      "2021-12-10-advanced-types-holyjs-notes",
      "2022-07-14-camel-case",
      "2022-09-10-with-or-without-enums",
      "2023-12-21-story-of-unknown-low-tier-device-and-its-mse-issues-lvt-notes",
    ]);
  });
});
