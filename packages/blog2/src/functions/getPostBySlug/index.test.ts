import { getPostBySlug } from ".";

describe(getPostBySlug.name, () => {
  test("returns not featured post data", () => {
    const { content, data, name } = getPostBySlug(
      "2018-10-04-scrollbar-customisation"
    );

    expect(typeof content).toBe("string");

    expect(data.title).toBe("Scrollbar customisation");
    expect(data.date).toBe("2018-10-04");
    expect(data.description).toBe(
      "CSS support in different browser engines, hacks and tricks, JS libraries"
    );
    expect(data.labels).toEqual(["css", "javascript"]);
    expect(data.keywords).toEqual([
      "scrollbar",
      "customisation",
      "javascript",
      "css",
    ]);
    expect(data.image).toEqual("/scrollbar-customisation/macos-scrollbar.png");
    expect(data.featured).toEqual(undefined);

    expect(name).toBe("2018-10-04-scrollbar-customisation");
  });

  test("returns featured post data", () => {
    const { content, data, name } = getPostBySlug("2021-04-04-type-challenges");

    expect(typeof content).toBe("string");

    expect(data.title).toBe("Type Challenges");
    expect(data.date).toBe("2021-04-04");
    expect(data.description).toBe(
      "Easy, medium, hard and extreme step by step solutions to type challenges in TypeScript"
    );
    expect(data.labels).toEqual(["typescript"]);
    expect(data.keywords).toEqual(["typescript", "challenges"]);
    expect(data.image).toEqual("/type-challenges/featured.png");
    expect(data.featured).toEqual(true);

    expect(name).toBe("2021-04-04-type-challenges");
  });
});
