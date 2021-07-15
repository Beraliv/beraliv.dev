import React, { FC } from "react";
import { DarkModeToggle } from "../../atoms/DarkModeToggle";
import styles from "./index.module.css";

declare const __PATH_PREFIX__: string;

interface HeaderPropsType {
  title: string;
  path?: "home" | "post";
}

export const Header: FC<HeaderPropsType> = ({ title, path }) => {
  console.log(`>>> header path`, __PATH_PREFIX__);

  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  if (isRootPath) {
    header = (
      <h1 className={styles.atHome}>
        <a href="/" target="_blank" rel="nofollow noopener noreferrer">
          {title}
        </a>
      </h1>
    );
  } else {
    header = (
      <a
        className={styles.toHome}
        href="/"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {title}
      </a>
    );
  }

  return (
    <header className={styles.header}>
      {header}
      <DarkModeToggle />
    </header>
  );
};
