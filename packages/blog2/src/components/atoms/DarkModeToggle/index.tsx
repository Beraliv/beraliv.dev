import React from "react";
import { useDarkMode } from "../../../hooks/useDarkMode";
import styles from "./index.module.css";
import { classNames } from "../../../functions/classNames";

export const DarkModeToggle = () => {
  const { darkMode, initialising, toggle } = useDarkMode();

  return (
    <div
      className={classNames(styles.toggle, {
        [styles.moon]: darkMode && !initialising,
        [styles.sun]: !darkMode && !initialising,
      })}
      onClick={toggle}
    ></div>
  );
};
