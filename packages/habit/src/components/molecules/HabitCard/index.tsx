import { Component } from "solid-js";
import { IHabit } from "../../../interfaces/IHabit";
import { cx } from "../../../utils/cx";
import { SmileIcon } from "../../atoms/SmileIcon";

import styles from "./index.module.css";

interface IHabitCardProps {
  habit: IHabit;
  handleComplete: (checked: boolean) => void;
}

const HabitCard: Component<IHabitCardProps> = ({ habit, handleComplete }) => (
  <div class={styles.outerCard}>
    <input
      checked={habit.completed}
      class={styles.checkbox}
      onChange={(e) => handleComplete(e.currentTarget.checked)}
      type="checkbox"
    />
    <div class={cx(styles.innerCard, habit.color)}>
      <div class={styles.icon}>
        <SmileIcon />
      </div>
      <div class={styles.title}>{habit.title}</div>
    </div>
  </div>
);

export { HabitCard };
