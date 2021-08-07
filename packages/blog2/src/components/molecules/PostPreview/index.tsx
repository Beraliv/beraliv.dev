import { Fragment, FC } from "react";
import { PostType } from "../../../types/PostType";
import { SanitisedString } from "../../../types/SanitisedString";
import { labelToIconMapping } from "../../atoms/labelToIconMapping";
import styles from "./index.module.css";

type PostPreviewPropsType = Pick<
  PostType,
  "slug" | "description" | "labels"
> & {
  title: SanitisedString;
};

export const PostPreview: FC<PostPreviewPropsType> = ({
  description,
  labels,
  slug,
  title,
}) => (
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
