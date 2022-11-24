import { batch, Component, createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";

import styles from "./App.module.css";

interface Habit {
  title: string;
  completed: boolean;
}

const App: Component = () => {
  const [habitTitle, setHabitTitle] = createSignal("");
  const [habits, setHabits] = createStore<Habit[]>([]);

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
            <div class={styles.habit}>
              <input
                type="checkbox"
                checked={habit.completed}
                onChange={(e) =>
                  setHabits(index(), "completed", e.currentTarget.checked)
                }
              />
              <div>{habit.title}</div>
            </div>
          )}
        </For>
      </header>
    </div>
  );
};

export default App;
