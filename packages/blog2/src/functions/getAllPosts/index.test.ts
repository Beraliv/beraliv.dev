import { getAllPosts } from ".";

describe(getAllPosts.name, () => {
  test("returns all posts from content directory", () => {
    const slugs = getAllPosts(["slug"]).map(({ slug }) => slug);

    expect(slugs).toEqual<typeof slugs>(["2018-10-04-scrollbar-customisation"]);
  });
});
