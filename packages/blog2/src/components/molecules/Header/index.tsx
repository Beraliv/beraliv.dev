import React, { FC } from "react";
import { validateNever } from "../../../validators/validateNever";
import { DarkModeToggle } from "../../atoms/DarkModeToggle";
import styles from "./index.module.css";

interface HeaderPropsType {
  title: string;
  path: "home" | "post";
}

export const Header: FC<HeaderPropsType> = ({ title, path }) => {
  let header;

  if (path === "home") {
    header = (
      <h1 className={styles.atHome}>
        <a href="/" rel="nofollow noopener noreferrer">
          {title}
        </a>
      </h1>
    );
  } else if (path === "post") {
    header = (
      <a className={styles.toHome} href="/" rel="nofollow noopener noreferrer">
        {title}
      </a>
    );
  } else {
    validateNever(path);
  }

  return (
    <header className={styles.header}>
      {header}
      <DarkModeToggle />
    </header>
  );
};
