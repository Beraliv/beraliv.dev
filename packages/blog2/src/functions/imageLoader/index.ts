import { ImageLoaderProps } from "next/image";

/**
 * @see {ImageLoaderProps}
 */
interface ExtendedImageLoaderProps {
  src: string;
  width?: number;
  quality?: number;
  // Cloudinary CDN uses timestamp in seconds to represent versions
  version?: number;
}

export const imageLoader = ({
  src,
  width,
  quality = 75,
  version = Math.floor(Date.now() / 1000),
}: ExtendedImageLoaderProps) => {
  if (typeof width === "number") {
    return `https://res.cloudinary.com/beraliv/image/upload/f_auto,w_${width},q_${quality}/v${version}/blog_beraliv_dev${src}`;
  }

  return `https://res.cloudinary.com/beraliv/image/upload/v${version}/blog_beraliv_dev${src}`;
};
