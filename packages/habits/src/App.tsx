import { Component, lazy, onMount } from "solid-js";
import { Route, Routes } from "@solidjs/router";

import styles from "./App.module.css";
import { signIn } from "./state/google-sso";

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

const SignInPage = lazy(() =>
  import("./components/pages/SignInPage").then((module) => ({
    default: module.SignInPage,
  }))
);

const App: Component = () => {
  onMount(() => {
    signIn();
  });

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <Routes>
          <Route path="/create" component={CreateHabitPage} />
          <Route path="/sign_in" component={SignInPage} />
          <Route path="/" component={HabitsPage} />
        </Routes>
      </header>
    </div>
  );
};

export { App };
