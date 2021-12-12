import { useScrollProgress } from "../../../hooks/useScrollProgress";
import styles from "./index.module.css";

export const ArticleMainProgress = () => {
  const { progress } = useScrollProgress();

  return (
    <div
      className={styles.progress}
      style={{
        "--scroll": `${progress}%`,
      }}
    />
  );
};
