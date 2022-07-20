---
title: Mapped Types in functions
date: "2021-04-28"
description: Given API, collect the object with keys and values after each call
labels:
  - typescript
keywords:
  - typescript
  - challenges
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

Have a nice day ☀️
