import { Component, lazy, onMount } from "solid-js";
import { Route, Routes } from "@solidjs/router";

import styles from "./App.module.css";
import { $googleSso, signIn } from "./state/google-sso";
import { useUnit } from "effector-solid";
import { UserProfileHeader } from "./components/molecules/UserProfileHeader";

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
  onMount(() => {
    signIn();
  });

  return (
    <div class={styles.App}>
      <UserProfileHeader />
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
