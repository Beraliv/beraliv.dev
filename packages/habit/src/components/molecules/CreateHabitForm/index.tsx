import { useNavigate } from "@solidjs/router";
import { batch, Component, createSignal } from "solid-js";
import { addNewHabit } from "../../../state/habits";
import { TColor } from "../../../types/TColor";
import { ColorPopup } from "../ColorPopup";
import { IconPopup } from "../IconPopup";

import styles from "./index.module.css";

const CreateHabitForm: Component = () => {
  const [habitTitle, setHabitTitle] = createSignal("");
  const [habitColor, setHabitColor] = createSignal<TColor>("blue");
  const navigate = useNavigate();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    batch(() => {
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
      <input
        // https://github.com/solidjs/solid/issues/116
        // @ts-expect-error: Variable 'inputRef' is used before being assigned
        ref={inputRef}
        onInput={(e) => setHabitTitle(e.currentTarget.value)}
        placeholder="Habit name"
        required
        value={habitTitle()}
      />
      <IconPopup />
      <ColorPopup handleColorUpdate={setHabitColor} />
      <button>Save</button>
    </form>
  );
};

export { CreateHabitForm };
