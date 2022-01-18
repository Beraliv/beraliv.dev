import { Fragment } from "react";
import { PostType } from "../../../types/PostType";
import { SanitisedString } from "../../../types/SanitisedString";
import { labelToIconMapping } from "../labelToIconMapping";
import styles from "./index.module.css";

type PostPreviewPropsType = Pick<
  PostType,
  "slug" | "description" | "labels"
> & {
  title: SanitisedString;
};

export const PostPreview = ({
  description,
  labels,
  slug,
  title,
}: PostPreviewPropsType) => (
  <a href={slug} key={slug} className={styles.card}>
    <pre>
      {labels.map((label) => (
        <Fragment key={label}>{labelToIconMapping[label]}</Fragment>
      ))}
    </pre>
    <h2>{title}</h2>
    <p>{description}</p>
  </a>
);
