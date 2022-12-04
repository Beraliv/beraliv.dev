import { Component, lazy } from "solid-js";
import { Route, Routes } from "@solidjs/router";

import styles from "./App.module.css";

const CreateHabitPage = lazy(() =>
  import("./components/pages/CreateHabitPage").then((module) => ({
    default: module.CreateHabitPage,
  }))
);

const HabitsPage = lazy(() =>
  import("./components/pages/HabitsPage").then((module) => ({
    default: module.HabitsPage,
  }))
);

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
