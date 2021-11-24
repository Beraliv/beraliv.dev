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
