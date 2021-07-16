import { ImageLoaderProps } from "next/image";

export const imageLoader = ({ src, width, quality = 75 }: ImageLoaderProps) =>
  `https://res.cloudinary.com/beraliv/image/upload/f_auto,w_${width},q_${quality}/v1626453732/blog_beraliv_dev${src}`;
