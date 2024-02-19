import { Fragment } from "react";
import { labelToIconMapping } from "../labelToIconMapping";
import styles from "./index.module.css";
import { ValidatedPostType } from "../../../types/ValidatedPostType";

export const PostPreview = (post: ValidatedPostType) => (
  <a href={post.slug} className={styles.card}>
    <pre className={styles.labels}>
      {post.labels.map((label) => (
        <Fragment key={label}>{labelToIconMapping[label]}</Fragment>
      ))}
    </pre>
    <h2>{post.title}</h2>
    <p>{post.description}</p>
  </a>
);
