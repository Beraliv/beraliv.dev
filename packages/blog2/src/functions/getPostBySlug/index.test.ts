import { expect } from "earl";
import { getPostBySlug } from ".";
import { UnsanitisedString } from "../../types/UnsanitisedString";

describe(getPostBySlug.name, () => {
  it("returns not featured post data", () => {
    const { content, data, name } = getPostBySlug(
      "2019-12-17-amazon-prime-video-player-investigation"
    );

    expect(typeof content).toEqual("string");

    expect(data.title).toEqual(
      "State machine and bundles in Amazon video player (2019 edition)" as UnsanitisedString
    );
    expect(data.created).toEqual("2019-12-17");
    expect(data.updated).toEqual("2019-12-17");
    expect(data.description).toEqual(
      "From video tag to the implementation, state machine, the way bundle is loaded, bundle names"
    );
    expect(data.labels).toEqual(["player"]);
    expect(data.keywords).toEqual(["Amazon Prime", "video player"]);
    expect(data.image).toEqual(
      "/amazon-prime-video-player-investigation/amazon-prime-page.png"
    );
    expect(data.featured).toEqual(undefined);

    expect(name).toEqual("2019-12-17-amazon-prime-video-player-investigation");
  });

  it("returns featured post data", () => {
    const { content, data, name } = getPostBySlug(
      "2018-10-04-scrollbar-customisation"
    );

    expect(typeof content).toEqual("string");

    expect(data.title).toEqual(
      "Scrollbar customisation in CSS and JS" as UnsanitisedString
    );
    expect(data.created).toEqual("2018-10-04");
    expect(data.updated).toEqual("2018-10-04");
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
    expect(data.featured).toEqual(true);

    expect(name).toEqual("2018-10-04-scrollbar-customisation");
  });
});
