import NextLink from "next/link";
import React, { FC } from "react";
import { classNames } from "../../../functions/classNames";
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
    header = <h1 className={styles.atHome}>{title}</h1>;
  } else if (path === "post") {
    header = (
      <NextLink href="/">
        <a className={styles.toHome}>{title}</a>
      </NextLink>
    );
  } else {
    validateNever(path);
  }

  return (
    <header
      className={classNames(styles.header, {
        [styles.homeHeader]: path === "home",
      })}
    >
      {header}
      <DarkModeToggle />
    </header>
  );
};
