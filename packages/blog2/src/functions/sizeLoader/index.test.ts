import { expect } from "earljs";
import { sizeLoader } from ".";

describe(sizeLoader.name, () => {
  it("returns size url for scaled image", () => {
    const actual = sizeLoader({
      src: "https://res.cloudinary.com/beraliv/image/upload/f_auto,w_1024,q_75/v1690271990/blog_beraliv_dev/absolute-in-typescript/step2-return-result-for-string.png",
    });
    const expected = `https://res.cloudinary.com/beraliv/image/upload/f_auto,w_1024,q_75/fl_getinfo/blog_beraliv_dev/absolute-in-typescript/step2-return-result-for-string.png`;

    expect(actual).toEqual(expected);
  });

  it("returns size url for non scaled image", () => {
    const actual = sizeLoader({
      src: "https://res.cloudinary.com/beraliv/image/upload/v1690282001/blog_beraliv_dev/absolute-in-typescript/step2-return-result-for-string.png",
    });
    const expected = `https://res.cloudinary.com/beraliv/image/upload/fl_getinfo/blog_beraliv_dev/absolute-in-typescript/step2-return-result-for-string.png`;

    expect(actual).toEqual(expected);
  });

  it("does NOT replace substring if image name contains v", () => {
    const actual = sizeLoader({
      src: "https://res.cloudinary.com/beraliv/image/upload/v1690282001/blog_beraliv_dev/tennis-tournaments-poc/project-match-card-view-v1.png",
    });
    const expected =
      "https://res.cloudinary.com/beraliv/image/upload/fl_getinfo/blog_beraliv_dev/tennis-tournaments-poc/project-match-card-view-v1.png";

    expect(actual).toEqual(expected);
  });
});
