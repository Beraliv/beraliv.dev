import { useNavigate } from "@solidjs/router";
import { batch, Component, createSignal } from "solid-js";
import { addNewHabit } from "../../state/habits";

const CreateHabitPage: Component = () => {
  const [habitTitle, setHabitTitle] = createSignal("");
  const navigate = useNavigate();

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
    <form onSubmit={handleSubmit}>
      <input
        // @ts-expect-error: Variable 'inputRef' is used before being assigned
        ref={inputRef}
        onInput={(e) => setHabitTitle(e.currentTarget.value)}
        placeholder="Add a habit"
        required
        value={habitTitle()}
      />
      <button>+</button>
    </form>
  );
};

export { CreateHabitPage };
