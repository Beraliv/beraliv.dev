import NextImage from "next/image";
import { FC } from "react";
import { imageLoader } from "../../../functions/imageLoader";

interface MxdImagePropsType {
  alt: string;
  src: string;
  width: number;
  height: number;
}

export const MdxImage: FC<MxdImagePropsType> = (props) => (
  <figure>
    <NextImage {...props} loader={imageLoader} />
    <figcaption>{props.alt}</figcaption>
  </figure>
);
