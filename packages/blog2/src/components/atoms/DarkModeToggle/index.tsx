import React from "react";
import { useDarkMode } from "../../../hooks/useDarkMode";
import styles from "./index.module.css";

export const DarkModeToggle = () => {
  const { darkMode, toggle } = useDarkMode();

  return (
    <input
      className={styles.toggle}
      type="button"
      value={darkMode ? "☀" : "☾"}
      onClick={toggle}
    />
  );
};
