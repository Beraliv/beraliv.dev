import { useNavigate } from "@solidjs/router";
import { batch, Component, createSignal, Show } from "solid-js";
import { addNewHabit } from "../../../state/habits";
import { Popup } from "../../atoms/Popup";

import styles from "./index.module.css";

const CreateHabitForm: Component = () => {
  const [habitTitle, setHabitTitle] = createSignal("");
  const navigate = useNavigate();

  const [isPopupVisible, setPopupVisibility] = createSignal(false);
  const closePopup = () => setPopupVisibility(false);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    batch(() => {
      addNewHabit({
        title: habitTitle(),
        completed: false,
      });
      setHabitTitle("");
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
      <button onClick={() => setPopupVisibility(true)}>Show Popup</button>
      <Show when={isPopupVisible()}>
        <Popup handleCancel={closePopup} handleSave={closePopup}>
          <p>Haha I'm a POP UP</p>
        </Popup>
      </Show>
      <button>Save</button>
    </form>
  );
};

export { CreateHabitForm };
