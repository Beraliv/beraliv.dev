---
title: Tuple Filter
date: "2021-11-27"
description: Given a tuple and a filter, returns the tuple without elements that are part of the filter
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - tuple filter
image: /tuple-filter/image.png
---

```typescript title=Example of FilterOut use
type FilterOut<T extends any[], Filter> = any; // implementation

type cases = [
  Expect<Equal<FilterOut<[1, never, "a"], never>, [1, "a"]>>,
  Expect<Equal<FilterOut<[1, never, "a"], "a">, [1]>>
];
```

Today we discuss [TupleFilter](https://github.com/type-challenges/type-challenges/blob/master/questions/399-hard-tuple-filter/README.md)

Let's try it out 🚀

## Delegate a subtask

Let's start the solution from iteration over the tuple using recursive conditional types.

```typescript title=Iteration over the tuple
type FilterOut<T extends any[], F> = T extends [infer Head, ...infer Tail]
  ? [Head, ...FilterOut<Tail, F>]
  : [];
```

This way we don't really filter anything. Let's delegate the filtering part to `FilterElement`.

```typescript title=Delegate filtering to FilterElement
type FilterElement<Element, F> = [Element];

type FilterOut<T extends any[], F> = T extends [infer Head, ...infer Tail]
  ? [...FilterElement<Head, F>, ...FilterOut<Tail, F>]
  : [];
```

Let's save the progress in Playground – https://tsplay.dev/Wkjx2m

As you see, this way we don't really filter anything yet as we don't use a filter `F` in `FilterElement`

## Filter the current element

To be able to filter the element, let's use a filter `F`:

```typescript title=Incorrect way to filter the element
type FilterElement<Element, F> = Element extends F ? [] : [Element];

type FilterOut<T extends any[], F> = T extends [infer Head, ...infer Tail]
  ? [...FilterElement<Head, F>, ...FilterOut<Tail, F>]
  : [];
```

There's a thought to write it using this conditional type `Element extends F` but that's incorrect

To be able to test incorrect behaviour, let's have a look at the current implementation in Playground – https://tsplay.dev/W4pLeW

We will see broken cases, let's focus on the first one.

```typescript title=The first broken case with never
type BrokenFilterOut = FilterOut<[never], never>; // never
type BrokenFilterElement = FilterElement<never, never>; // never
type Test2 = [...never]; // never
```

It happens because we used not just usual conditional type but instead distributed conditional type like `T extends unknown` or `T extends never`:

```typescript title=Examples of distributed conditional types
type DistributedConditionalTypeWithNever<T> = T extends never ? never : [T];
type DistributedConditionalTypeWithUnknown<T> = T extends unknown ? [T] : never;

type Test1 = DistributedConditionalTypeWithNever<never>; // never
type Test2 = DistributedConditionalTypeWithUnknown<never>; // never
type Test3 = DistributedConditionalTypeWithNever<1>; // [1]
type Test4 = DistributedConditionalTypeWithUnknown<1>; // [1]
```

For `never` element with a filter `never` we get `never` which is later put into spread which leads to `never`

To be able to filter it correctly, let's try to check the equality of the types with the expression `[T] extends [U]`:

```typescript title=Correct way to filter the element
type FilterElement<Element, F> = [Element] extends [F] ? [] : [Element];

type FilterOut<T extends any[], F> = T extends [infer Head, ...infer Tail]
  ? [...FilterElement<Head, F>, ...FilterOut<Tail, F>]
  : [];
```

First of all it's working for `never` as `[never] extends [never]` goes to "then" branch. See:

```typescript title=
type IsNever<T> = [T] extends [never] ? true : false;

type Check1 = IsNever<never>; // true
type Check2 = IsNever<1>; // false
type Check3 = IsNever<false>; // false
type Check4 = IsNever<"1">; // false
```

Second, it's working fine if the filter is a union type like `'a' | 'b'`:

```typescript title=Checking union type filter
type HasAOrB<T> = [T] extends ["a" | "b"] ? true : false;

type Check1 = HasAOrB<never>; // true
type Check2 = HasAOrB<"a">; // true
type Check3 = HasAOrB<"b">; // true
type Check4 = HasAOrB<"a" | "b">; // true
type Check5 = HasAOrB<undefined>; // false
type Check6 = HasAOrB<null>; // false
type Check7 = HasAOrB<"c">; // false
```

## Solution

So the final solution looks like this

```typescript title=Solution
type FilterElement<Element, F> = [Element] extends [F] ? [] : [Element];

type FilterOut<T extends any[], F> = T extends [infer Head, ...infer Tail]
  ? [...FilterElement<Head, F>, ...FilterOut<Tail, F>]
  : [];
```

Let's sum up the whole solution:

1. We iterate over the tuple using conditional type – `T extends [infer Head, ...infer Tail]`
2. We delegate filtering the current element to the type `FilterElement`
3. We check if the current element is included in the filter with the conditional type `[Element] extends [F]`
4. If element is filtered, we return empty tuple and then it's not added into the result

To be able to check it with tests, please have a look at the Playground – https://tsplay.dev/Wy58dW

Thank you for your time and have a wonderful evening 🌇
