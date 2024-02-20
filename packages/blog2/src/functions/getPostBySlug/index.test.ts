import { expect } from "earljs";
import { getPostBySlug } from ".";
import { UnsanitisedString } from "../../types/UnsanitisedString";

describe(getPostBySlug.name, () => {
  it("returns not featured post data", () => {
    const { content, data, name } = getPostBySlug(
      "2018-10-04-scrollbar-customisation"
    );

    expect(typeof content).toEqual("string");

    expect(data.title).toEqual(
      "Scrollbar cus&shy;tomi&shy;sa&shy;tion in CSS and JS" as UnsanitisedString
    );
    expect(data.date).toEqual("2018-10-04");
    expect(data.description).toEqual(
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

    expect(name).toEqual("2018-10-04-scrollbar-customisation");
  });

  it("returns featured post data", () => {
    const { content, data, name } = getPostBySlug("2021-04-04-type-challenges");

    expect(typeof content).toEqual("string");

    expect(data.title).toEqual(
      "List of Type Challenges problems and solutions" as UnsanitisedString
    );
    expect(data.date).toEqual("2021-04-04");
    expect(data.description).toEqual(
      "Easy, medium, hard and extreme step by step solutions to type challenges in TypeScript"
    );
    expect(data.labels).toEqual(["typescript"]);
    expect(data.keywords).toEqual(["typescript", "challenges"]);
    expect(data.image).toEqual("/type-challenges/featured.png");
    expect(data.featured).toEqual(true);

    expect(name).toEqual("2021-04-04-type-challenges");
  });
});
