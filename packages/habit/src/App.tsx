import { Component } from "solid-js";
import { Route, Routes } from "@solidjs/router";

import styles from "./App.module.css";
import { HabitsPage } from "./components/pages/HabitsPage";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <Routes>
          <Route path="/" component={HabitsPage} />
        </Routes>
      </header>
    </div>
  );
};

export { App };
