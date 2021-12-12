import { RefObject } from "react";
import { useScrollProgress } from "../../../hooks/useScrollProgress";
import styles from "./index.module.css";

interface ArticleMainProgressPropsType {
  articleMainRef: RefObject<HTMLElement>;
}

export const ArticleMainProgress = ({
  articleMainRef,
}: ArticleMainProgressPropsType) => {
  const { progress } = useScrollProgress({
    scrollableRef: articleMainRef,
  });

  return (
    <div
      className={styles.progress}
      style={{
        "--scroll": `${progress}%`,
      }}
    />
  );
};
