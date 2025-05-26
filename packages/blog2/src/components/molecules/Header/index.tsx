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

// TODO: add tree config when winter snowdrift is ready
// const TREE_CONFIG: Record<SeasonType, TreeConfig> = {
//   winter: {
//     type: "withoutLeaves",
//     trunkColour: "rgb(127.89875575019342,95.94236232500401,100.38445799598361)",
//   },
//   spring: {
//     type: "withoutLeaves",
//     trunkColour: "rgb(127.89875575019342,95.94236232500401,100.38445799598361)",
//   },
//   summer: {
//     type: "withLeaves",
//     trunkColour: "rgb(202.68918181332694,125.5904954265633,114.37598394875991)",
//     leavesColour: "rgb(145.76120054187436,224.7466619189076,37.85990186125929)",
//   },
//   autumn: {
//     type: "withLeaves",
//     trunkColour: "rgb(127.89875575019342,95.94236232500401,100.38445799598361)",
//     leavesColour: "rgb(236.72626249459896,71.37718339320607,26.07847755475651)",
//   },
// };

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
      <NextLink href="/" className={styles.toHome}>
        {title}
      </NextLink>

      {season === "winter" && <Snow number={50} />}

      <DarkModeToggle />
    </header>
  );
};
