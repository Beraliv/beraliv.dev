import React, { FC } from "react";
import styles from "./index.module.css";

interface LabelPropsType {
  title: string;
}

export const Label: FC<LabelPropsType> = ({ title }) => (
  <a className={styles.label} href={`/search?label=${title}`}>
    {title}
  </a>
);
