import { expect } from "earl";
import { imageLoader } from ".";

describe(imageLoader.name, () => {
  it("does not scale image by default", () => {
    const actual = imageLoader({ src: "/testing/image.png" });
    const expected = `https://res.cloudinary.com/beraliv/image/upload/v1633444777/blog_beraliv_dev/testing/image.png`;

    expect(actual).toEqual(expected);
  });

  it("use quality of 75 by default", () => {
    const actual = imageLoader({ src: "/testing/image.png", width: 125 });
    const expected = `https://res.cloudinary.com/beraliv/image/upload/f_auto,w_125,q_75/v1633444777/blog_beraliv_dev/testing/image.png`;

    expect(actual).toEqual(expected);
  });

  it("returns string with all params", () => {
    const actual = imageLoader({
      src: "/testing/image.png",
      width: 125,
      quality: 125,
    });
    const expected = `https://res.cloudinary.com/beraliv/image/upload/f_auto,w_125,q_125/v1633444777/blog_beraliv_dev/testing/image.png`;

    expect(actual).toEqual(expected);
  });
});
