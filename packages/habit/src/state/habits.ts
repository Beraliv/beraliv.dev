import { createApi, createStore } from "effector";
import { IHabit } from "../interfaces/IHabit";

const $habits = createStore<IHabit[]>([
  { title: "German", completed: false },
  { title: "Meditation", completed: false },
]);

interface HabitCompleted extends Pick<IHabit, "completed"> {
  index: number;
}

const { addNewHabit, setHabitCompleted } = createApi($habits, {
  addNewHabit: (habits, newHabit: IHabit) => [...habits, newHabit],
  setHabitCompleted: (habits, { index, completed }: HabitCompleted) => {
    habits[index].completed = completed;
  },
});

export { $habits, addNewHabit, setHabitCompleted };
