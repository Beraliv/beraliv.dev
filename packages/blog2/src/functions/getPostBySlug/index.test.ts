import { getPostBySlug } from ".";

describe(getPostBySlug.name, () => {
  test("returns real data from 2018-10-04-scrollbar-customisation", () => {
    const {
      title,
      date,
      slug,
      description,
      labels,
      keywords,
      categories,
      featured,
    } = getPostBySlug("2018-10-04-scrollbar-customisation", [
      "title",
      "date",
      "slug",
      "description",
      "labels",
      "keywords",
      "categories",
      "featured",
    ]);

    expect(title).toBe<typeof title>(
      "Scrollbar customisation in JavaScript and CSS"
    );
    expect(date).toBe<typeof date>("2018-10-04");
    expect(slug).toBe<typeof slug>("2018-10-04-scrollbar-customisation");
    expect(description).toBe<typeof description>(
      "What is the current state of scrollbar customisation? Let's have a look at the browser capabilities, CSS hacks and JS libraries."
    );
    expect(labels).toEqual<typeof labels>(["css", "javascript"]);
    expect(keywords).toEqual<typeof keywords>([
      "scrollbar",
      "customisation",
      "javascript",
      "css",
    ]);
    expect(categories).toEqual<typeof keywords>(undefined);
    expect(featured).toEqual<typeof featured>("/macos-scrollbar.png");
  });
});
