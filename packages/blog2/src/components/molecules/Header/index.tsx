import NextLink from "next/link";
import { DarkModeToggle } from "../../atoms/DarkModeToggle";
import { Snow } from "../../atoms/Snow";
import styles from "./index.module.css";
import { getSeason } from "../../../functions/getSeason";
import { Link } from "../../atoms/Link";

interface HeaderPropsType {
  title: string;
}
export const Header = ({ title }: HeaderPropsType) => {
  const season = getSeason(new Date());

  return (
    <header className={styles.header}>
      <div className={styles.home}>
        <NextLink href="/">{title}</NextLink>
      </div>

      {season === "winter" && <Snow number={50} />}

      <nav>
        <ul className={styles.nav}>
          <li>
            <Link href="https://beraliv.com/" text="Learn more about me" />
          </li>
        </ul>
      </nav>

      <DarkModeToggle />
    </header>
  );
};
