import { batch, Component, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";

import styles from "./App.module.css";
import { HabitCard } from "./components/atoms/HabitCard";
import { IHabit } from "./interfaces/IHabit";

const App: Component = () => {
  const [habitTitle, setHabitTitle] = createSignal("");
  const [habits, setHabits] = createStore<IHabit[]>([]);

  const addHabit = (e: SubmitEvent) => {
    e.preventDefault();

    batch(() => {
      setHabits(habits.length, {
        title: habitTitle(),
        completed: false,
      });
      setHabitTitle("");
    });
  };

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <form onSubmit={addHabit}>
          <input
            placeholder="Add a habit"
            required
            value={habitTitle()}
            onInput={(e) => setHabitTitle(e.currentTarget.value)}
          />
          <button>+</button>
        </form>
        <For each={habits}>
          {(habit, index) => (
            <HabitCard
              habit={habit}
              handleComplete={(checked) =>
                setHabits(index(), "completed", checked)
              }
            />
          )}
        </For>
      </header>
    </div>
  );
};

export default App;
