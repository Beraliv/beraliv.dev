import NextImage from "next/image";
import { FC } from "react";
import { imageLoader } from "../../../functions/imageLoader";
import styles from "./index.module.css";

interface MxdImagePropsType {
  alt: string;
  src: string;
  width: number;
  height: number;
}

export const MdxImage: FC<MxdImagePropsType> = (props) => (
  <figure className={styles.figure}>
    <NextImage {...props} loader={imageLoader} />
    <figcaption>{props.alt}</figcaption>
  </figure>
);
