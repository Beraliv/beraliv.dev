---
title: Extract object type with optional fields in TypeScript
created: "2021-12-07"
updated: "2021-12-07"
description: Given an object, returns object with all optional fields
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - getoptional
image: /get-optional/image.png
---

```typescript title="Example of GetOptional use"
type GetOptional<T> = any; // implementation

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ a: undefined; b?: undefined }>, { b?: undefined }>>
];
```

Today we discuss [GetOptional](https://github.com/type-challenges/type-challenges/blob/master/questions/59-hard-get-optional/README.md)

Here we consider multiple approaches including new possibilities from TypeScript 4.1

Let's have a look ⤵️

## Pick only optional keys

First things first, we split the solution into 2 parts.

```typescript title="Use OptionalKeys to get optional keys"
type OptionalKeys<T> = keyof T;

type GetOptional<T> = Pick<T, OptionalKeys<T>>;
```

Let's implement `OptionalKeys` properly as now it returns all the keys from the object type.

If we have an optional key, we can skip the definition of it in the object. It means that given the object with only one optional key, it's allowed to assign empty object to it.

```typescript title="Meaning of optional key"
type WithOptional = { a?: string };
type WithRequired = { a: string };

// ✅ allowed
let obj1: WithOptional = {};
// @ts-expect-error ❌ Property 'a' is missing in type '{}' but required in type 'WithRequired'
let obj2: WithRequired = {};
```

Knowing that, we can come up with the conditional type `{} extends Pick<T, K> ? T[K] : never`:

```typescript title="Adding mapped type and conditional type"
type OptionalKeys<T> = keyof {
  [K in keyof T]: {} extends Pick<T, K> ? T[K] : never;
};

type GetOptional<T> = Pick<T, OptionalKeys<T>>;
```

Let's check the solution in Playground – https://tsplay.dev/wenOaN

If we check it on any object type, we will see that it's not working correct

```typescript title="Checking current solution"
// "a" | "b"
type Test1 = OptionalKeys<{ a?: 1; b: 2 }>;
```

But this is because we use `keyof { [K in keyof T]: ... }` which literally means `keyof T`. The conditional type is right but we need to return only optional keys. Let's change the solution slightly to make it work.

## Return only optional keys

Let's change the mapped type a bit:

```typescript title="Return only optional keys"
type Values<T> = T[keyof T];

type OptionalKeys<T> = Values<{
  [K in keyof T]: {} extends Pick<T, K> ? K : never;
}>;

type GetOptional<T> = Pick<T, OptionalKeys<T>>;
```

What we did here:

1. We added `Values` which returns not keys but values of the object type
2. In `OptionalKeys` we now return key `K` instead of value `T[K]`. In combination with `Values` we can get the optional keys of `T`

The solution now works as expected https://tsplay.dev/WzL1rN ✅

Is that it? Not really, let's look for the shorter solution 👀

## Shorter solution

Currently we know that the main conditional type is `{} extends Pick<T, K> ? K : never`

Also we know there is [Key Remapping via as](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as) in [TypeScript 4.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html) 💡

```typescript title="Example of key remapping"
type MappedTypeWithNewKeys<T> = {
  [K in keyof T as NewKeyType]: T[K];
  //            ^^^^^^^^^^^^^
  //            This is the new syntax!
};
```

We can try it in our shorter solution, it will look like that:

```typescript title="Short solution"
type GetOptional<T> = {
  [K in keyof T as {} extends Pick<T, K> ? K : never]: T[K];
};
```

Let's sum up it again:

1. We figured out how to identify optional keys and came up with the conditional type – `{} extends Pick<T, K> ? K : never`
2. We added `Values` first and used it to infer optional keys
3. Then we found the way to do it with key remapping via operator `as`

To be able to see the final solution with all the test cases, please have a look at the Playground – https://tsplay.dev/m05JGW

Thank you for your time! 🕛

Have a wonderful evening 🌆 and see you soon! 👋
