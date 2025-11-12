---
title: Pick type under the hood in TypeScript
created: "2021-04-05"
updated: "2022-06-14"
description: Given existing type or interface, we need to extract part of properties
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - pick
image: /pick-under-the-hood/image.png
---

```typescript title="Example of Pick use"
type MyPick<T, Keys> = any; // implementation

type Post = {
  title: string;
  description: string | undefined;
  author: string;
};

type Step1 = MyPick<Post, "title" | "description">;
type Step2 = { title: Post["title"]; description: Post["description"] };
type Result = { title: string; description: string | undefined };
```

First challenge is [Pick](https://github.com/type-challenges/type-challenges/blob/master/questions/4-easy-pick/README.md)

It's usually used when you need to declare the type which is based on another type. And you know in advance which keys are included.

## Iteration over an object

First, you need to iterate over an object `T`. Usually [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) are used in this case:

```typescript title="Example of Mapped Types"
type MappedType<T> = {
  [Key in keyof T]: T[Key];
};
```

- `keyof T` gets the keys from the object type `T`
- `in` is for iteration over the keys
- `Key` is a key itself
- `T[Key]` is a value for a specified Key

## Specify `Keys` to iterate over

Second, to iterate over the part of an object, we need to specify `Keys` to iterate over:

```typescript title="Iteration over Keys"
type MappedType<T, Keys> = {
  [Key in Keys]: T[Key];
};
```

But with this you have 2 errors:

1. `Type 'Keys' is not assignable to type 'string | number | symbol'`
2. `Type 'Key' cannot be used to index type 'T'`

Both errors are connected with the rules of the iteration:

1. Key can be `string`, `number` or `symbol`
2. We cannot call `T[Key]` if `Key` doesn't exist in `T`

If **rule 2** is true, **rule 1** will be true as existing keys are one of the specified types. To iterate over the existing keys, we need to apply [Generic Constrains](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints) using `extends` keyword.

This way, if we specify non-existing key, TypeScript will throw an error `We cannot call T[Key] if Key doesn't exist in T` so we're safe now ✅

```typescript title="Solution"
type MyPick<T, Keys extends keyof T> = {
  [Key in Keys]: T[Key];
};
```

Check out the solution in Playground – https://tsplay.dev/mZbKem ⭐️
