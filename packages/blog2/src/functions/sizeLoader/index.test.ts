import { sizeLoader } from ".";

describe(sizeLoader.name, () => {
  test("returns size url for scaled image", () => {
    const actual = sizeLoader({
      src: "https://res.cloudinary.com/beraliv/image/upload/f_auto,w_1024,q_75/v1633444777/blog_beraliv_dev/absolute-in-typescript/step2-return-result-for-string.png",
    });
    const expected = `https://res.cloudinary.com/beraliv/image/upload/f_auto,w_1024,q_75/fl_getinfo/blog_beraliv_dev/absolute-in-typescript/step2-return-result-for-string.png`;

    expect(actual).toEqual(expected);
  });

  test("returns size url for non scaled image", () => {
    const actual = sizeLoader({
      src: "https://res.cloudinary.com/beraliv/image/upload/v1633444777/blog_beraliv_dev/absolute-in-typescript/step2-return-result-for-string.png",
    });
    const expected = `https://res.cloudinary.com/beraliv/image/upload/fl_getinfo/blog_beraliv_dev/absolute-in-typescript/step2-return-result-for-string.png`;

    expect(actual).toEqual(expected);
  });
});
