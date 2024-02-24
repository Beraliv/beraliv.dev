---
title: TypeScript spread operator for 2 object types
date: "2021-07-05"
description: Given two objects, returns the object which is formed as a spread of two objects in TypeScript
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - merge
image: /spread-in-typescript/step1-example-of-use.png
---

```typescript title="Example of Merge use"
type Merge<F, S> = any; // implementation

type EmptyArticle = { title: "<title>"; description: "<description>" };
type Article = { title: "TypeScript" };

type Step1 = Merge<EmptyArticle, Article>;
type Result = { title: "TypeScript"; description: "<description>" };
```

Today we discuss [Merge](https://github.com/type-challenges/type-challenges/blob/master/questions/599-medium-merge/README.md)

It's quite convenient to use it in combination with ES6 spread operator for objects.

Let's try it out 🚀

## Iterate over object keys

As I previously said, EcmaScript 6 introduced the spread operator which does the same in JavaScript which we want to achieve here. Let's have an example:

```typescript title="Spread in JavaScript"
const emptyObject = {
  title: "<title>",
  description: "<description>",
} as const;
const article = { title: "TypeScript" } as const;

// { title: "TypeScript", description: "<description>" }
const result = { ...emptyObject, ...article };
```

If we have the same key in both objects, we use if from the second object. Otherwise, we get it from the first object.

So let's iterate over all keys of two objects in TypeScript and check whether we have a key in second object. If so, we extract value from the second object. Otherwise, we get value from the first object – https://tsplay.dev/Nl0BlN

```typescript title="Merge, version 1"
type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S ? S[K] : F[K];
};
```

Unfortunately, we have an error when we use `F[K]` as TypeScript doesn't know in advance if `K` is a key of first object `F`. Let's add the condition explicitly:

```typescript title="Merge, final version"
type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
};
```

This workaround works and that's actually the solution – https://tsplay.dev/wRpM7m

Thank you for your time and have a wonderful evening 🌇
