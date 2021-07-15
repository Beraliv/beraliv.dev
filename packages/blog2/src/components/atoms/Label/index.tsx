import Link from "next/link";
import React, { FC } from "react";
import styles from "./index.module.css";

interface LabelPropsType {
  title: string;
}

export const Label: FC<LabelPropsType> = ({ title }) => (
  // TODO: use styles.dark for dark mode
  <div className={styles.label}>
    <Link href={`/tag/${title}`}>{title}</Link>
  </div>
);
