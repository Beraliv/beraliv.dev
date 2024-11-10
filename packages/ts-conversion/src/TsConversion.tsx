import { useCallback, useState } from "react";
import { ValueOf } from "./ValueOf";
import { clampLines } from "./clampLines";

const inputs = [
  "array",
  "tuple",
  "object",
  "union",
  "stringLiteral",
  "numericLiteral",
] as const;

type InputType = ValueOf<typeof inputs>;

const map: Record<InputType, Partial<Record<InputType, string>>> = {
  array: {
    array: undefined,
    tuple: undefined,
    object: undefined,
    union: `
        type UnionFrom<Array> = Array[number];
        type Array = (number | string)[];
        type Union = UnionFrom<Array>;
        //   ^? number | string
    `,
    stringLiteral: undefined,
    numericLiteral: undefined,
  },
  tuple: {
    array: undefined,
    tuple: undefined,
    object: undefined,
    union: `
        type UnionFrom<Tuple> = Tuple[number];
        type Tuple = [1, 2, 3];
        type Union = UnionFrom<Tuple>;
        //   ^? 1 | 2 | 3
    `,
    stringLiteral: undefined,
    numericLiteral: `
        type LengthOf<Tuple extends {length: number}> = Tuple['length'];
        type Tuple = [1, 2, 3];
        type Length = LengthOf<Tuple>;
        //   ^? 3
    `,
  },
  object: {
    array: undefined,
    tuple: undefined,
    object: undefined,
    // TODO: add values
    union: `
        type KeysFrom<Object> = keyof Object;
        type Person = {name: string; age: number};
        type Characteristics = KeysFrom<Person>;
        //   ^? 'name' | 'age'
    `,
    stringLiteral: undefined,
    // TODO: number of keys
    numericLiteral: undefined,
  },
  union: {
    array: undefined,
    tuple: undefined,
    object: undefined,
    union: undefined,
    stringLiteral: undefined,
    // TODO: number of union elements
    numericLiteral: undefined,
  },
  stringLiteral: {
    array: undefined,
    tuple: undefined,
    object: undefined,
    union: `
        type CharUnionFrom<StringLiteral> = StringLiteral extends \`$\{infer Char}$\{infer Tail}\`
            ? Char | CharUnionFrom<Tail>
            : never;
        type StringLiteral = 'world';
        type CharUnion = CharUnionFrom<StringLiteral>;
        //   ^? 'w' | 'o' | 'r' | 'l' | 'd'
    `,
    stringLiteral: undefined,
    numericLiteral: `
        type LengthFrom<StringLiteral, Tuple extends any[] = []> = StringLiteral extends \`$\{infer Char}$\{infer Tail}\`
            ? LengthFrom<Tail, [...Tuple, any]>
            : Tuple['length'];
        type StringLiteral = 'world';
        type Length = LengthFrom<StringLiteral>;
        //   ^? 5
    `,
  },
  numericLiteral: {
    array: undefined,
    tuple: `
        type Repeat<Value, NumericLiteral, Tuple extends Value[] = []> = Tuple['length'] extends NumericLiteral
            ? Tuple
            : Repeat<Value, NumericLiteral, [...Tuple, Value]>;
        type NumericPair = Repeat<number, 2>;
        //   ^? [number, number]
    `,
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
          <option disabled hidden selected>
            Choose option:
          </option>
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
          <option disabled hidden selected>
            Choose option:
          </option>
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
        <pre>
          <code>{clampLines(map[source][target])}</code>
        </pre>
      )}
    </div>
  );
};
