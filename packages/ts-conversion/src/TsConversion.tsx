import { useCallback, useState } from "react";
import { ValueOf } from "./ValueOf";

const inputs = [
  "array",
  "tuple",
  "object",
  "union",
  "stringLiteral",
  "numericLiteral",
] as const;

type InputType = ValueOf<typeof inputs>;

const map: Record<InputType, Partial<Record<InputType, [string]>>> = {
  array: {
    array: undefined,
    tuple: undefined,
    union: [`type UnionFrom<Array> = Array[number];`],
    object: undefined,
    stringLiteral: undefined,
    numericLiteral: undefined,
  },
  tuple: {
    array: undefined,
    tuple: undefined,
    object: undefined,
    union: undefined,
    stringLiteral: undefined,
    numericLiteral: undefined,
  },
  object: {
    array: undefined,
    tuple: undefined,
    object: undefined,
    union: undefined,
    stringLiteral: undefined,
    numericLiteral: undefined,
  },
  union: {
    array: undefined,
    tuple: undefined,
    object: undefined,
    union: undefined,
    stringLiteral: undefined,
    numericLiteral: undefined,
  },
  stringLiteral: {
    array: undefined,
    tuple: undefined,
    object: undefined,
    union: undefined,
    stringLiteral: undefined,
    numericLiteral: undefined,
  },
  numericLiteral: {
    array: undefined,
    tuple: undefined,
    object: undefined,
    union: undefined,
    stringLiteral: undefined,
    numericLiteral: undefined,
  },
};

export const TsConversion = () => {
  const [source, setSource] = useState<InputType | undefined>(undefined);
  const [target, setTarget] = useState<InputType | undefined>(undefined);

  const handleSourceChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSource(event.target.value as InputType);
    },
    []
  );

  const handleTargetChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setTarget(event.target.value as InputType);
    },
    []
  );

  return (
    <div>
      <div className="row">
        <label>Source</label>
        <select onChange={handleSourceChange}>
          {inputs.map((input) => (
            <option key={input} value={input}>
              {input}
            </option>
          ))}
        </select>
      </div>
      <div className="row">
        <label>Target</label>
        <select onChange={handleTargetChange}>
          {inputs.map((input) => (
            <option
              key={input}
              disabled={!source || (source && map[source][input] === undefined)}
            >
              {input}
            </option>
          ))}
        </select>
      </div>
      {source && target && map[source][target] && (
        <blockquote>{map[source][target]}</blockquote>
      )}
    </div>
  );
};
