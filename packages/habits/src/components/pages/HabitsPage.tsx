import { Component, For } from "solid-js";
import { useUnit } from "effector-solid";
import { HabitCard } from "../molecules/HabitCard";
import { $habits, setHabitCompleted } from "../../state/habits";
import { Header } from "../molecules/Header";

const HabitsPage: Component = () => {
  const habits = useUnit($habits);

  return (
    <div>
      <Header />
      <For each={habits()}>
        {(habit, index) => (
          <HabitCard
            habit={habit}
            handleComplete={(completed) =>
              setHabitCompleted({ index: index(), completed })
            }
          />
        )}
      </For>
    </div>
  );
};

export { HabitsPage };
