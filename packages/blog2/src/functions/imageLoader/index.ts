import is from "@sindresorhus/is";

import { ImageLoaderProps } from "next/image";

/**
 * @see {ImageLoaderProps}
 */
interface ExtendedImageLoaderProps {
  src: string;
  width?: number;
  quality?: number;
}

export const imageLoader = ({
  src,
  width,
  quality = 75,
}: ExtendedImageLoaderProps) => {
  if (is.number(width)) {
    return `https://res.cloudinary.com/beraliv/image/upload/f_auto,w_${width},q_${quality}/v1633444777/blog_beraliv_dev${src}`;
  }

  return `https://res.cloudinary.com/beraliv/image/upload/v1633444777/blog_beraliv_dev${src}`;
};
