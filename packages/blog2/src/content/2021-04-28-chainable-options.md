---
title: Chainable options type in TypeScript
date: "2021-04-28"
description: Given API, collect the object with keys and values after each call
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - chainable options
image: /chainable-options/image.png
---

```typescript title="Example of Chainable Options use"
interface Chainable {
  option(key: string, value: any): any; // implementation
  get(): any;
}

declare const chainable: Chainable;

const step1 = chainable.option("title", "Mapped Types in functions");
//    ^? { title: string }

const step2 = step1.option("author", { name: "Alexey" });
//    ^? { title: string; author: { name: string } }

const result = step2.get();
//    ^? { title: string; author: { name: string } }
```

Today we discuss [Chainable Options](https://github.com/type-challenges/type-challenges/blob/master/questions/12-medium-chainable-options/README.md)

That's one of the most popular challenges I've worked with: you need to connect the data type with event type, e.g. for your tracking or logging.

But the difference here is that you need to infer type from the calls.

## Collect types from calls

First we can do is to return `Chainable` for a function `option`:

```typescript title="Change ReturnType for option function"
interface Chainable {
  option(key: string, value: any): Chainable;
  get(): any;
}
```

Next, we say that we start from an empty object type and call after call we collect the data type in it. Let's add `ParsedConfig` as [Generic](https://www.typescriptlang.org/docs/handbook/2/generics.html):

```typescript title="Added generic type T"
interface Chainable<ParsedConfig = {}> {
  option(key: string, value: any): Chainable;
  get(): ParsedConfig;
}
```

Last but not least is the collection itself. Let's add types for a key and a value as [Generic](https://www.typescriptlang.org/docs/handbook/2/generics.html):

```typescript title="Add key and value for every option call"
interface Chainable<ParsedConfig = {}> {
  option<Key, Value>(
    key: Key,
    value: Value
  ): Chainable<ParsedConfig & Record<Key, Value>>;
  get(): ParsedConfig;
}
```

If you check temporary solution in Playground (https://tsplay.dev/wOGbrw), you will see that `Type 'Key' does not satisfy the constraint 'string | number | symbol'`

It means we need to apply [Generic Constrain](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints) for `Key`, it should be a `string`:

```typescript title="Solution"
interface Chainable<ParsedConfig = {}> {
  option<Key extends string, Value>(
    key: Key,
    value: Value
  ): Chainable<ParsedConfig & Record<Key, Value>>;
  get(): ParsedConfig;
}
```

That's it 💪

Don't forget to check the solution in Playground – https://tsplay.dev/mLqMAW

## Improve readability

If you create `type Test = typeof result` and hover over `Test`, you will see this:

```typescript title="Inferred type for result"
const result: Record<"foo", number> &
  Record<
    "bar",
    {
      value: string;
    }
  > &
  Record<"name", string>;
```

That happens because we use [Intersection types](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types), or in other words `&`.

We can use [Mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) to add key and value without `&`:

```typescript title="Hack with Flatten type"
type AddOption<ParsedConfig, Key extends string, Value> = {
  [K in keyof ParsedConfig | Key]: K extends keyof ParsedConfig
    ? ParsedConfig[K]
    : Value;
};

interface Chainable<ParsedConfig = {}> {
  option<Key extends string, Value>(
    key: Key,
    value: Value
  ): Chainable<AddOption<ParsedConfig, Key, Value>>;
  get(): ParsedConfig;
}
```

Now if we hover over `Test` again, we will see:

```typescript title="Updated inferred type for result"
type Test = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};
```

We improved the readability of inferred value, you can see the updated `Chainable` type in Playground – https://tsplay.dev/w1PMGW

## Real-life example

You can find chainable options in [yargs](https://www.npmjs.com/package/yargs) – the node.js library to create a CLI for your needs.

For example, when you need to create a command `test` which can accept optional `testDir`, `ip` and `testCount` options, you can define it this way:

```typescript title="Test command which accepts 3 optional options"
import * as yargs from "yargs";

const buildTestCommand = (argv: yargs.Argv) =>
  argv
    .option("testDir", {
      type: "string",
      description: "A path to a directory containing test files",
    })
    .option("ip", {
      type: "string",
      description: "IP of device where you want to run tests",
    })
    .option("testCount", {
      type: "number",
      description: "Number of times you want to run tests",
    });

yargs.command(
  "test",
  "Running one or more tests",
  (argv) => void buildTestCommand(argv),
  handleTestCommand
);
```

Then we will need to define `handleTestCommand` where `config` is inferred from options that we included in `buildTestCommand`.

How can we do it? I will show the solution for it as is:

```typescript title="Infer command config out of build function"
type AnyFunction = (...args: any[]) => any;
type ExtractCommandConfig<Fun extends AnyFunction> =
  ReturnType<Fun> extends yargs.Argv<infer ParsedOptions>
    ? yargs.Argv<ParsedOptions>["argv"]
    : never;
type FilterPromise<Union> = Union extends Promise<any> ? never : Union;

type TestCommandConfig = Partial<
  FilterPromise<ExtractCommandConfig<typeof buildTestCommand>>
>;

const handleTestCommand = (config: TestCommandConfig): void => {
  const { testDir, ip, testCount } = config;

  testDir;
  // ^? string | undefined

  ip;
  // ^? string | undefined

  testCount;
  // ^? string | undefined

  unknownOption;
  // ^? unknown
};
```

The whole `yargs` example is available here – https://tsplay.dev/wXQJ1N 👏

We correctly inferred `string | undefined` for known options and `unknown` for unknown option ✅

Thank you for your time and have a nice day ☀️
