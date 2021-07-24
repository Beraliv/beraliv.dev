import { FC } from "react";
import { PostType } from "../../../types/PostType";
import styles from "./index.module.css";

type PostPreviewPropsType = Pick<PostType, "slug" | "title" | "description">;

export const PostPreview: FC<PostPreviewPropsType> = ({
  description,
  slug,
  title,
}) => (
  <a href={slug} key={slug} className={styles.card}>
    <h2>{title}</h2>
    <p>{description}</p>
  </a>
);
