import { Component } from "solid-js";
import { Route, Routes } from "@solidjs/router";

import styles from "./App.module.css";
import { HabitsPage } from "./components/pages/HabitsPage";
import { CreateHabitPage } from "./components/pages/CreateHabitPage";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <Routes>
          <Route path="/create" component={CreateHabitPage} />
          <Route path="/" component={HabitsPage} />
        </Routes>
      </header>
    </div>
  );
};

export { App };
