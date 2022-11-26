import { createApi, createStore } from "effector";
import { IHabit } from "../interfaces/IHabit";

const $habits = createStore<IHabit[]>([
  { title: "German", completed: false, color: "orange" },
  { title: "Meditation", completed: false, color: "green" },
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
