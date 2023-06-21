import { createApi, createStore } from "effector";
import { IHabit } from "../interfaces/IHabit";

const $habits = createStore<IHabit[]>([
  { title: "German", completed: false, color: "orange", icon: "language" },
  { title: "Meditation", completed: false, color: "green", icon: "heartPulse" },
  {
    title: "Surprise to Kseniia",
    completed: false,
    color: "red",
    icon: "faceSmile",
  },
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
