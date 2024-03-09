import NextLink from "next/link";
import { classNames } from "../../../functions/classNames";
import { DarkModeToggle } from "../../atoms/DarkModeToggle";
import { Snow } from "../../atoms/Snow";
import styles from "./index.module.css";
import { getSeason } from "../../../functions/getSeason";

interface HeaderPropsType {
  title: string;
  path: "home" | "post" | "search" | "404";
}

export const Header = ({ title, path }: HeaderPropsType) => {
  const season = getSeason(new Date());

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

      {season === "winter" && <Snow number={50} />}

      <DarkModeToggle />
    </header>
  );
};
