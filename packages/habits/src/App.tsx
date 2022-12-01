import { Component, lazy } from "solid-js";
import { Route, Routes } from "@solidjs/router";

import styles from "./App.module.css";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <Routes>
          <Route
            path="/create"
            component={lazy(() =>
              import("./components/pages/CreateHabitPage").then((module) => ({
                default: module.CreateHabitPage,
              }))
            )}
          />
          <Route
            path="/"
            component={lazy(() =>
              import("./components/pages/HabitsPage").then((module) => ({
                default: module.HabitsPage,
              }))
            )}
          />
        </Routes>
      </header>
    </div>
  );
};

export { App };
