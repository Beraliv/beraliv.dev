import { useEffect } from "react";
import styles from "./index.module.css";

export const NotFound = () => {
  useEffect(() => {
    plausible("404", { props: { path: document.location.pathname } });
  }, []);

  return <h1 className={styles.notFound}>404 - Page Not Found</h1>;
};
