import NextLink from "next/link";
import { classNames } from "../../../functions/classNames";
import { isWinter } from "../../../functions/isWinter";
import { DarkModeToggle } from "../../atoms/DarkModeToggle";
import { Snow } from "../../atoms/Snow";
import styles from "./index.module.css";

interface HeaderPropsType {
  title: string;
  path: "home" | "post" | "search" | "404";
}

export const Header = ({ title, path }: HeaderPropsType) => {
  return (
    <header
      className={classNames(styles.header, {
        [styles.homeHeader]: path === "home",
        [styles.searchHeader]: path === "search",
        [styles.notFoundHeader]: path === "404",
      })}
    >
      <NextLink href="/">
        <a className={styles.toHome}>{title}</a>
      </NextLink>

      {isWinter(new Date()) && <Snow number={50} />}

      <DarkModeToggle />
    </header>
  );
};
