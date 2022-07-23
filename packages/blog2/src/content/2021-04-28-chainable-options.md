---
title: Chainable Options
date: "2021-04-28"
description: Given API, collect the object with keys and values after each call
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - chainable options
image: /mapped-types-in-functions/step1-example-of-use.png
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

Next, we say that we start from an empty object type and call after call we collect the data type in it. Let's add `T` as [Generic](https://www.typescriptlang.org/docs/handbook/2/generics.html):

```typescript title="Added generic type T"
interface Chainable<T = {}> {
  option(key: string, value: any): Chainable;
  get(): T;
}
```

Last but not least is the collection itself. Let's add types for a key and a value as [Generic](https://www.typescriptlang.org/docs/handbook/2/generics.html):

```typescript title="Add key and value for every option call"
interface Chainable<T = {}> {
  option<K, V>(key: K, value: V): Chainable<T & { [Key in K]: V }>;
  get(): T;
}
```

If you check temporary solution in Playground (https://tsplay.dev/m3PZAW), you will see that `Type 'K' is not assignable to type 'string | number | symbol'`

It means we need to apply [Generic Constrain](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints) for `K`, it should be a `string`:

```typescript title="Solution"
interface Chainable<T = {}> {
  option<K extends string, V>(
    key: K,
    value: V
  ): Chainable<T & { [Key in K]: V }>;
  get(): T;
}
```

That's it 💪

Don't forget to check the solution in Playground – https://tsplay.dev/wXQ6kN

## Real-life example

You can find chainable options in [yargs](https://www.npmjs.com/package/yargs) when you create a CLI in node.js

For example, you need to create a command `test` which can accept optional `testDir`, `ip` and `testCount` options:

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

And then we need to define `handleTestCommand` where `config` is infered from options that we included in `buildTestCommand`.

I will show the solution for it as is:

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

We correctly infer `string | undefined` for known options and `unknown` for unknown option ✅

Have a nice day ☀️
