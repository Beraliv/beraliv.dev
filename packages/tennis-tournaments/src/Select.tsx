import { Accessor, For } from "solid-js";

import styles from "./Select.module.css";

import ArrowDownIcon from "./Icons/ArrowDown.svg";
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
    <div class={styles.Wrapper}>
      <label class={styles.Label} for={id}>
        {label}
      </label>

      <div class={styles.SelectWrapper}>
        <select
          class={styles.Select}
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

        <span class={styles.Icon}>
          <ArrowDownIcon />
        </span>
      </div>
    </div>
  );
};

export { Select };
