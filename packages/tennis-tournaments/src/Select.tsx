import { Accessor, Component, For, createSignal } from "solid-js";

interface SelectProps {
  id: string;
  values: Accessor<string[]>;
  onChange: (value: string) => void;
  current: () => string | undefined;
}

const Select: Component<SelectProps> = ({ id, values, onChange, current }) => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <div>
      <label for={id}>Choose a {id}:</label>

      <select
        name={id}
        id={id}
        onChange={(event) => handleChange(event.target.value)}
        value={current()}
      >
        <For each={values()}>
          {(value) => <option value={value}>{value}</option>}
        </For>
      </select>
    </div>
  );
};

export { Select };
