import NextImage from "next/image";
import { FC } from "react";

interface MxdImagePropsType {
  alt: string;
  src: string;
  width: number;
  height: number;
}

export const MdxImage: FC<MxdImagePropsType> = (props) => (
  <NextImage {...props}></NextImage>
);
