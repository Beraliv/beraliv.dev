import { imageLoader } from ".";

describe(imageLoader.name, () => {
  test("does not scale image by default", () => {
    const actual = imageLoader({ src: "/testing/image.png" });
    const expected = `https://res.cloudinary.com/beraliv/image/upload/v1626469589/blog_beraliv_dev/testing/image.png`;

    expect(actual).toEqual(expected);
  });

  test("use quality of 75 by default", () => {
    const actual = imageLoader({ src: "/testing/image.png", width: 125 });
    const expected = `https://res.cloudinary.com/beraliv/image/upload/f_auto,w_125,q_75/v1626469589/blog_beraliv_dev/testing/image.png`;

    expect(actual).toEqual(expected);
  });

  test("returns string with all params", () => {
    const actual = imageLoader({
      src: "/testing/image.png",
      width: 125,
      quality: 125,
    });
    const expected = `https://res.cloudinary.com/beraliv/image/upload/f_auto,w_125,q_125/v1626469589/blog_beraliv_dev/testing/image.png`;

    expect(actual).toEqual(expected);
  });
});
