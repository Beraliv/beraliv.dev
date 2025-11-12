---
title: Awaited type under the hood in TypeScript
created: "2021-04-13"
updated: "2021-11-26"
description: Given the promise, return the value after applying await recursively
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - await
image: /unwrapping-promises/step1-example-of-use.png
---

```typescript title="Example of Awaited use"
type Awaited<T> = any; // implementation

type Step1 = Awaited<Promise<Promise<string | undefined>>>;
type Step2 = Awaited<Promise<string | undefined>>;
type Result = string | undefined;
```

Seventh challenge is [Awaited](https://github.com/type-challenges/type-challenges/blob/master/questions/189-easy-awaited/README.md)

It's available since [TypeScript 4.5](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#the-awaited-type-and-promise-improvements) 🔥🔥🔥

Like `await` in JavaScript, it unwraps `Promise` and gets the value in the same way.

Sometimes it's useful to get the value even if it's double wrapped with `Promise` so this is also possible.

## Unboxing values from types

[Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types) is defined in TypeScript as following:

> Within the extends clause of a conditional type, it is now possible to have infer declarations that introduce a type variable to be inferred. Such inferred type variables may be referenced in the true branch of the conditional type

```typescript title="Example of type inference in conditional types"
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

As we want to unbox double or maybe thrice wrapped `Promise` we need [Recursive Conditional Types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types):

```typescript title="Example of recursive conditional types"
type ElementType<T> = T extends ReadonlyArray<infer U> ? ElementType<U> : T;
```

It's available since [TypeScript 4.1](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/) and allows us to do so with `Promise` too:

```typescript title="Solution"
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;
```

This is it ⭐️

Don't forget to check the solution on Playground – https://tsplay.dev/mqQxkm 🚀
