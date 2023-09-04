import { Accessor, For } from "solid-js";

import styles from "./Select.module.css";

import { getObjectEntries } from "./Utils/getObjectEntries";

type AnyEntries = Record<string, any>;

type ExtractValue<Entries extends AnyEntries | string[]> =
  Entries extends readonly any[]
    ? Entries[number]
    : Entries extends AnyEntries
    ? keyof Entries
    : never;

interface SelectProps<
  Entries extends AnyEntries | string[],
  Value extends string
> {
  id: string;
  label: string;
  values: Accessor<Entries>;
  onChange: (value: Value) => void;
  current: () => ExtractValue<Entries> | undefined;
}

const Select = <Entries extends AnyEntries, Value extends string>({
  id,
  label,
  values,
  onChange,
  current,
}: SelectProps<Entries, Value>) => {
  const handleChange = (value: Value) => {
    onChange(value);
  };

  const data = values();
  const options = Array.isArray(data)
    ? data.map((value) => [value, value])
    : getObjectEntries(data);

  return (
    <div class={styles.Select}>
      <label for={id}>{label}</label>

      <select
        id={id}
        name={label}
        onChange={(event) => handleChange(event.target.value as Value)}
        value={current()}
      >
        <For each={options}>
          {([key, value]) => (
            <option id={key as string} value={key as string}>
              {value}
            </option>
          )}
        </For>
      </select>
    </div>
  );
};

export { Select };
