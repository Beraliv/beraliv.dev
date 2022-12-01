import { Component } from "solid-js";
import { ICON_MAPPING } from "../../const/ICON_MAPPING";
import { IHabit } from "../../interfaces/IHabit";
import { cx } from "../../utils/cx";

import styles from "./HabitCard.module.css";

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
        {ICON_MAPPING[habit.icon]({ width: 16, height: 16 })}
      </div>
      <div class={styles.title}>{habit.title}</div>
    </div>
  </div>
);

export { HabitCard };
