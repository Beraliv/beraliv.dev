import { Component } from "solid-js";
import { CreateHabitButton } from "../CreateHabitButton";

import styles from "./index.module.css";

const Header: Component = () => {
  return (
    <div class={styles.header}>
      <div class={styles.today}>
        <h3>TODAY</h3>
        <div class={styles.shortDate}>{new Date().toDateString()}</div>
      </div>
      <div class={styles.create}>
        <CreateHabitButton />
      </div>
    </div>
  );
};

export { Header };
