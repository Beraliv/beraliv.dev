import { Fragment } from "react";
import { labelToIconMapping } from "../labelToIconMapping";
import styles from "./index.module.css";
import { ValidatedPostType } from "../../../types/ValidatedPostType";

export const PostPreview = (post: ValidatedPostType) => (
  <tr className={styles.row}>
    <td className={styles.date}>{post.date}</td>
    <td className={styles.labels}>
      {[post.labels[0]].map((label) => (
        <Fragment key={label}>{labelToIconMapping[label]}</Fragment>
      ))}
    </td>
    <td className={styles.title}>
      <a href={post.slug}>
        <span>{post.title}</span>
      </a>
    </td>
  </tr>
);
