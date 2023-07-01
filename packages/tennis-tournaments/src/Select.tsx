import { Accessor, Component, For, createSignal } from "solid-js";

interface SelectProps {
  id: string;
  values: Accessor<string[]>;
  onChange: (value: string) => void;
}

const Select: Component<SelectProps> = ({ id, values, onChange }) => {
  const [value, setValue] = createSignal<string | undefined>(values()[0]);

  const handleChange = (value: string) => {
    setValue(value);
    onChange(value);
  };

  return (
    <div>
      <label for={id}>Choose a season:</label>

      <select
        name={id}
        id={id}
        onChange={(event) => handleChange(event.target.value)}
        value={value()}
      >
        <For each={values()}>
          {(value) => <option value={value}>{value}</option>}
        </For>
      </select>
    </div>
  );
};

export { Select };
