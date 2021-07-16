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
  if (typeof width === "number") {
    return `https://res.cloudinary.com/beraliv/image/upload/f_auto,w_${width},q_${quality}/v1626453732/blog_beraliv_dev${src}`;
  }

  return `https://res.cloudinary.com/beraliv/image/upload/v1626453732/blog_beraliv_dev${src}`;
};
