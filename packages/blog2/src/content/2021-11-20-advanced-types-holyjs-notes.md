---
title: Advanced types / Holy.js notes
date: "2021-11-20"
description: The power of TypeScript will be revealed by the example of several tasks from type-challenges of the hard level.
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - holyjs
image: /advanced-types-holyjs-notes/image.png
---

![Max and I discuss StringToNumber on Holy.js](/advanced-types-holyjs-notes/image.png)

On November, 5, together with [Max](https://github.com/ColCh) we had a talk about [Advanced types in TypeScript on HolyJS](https://holyjs-moscow.ru/en/talks/advanced-types-in-typescript/). Let's sum it up.

## Table of contents

- [Why do we need types](/2021-11-20-advanced-types-holyjs-notes#why-do-we-need-types)
- Basic and advanced types
  - [Basic types](/2021-11-20-advanced-types-holyjs-notes#basic-types)
  - [Advanced types](/2021-11-20-advanced-types-holyjs-notes#advanced-types)
  - [Difference between basic and advanced types](/2021-11-20-advanced-types-holyjs-notes#basic-or-advanced-types)
  - [Ways to express advanced types](/2021-11-20-advanced-types-holyjs-notes#ways-to-express-advanced-types)
- [Type challenges](/2021-11-20-advanced-types-holyjs-notes#type-challenges)
  - [Testing challenges](/2021-11-20-advanced-types-holyjs-notes#testing-challenges)
  - Solutions
    - [Tuple Filter](/2021-11-20-advanced-types-holyjs-notes#tuple-filter)
    - [Split](/2021-11-20-advanced-types-holyjs-notes#split)
    - [StringToNumber](/2021-11-20-advanced-types-holyjs-notes#stringtonumber)
    - [GetOptional](/2021-11-20-advanced-types-holyjs-notes#getoptional)
- [Conclusion](/2021-11-20-advanced-types-holyjs-notes#conclusion)

## Why do we need types?

Based on the book of [Benjamin C. Pierce – Types and Programming Languages](https://www.cis.upenn.edu/~bcpierce/tapl/index.html), type systems in general are good for:

1. [Detecting errors](https://mitpress.ublish.com/ereader/21/?preview#page/4)
2. [Abstraction](https://mitpress.ublish.com/ereader/21/?preview#page/5)
3. [Documentation](https://mitpress.ublish.com/ereader/21/?preview#page/5)
4. [Language safety](https://mitpress.ublish.com/ereader/21/?preview#page/6)
5. [Efficiency](https://mitpress.ublish.com/ereader/21/?preview#page/8)

Of course, it allows early detection of some programming errors. It can be not only trivial mental slips (e.g. forgetting to convert a string to a number), but also deeper conceptual errors (e.g. neglecting a boundary condition, confusing units and etc.)

Regarding abstraction, type systems structure large systems in terms of modules with clear interfaces.

Types are also useful when reading programmes and cannot be outdated unlike comments.

If we talk about safety, we can define it as types make it impossible to shoot yourself in the foot while programming.

And last but not least, it's efficiency as high-performance compilers rely heavily on information gathered by the type checker during optimisation and code-generation phases.

In terms of TypeScript, we use it for the same reasons. Let's focus on the first 3 items:

1. Detecting errors

```typescript title=Analysing AST-tree, TypeScript finds and shows errors
type Status = "loading" | "loaded" | "error";

let currentStatus: Status;

currentStatus = "loading";
currentStatus = "loaded";
currentStatus = "error";
// Type '"lagged"' is not assignable to type 'Status'
currentStatus = "lagged";
```

2. Abstraction

```typescript title=Creating new entities with types and interfaces
type SquareMeters = number;

interface Room {
  area: SquareMeters;
}
interface Flat {
  rooms: Room[];
}
interface House {
  flats: Flat[];
}
interface District {
  houses: House[];
}
interface City {
  districts: District[];
}
interface Country {
  cities: City[];
}
```

3. Documentation

```typescript title=React component Label which accepts object props with 2 fields – selected and title
import { FC } from "react";

interface LabelPropsType {
  selected?: boolean;
  title: string;
}

export const Label: React.FC<LabelPropsType> = ({
  selected = false,
  title,
}) => <a href={selected ? `/search` : `/search?label=${title}`}>{title}</a>;
```

## Basic types

Before discussing advanced types, I would like to touch on some examples of the basic types:

1. `Pick` allows us to get the object with the fields that we need.

```typescript title=Example of Pick
interface Person {
  name: string;
  age: number;
  alive: boolean;
}

//  { name: string; }
type PersonWithNameOnly = Pick<Person, "name">;
//  { name: string; age: number; }
type PersonWithNameAndAge = Pick<Person, "name" | "age">;
```

2. `Exclude` allows to remove elements from union type

```typescript title=Example of Exclude
type Status = "loading" | "loaded" | "error";

//  "loading" | "loaded"
type StatusWithoutErrorOnly = Exclude<Status, "error">;
//  "error"
type ErrorStatus = Exclude<Status, "loading" | "loaded">;
```

3. We use `never` in different constructions. We can draw an anology between `never` for union types and the empty set.

```typescript title=Example of keyword never
type Status = "loading" | "loaded" | "error";

//  never
type SuccessStatus = Exclude<Status, Status>;
```

4. Tuples, which works like arrays but the number of elements is always fixed.

```typescript title=Example of tuples
type Statuses = ["loading", "loaded", "error"];
type VideoFormats = ["mp4", "mov", "wmv", "avi"];
type EmptyTuple = [];
```

```typescript title=Spread in tuples
type TupleWithZero = [0];

type Test1 = [1, ...TupleWithZero, 1]; // [1, 0, 1]
type Test2 = [...TupleWithZero, 1, ...TupleWithZero]; // [0, 1, 0]
```

5. Arrays, to be able to store multiple values, e.g. array of numbers or strings.

```typescript title=Example of arrays
interface School {
  log: Record<string, number[]>;
}

type MathMarks = School["log"]["math"]; // number[]
type Subjects = (keyof School["log"])[]; // string[]
```

## Advanced types

Let's now discuss some examples of advanced types

1. Construction like `T extends string` can be used in 2 cases: Generic constrains (where we can restrict the accepted types) and conditional types (where e.g. we can check if it's a string or not)

```typescript title=Examples of generic constraints and conditional types
type AcceptsStrings<T extends string> = `${string}${T}`;
type IsString<T> = T extends string ? true : false;

// ❌ Type 'number' does not satisfy the constraint 'string'
type Test1 = AcceptsStrings<number>;
type Test2 = IsString<number>; // false
```

These 2 examples show the difference: `number` in `Test1` will be marked as the error in Typescript while `Test2` will be just `false`.

2. Mapped types allow us to create an object with new keys and values. For example, we made 2 objects with identical keys and values.

```typescript title=Example of mapped types
type KeyToKeyMapping<Keys extends PropertyKey> = { [K in Keys]: K };

//  { 1: 1, 2: 2, 3: 3; }
type Test1 = KeyToKeyMapping<1 | 2 | 3>;
// { a: "a"; b: "b"; c: "c"; }
type Test2 = KeyToKeyMapping<"a" | "b" | "c">;
```

3. Conditional types can use keyword `infer` to be able to identify what we have on the specific place.

```typescript title=Inference in conditional types
// type ReturnType<T> = T extends (...args: any) => infer R ? R : any

type Test1 = ReturnType<() => void>; // void
type Test2 = ReturnType<() => number>; // number
type Test3 = ReturnType<() => boolean>; // boolean
```

If we use basic type `ReturnType`, we can get the return value of the function, e.g. `void`, `number` and `boolean` respectively.

4. Given type or interface, we can get the keys with keyword `keyof`

```typescript title=Examples of keyof
type Person = { name: string };
type School = { pupils: Person[]; teachers: Person[] };

type Test1 = keyof Person; // "name"
type Test2 = keyof School & string; // "pupils" | "teachers"
```

5. Recursive condition types are condition types where we can use another recursive call to get results.

```typescript title=Putting characters into the tuple
type CharacterIteration<T> = T extends `${infer Ch}${infer Rest}`
  ? [Ch, ...CharacterIteration<Rest>]
  : [];

type Test1 = CharacterIteration<"123">; //  ["1", "2", "3"]
type Test2 = CharacterIteration<"">; // []
```

Also here we can see the iteration over string literal type using `` T extends `${infer Ch}${infer Rest}`  ``

6. Using `[T] extends [U]` we can check that one type can equal to another one. But we also have an exception in `any` here.

```typescript title=Check if types are equal
type Equals<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false;

type Test1 = Equals<never, never>; //  true
type Test2 = Equals<unknown, any>; //  true 🧐
type Test3 = Equals<1, number>; //  false
```

7. Check for a string literal type which still requires `T extends string` conditional type to return `false` for anything other than `string`

```typescript title=Check for string literal type
type IsStringLiteral<T> = T extends string
  ? string extends T
    ? false
    : true
  : false;

type Test1 = IsStringLiteral<string>; // false
type Test2 = IsStringLiteral<"123">; // true
type Test3 = IsStringLiteral<123>; // false
```

8. To be able to convert tuples to number literal type, we can use `length`

```typescript title=Tuple to number literal type examples
type Test1 = []["length"]; // 0
type Test2 = [1, 2, 3]["length"]; // 3
```

9. This conditional types is used for union type elements iteration and it's called distributed conditional types

```typescript title=Example of distributed conditional types
type UnionIteration<T> = T extends unknown ? [T] : never;

type Test1 = UnionIteration<never>; //  never
type Test2 = UnionIteration<1>; //  [1]
type Test3 = UnionIteration<1 | 2>; //  [1] | [2]
```

## Basic or advanced types?

Let's have a look at [Advanced Types | TypeScript docs v1](https://www.typescriptlang.org/docs/handbook/advanced-types.html) where the advanced type was defined. It says:

> This page lists some of the more advanced ways in which you can model types, it works in tandem with the [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) doc which includes types which are included in TypeScript and available globally.

In [Creating Types from Types | TypeScript docs v2](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html) TypeScript steps aside from this term, but the idea is still the same:

> By combining various type operators, we can express complex operations and values in a succinct, maintainable way.

And below there are 7 ways to express a new type in TypeScript:

- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) - Types which take parameters
- [Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html) - Using the keyof operator to create new types
- [Typeof Type Operator](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html) - Using the typeof operator to create new types
- [Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) - Using `Type['a']` syntax to access a subset of a type
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) - Types which act like if statements in the type system
- [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) - Creating types by mapping each property in an existing type
- [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) - Mapped types which change properties via template literal strings
