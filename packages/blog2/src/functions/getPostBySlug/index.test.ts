import { getPostBySlug } from ".";

describe(getPostBySlug.name, () => {
  test("returns real data from 2018-10-04-scrollbar-customisation", () => {
    const { content, data, name } = getPostBySlug(
      "2018-10-04-scrollbar-customisation"
    );

    expect(typeof content).toBe("string");

    expect(data.title).toBe("Scrollbar customisation in JavaScript and CSS");
    expect(data.date).toBe("2018-10-04");
    expect(data.description).toBe(
      "What is the current state of scrollbar customisation? Let's have a look at the browser capabilities, CSS hacks and JS libraries."
    );
    expect(data.labels).toEqual(["css", "javascript"]);
    expect(data.keywords).toEqual([
      "scrollbar",
      "customisation",
      "javascript",
      "css",
    ]);
    expect(data.categories).toEqual(null);
    expect(data.featured).toEqual(
      "/scrollbar-customisation/macos-scrollbar.png"
    );

    expect(name).toBe("2018-10-04-scrollbar-customisation");
  });
});
