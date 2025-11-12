---
title: Flatten tuple type of tuples in TypeScript
created: "2021-06-13"
updated: "2022-02-07"
description: Given the tuple, make it flatten as Array.prototype.flat when pass Infinity
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - flatten
image: /flatten-tuple-type-in-typescript/image.png
---

```typescript title="Example of Flatten use"
type Flatten<T> = any; // implementation

type Step1 = Flatten<[1, [2, [3, [4]]]]>;
type Step2 = [1, ...Flatten<[2, [3, [4]]]>];
type Step3 = [1, 2, ...Flatten<[3, [4]]>];
type Step4 = [1, 2, 3, ...Flatten<[4]>];
type Result = [1, 2, 3, 4];
```

Today we discuss [Flatten](https://github.com/type-challenges/type-challenges/blob/master/questions/459-medium-flatten/README.md)

It works the same way as [Array.prototype.flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat/) when you pass `Infinity`

Let's find out how to do that in TypeScript 💪

## Iteration over tuple elements

Knowing the approach from different challenges, as we want to save the structure (it will be tuple at the end), we apply [Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types) with [Rest elements in Tuples](https://devblogs.microsoft.com/typescript/announcing-typescript-4-2/#non-trailing-rests).

We iterate over elements:

```typescript title="Iterate over tuple elements"
type Flatten<T> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? [] // make it flatten using Head and Tail
  : [];
```

Then we have 2 cases:

1. If the element is a tuple, we apply changes recursively
2. Otherwise, we leave it as is

Let's add second case:

```typescript title="Put element to the result tuple type"
type Flatten<T> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? [Head, ...Flatten<Tail>]
  : [];
```

## Call it recursively when needed

At the moment, if we have a look at Playground – https://tsplay.dev/w18bXW, we will find that not all tests are passed.

We forgot to apply function recursively when we have an element as tuple. Let's have an example here:

```typescript title="Example where Flatten isn't working"
type Step1 = Flatten<[1, [2]]>;
type Step2 = [1, ...Flatten<[[2]]>];
// ❌ Expected to have [1, 2] instead
type Result = [1, [2]];
```

In this case we cannot just add it to result tuple, we need to call `Flatten` before and then put all the elements of it to the result type. Let's change the implementation based on that:

```typescript title="Solution"
type Flatten<T> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? Head extends any[]
    ? [...Flatten<Head>, ...Flatten<Tail>]
    : [Head, ...Flatten<Tail>]
  : [];
```

Now it's working as expected 🔥

Check out Playground – https://tsplay.dev/WKk0DW

And last but not least, as you see we return empty array `[]` in several places, let's simplify solution a little bit:

```typescript title="Shorter solution"
type Flatten<T> = T extends [infer Head, ...infer Tail]
  ? Head extends any[]
    ? [...Flatten<Head>, ...Flatten<Tail>]
    : [Head, ...Flatten<Tail>]
  : [];
```

Shorter solution – https://tsplay.dev/WP7gzm

Thank you for your time and have a productive upcoming week 🚀
