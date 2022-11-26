import { useNavigate } from "@solidjs/router";
import { batch, Component, createSignal } from "solid-js";
import { addNewHabit } from "../../state/habits";
import { TColor } from "../../types/TColor";
import { cx } from "../../utils/cx";
import { SmileIcon } from "../atoms/SmileIcon";
import { ColorPopup } from "./ColorPopup";
import { IconPopup } from "./IconPopup";

import styles from "./CreateHabitForm.module.css";

const CreateHabitForm: Component = () => {
  const [isValidationVisible, setValidationVisibility] = createSignal(false);
  const [habitTitle, setHabitTitle] = createSignal("");
  const colorSignal = createSignal<TColor>("blue");
  const navigate = useNavigate();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (habitTitle() === "") {
      setValidationVisibility(true);
      return;
    }

    batch(() => {
      const [habitColor, setHabitColor] = colorSignal;
      addNewHabit({
        title: habitTitle(),
        completed: false,
        color: habitColor(),
      });
      setHabitTitle("");
      setHabitColor("blue");
      navigate("/");
    });
  };

  let inputRef: HTMLInputElement;

  // autofocus input by default
  setTimeout(() => inputRef.focus());

  return (
    <form class={styles.form} onSubmit={handleSubmit}>
      <div
        class={cx(styles.error, {
          [styles.visible]: isValidationVisible(),
        })}
      >
        Please enter the habit name
      </div>
      <input
        class={styles.input}
        // https://github.com/solidjs/solid/issues/116
        // @ts-expect-error: Variable 'inputRef' is used before being assigned
        ref={inputRef}
        onInput={(e) => setHabitTitle(e.currentTarget.value)}
        placeholder="Habit name"
        value={habitTitle()}
      />
      <div class={cx(styles.cardProperties, "gray")}>
        <div class={styles.icon}>
          <SmileIcon />
        </div>
        <div class={styles.popups}>
          <IconPopup />
          <ColorPopup colorSignal={colorSignal} />
        </div>
      </div>
      <button class={cx(styles.save, "green")}>Save</button>
    </form>
  );
};

export { CreateHabitForm };
