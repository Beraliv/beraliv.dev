import { useNavigate } from "@solidjs/router";
import { batch, Component, createSignal } from "solid-js";
import { addNewHabit } from "../../state/habits";
import { TColor } from "../../types/TColor";
import { cx } from "../../utils/cx";
import { ColorPopup } from "./ColorPopup";
import { IconPopup } from "./IconPopup";

import styles from "./CreateHabitForm.module.css";
import { TIconType } from "../../types/TIconType";

const CreateHabitForm: Component = () => {
  const [isValidationVisible, setValidationVisibility] = createSignal(false);
  const [habitTitle, setHabitTitle] = createSignal("");
  const colorSignal = createSignal<TColor>("blue");
  const iconSignal = createSignal<TIconType>("faceSmile");
  const navigate = useNavigate();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (habitTitle() === "") {
      setValidationVisibility(true);
      return;
    }

    batch(() => {
      const [habitColor, setHabitColor] = colorSignal;
      const [habitIcon, setHabitIcon] = iconSignal;
      addNewHabit({
        title: habitTitle(),
        completed: false,
        color: habitColor(),
        icon: habitIcon(),
      });
      setHabitTitle("");
      setHabitColor("blue");
      setHabitIcon("faceSmile");
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
        <div class={styles.popups}>
          <IconPopup iconSignal={iconSignal} />
          <ColorPopup colorSignal={colorSignal} />
        </div>
      </div>
      <button class={cx(styles.save, "green")}>Save</button>
    </form>
  );
};

export { CreateHabitForm };
