import NextImage from "next/legacy/image";
import { imageLoader } from "../../../functions/imageLoader";
import styles from "./index.module.css";

interface MxdImagePropsType {
  alt: string;
  src: string;
  width: number;
  height: number;
}

export const MdxImage = (props: MxdImagePropsType) => (
  <figure className={styles.figure}>
    <NextImage {...props} className={styles.img} loader={imageLoader} />
    <figcaption className={styles.figcaption}>{props.alt}</figcaption>
  </figure>
);
