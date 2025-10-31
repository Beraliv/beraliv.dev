---
title: Opaque Types in TypeScript
date: "2021-05-07"
description: Structural type system, workaround in TypeScript, unique symbol and code examples
labels:
  - typescript
keywords:
  - typescript
  - opaque type
image: /opaque-type-in-typescript/image.png
featured: true
---

```typescript title="Example of Opaque Types"
declare const __opaque__type__: unique symbol;

type OpaqueType<BaseType, TagName> = BaseType & {
  readonly [__opaque__type__]: TagName;
};

type PositiveNumber = OpaqueType<number, "PositiveNumber">;
type NegativeNumber = OpaqueType<number, "NegativeNumber">;

declare let positiveNumber: PositiveNumber;
declare let negativeNumber: NegativeNumber;

// Type '"NegativeNumber"' is not assignable to type '"PositiveNumber"'
positiveNumber = negativeNumber;
// Type '"PositiveNumber"' is not assignable to type '"NegativeNumber"'
negativeNumber = positiveNumber;
```

Today we discuss Opaque types:

1. [What problems do they solve](/2021-05-07-opaque-type-in-typescript/#the-problem)
2. [What ways could we solve this problem](/2021-05-07-opaque-type-in-typescript/#probable-solutions)
3. [Why I chose this solution](/2021-05-07-opaque-type-in-typescript/#probable-solutions)
4. [Describe the solution in more technical details](/2021-05-07-opaque-type-in-typescript/#unique-symbol)

## The problem

TypeScript, like Elm and Haskell, has a [structural type system](https://www.typescriptlang.org/docs/handbook/type-compatibility.html). It means that 2 different types but of the same shape are compatible:

```typescript title="Example of structural type system"
type Animal = { animal: true };
type Cat = { animal: true; meow: VoidFunction };
type Dog = { animal: true; bark: VoidFunction };

declare let animal: Animal;
declare let cat: Cat;
declare let dog: Dog;

// ✅
animal = dog;
animal = cat;
// ❌ Property 'bark' is missing
dog = cat;
dog = animal;
// ❌ Property 'meow' is missing
cat = dog;
cat = animal;
```

It leads to more flexibility but at the same time leaves a room for specific bugs.

Nominal typing system, on the other hand, would throw an error in this case because types don't inherit each other so no instance of one type cannot be assigned to the instance of another type.

TypeScript didn't resolve nominal type feature and since 23 Jul 2014 has an open issue: [Support some non-structural (nominal) type matching #202](https://github.com/microsoft/TypeScript/issues/202).

[Ryan Cavanaugh](https://github.com/RyanCavanaugh) described the cases in [the comment](https://github.com/Microsoft/TypeScript/issues/202#issuecomment-329914167) where nominal types would be useful.

## Probable solutions

Let's see how we can imitate nominal type feature for TypeScript 4.2:

### 1. Class + a private property

Here we define `class` for every nominal type and add `__nominal` mark as a private property:

<Comment text="`Types have separate declarations of a private property '__nominal'.` is too long, overflow: scroll should fix it, but it doesn't" />

```typescript title="Class with private property"
class USD {
  private __nominal: void;
  constructor(public value: number) {}
}

class EUR {
  private __nominal: void;
  constructor(public value: number) {}
}

declare let usd: USD;
declare let eur: EUR;

// ❌
// Type 'EUR' is not assignable to type 'USD'.
//   Types have separate declarations of a private property '__nominal'.
usd = eur;
eur = usd;
```

Playground – https://tsplay.dev/we4a1W

### 2. Class + intersection types

We still define `class` here, but for every nominal type we have [Generic type](https://www.typescriptlang.org/docs/handbook/2/generics.html):

```typescript title="Class with intersection types"
class Currency<T extends string> {
  private as: T;
}

type USD = number & Currency<"USD">;
type EUR = number & Currency<"EUR">;

declare let usd: USD;
declare let eur: EUR;

// ❌
// Type 'EUR' is not assignable to type 'USD'.
//  Type 'EUR' is not assignable to type 'Currency<"USD">'.
//    Types of property 'as' are incompatible.
//      Type '"EUR"' is not assignable to type '"USD"'
usd = eur;
eur = usd;
```

Playground – https://tsplay.dev/wgXa9N

### 3. Type + intersection types

We only define `type` here and use [Generic type](https://www.typescriptlang.org/docs/handbook/2/generics.html) with intersection types:

```typescript title="Type with intersection types"
type Brand<K, T> = K & { __brand: T };

type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

declare let usd: USD;
declare let eur: EUR;

// ❌ someone can use it but it doesn't exist
usd.__brand;

// ❌
// Type 'EUR' is not assignable to type 'USD'.
//  Type 'EUR' is not assignable to type '{ __brand: "USD"; }'.
//    Types of property '__brand' are incompatible.
//      Type '"EUR"' is not assignable to type '"USD"'
usd = eur;
eur = usd;
```

Playground – https://tsplay.dev/NnQM6w

### 4. Type + intersection types + unique symbol

We still define `type`, use [Generic type](https://www.typescriptlang.org/docs/handbook/2/generics.html), use intersection types with `unique symbol`:

```typescript title="Type with intersection types and unique symbol property"
declare const brand: unique symbol;

type Brand<K, T> = K & { readonly [brand]: T };

type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

declare let usd: USD;
declare let eur: EUR;

// ❌
// Type 'EUR' is not assignable to type 'USD'.
//  Type 'EUR' is not assignable to type '{ readonly [brand]: "USD"; }'.
//    Types of property '[brand]' are incompatible.
//      Type '"EUR"' is not assignable to type '"USD"'
usd = eur;
eur = usd;
```

Playground – https://tsplay.dev/WkMljN

## Choose the solution

Let's compare all the approaches that are mentioned above:

| Approach                                                                                                                      | Error readability |        JS-free         | Can be reused |         Encapsulated          |
| :---------------------------------------------------------------------------------------------------------------------------- | :---------------: | :--------------------: | :-----------: | :---------------------------: |
| [Class + a private property](/2021-05-07-opaque-type-in-typescript/#1-class--a-private-property)                              |        5️⃣         | ❌ class + constructor |      ❌       |              ✅               |
| [Class + intersection types](/2021-05-07-opaque-type-in-typescript/#2-class--intersection-types)                              |        5️⃣         |     ❌ empty class     |      ✅       |              ✅               |
| [Type + intersection types](/2021-05-07-opaque-type-in-typescript/#3-type--intersection-types)                                |        5️⃣         |           ✅           |      ✅       | ❌ `__brand` visibility in TS |
| [Type + intersection types + unique symbol](/2021-05-07-opaque-type-in-typescript/#4-type--intersection-types--unique-symbol) |        5️⃣         |           ✅           |      ✅       |              ✅               |

1. All approaches have a great error readability (the problem is visible and it's connected to the nominal type)
2. First 2 approaches use JS: [Class + a private property](/2021-05-07-opaque-type-in-typescript/#1-class--a-private-property) cannot be reused, [Class + intersection types](/2021-05-07-opaque-type-in-typescript/#2-class--intersection-types) can be reused but still creates empty class (which is fine)
3. By encapsulation here [Type + intersection types](/2021-05-07-opaque-type-in-typescript/#3-type--intersection-types) make `__brand` property visible outside and can lead to stupid errors which I want to get rid of.

So if you don't really want to see one empty class, please use [Type + intersection types + unique symbol](/2021-05-07-opaque-type-in-typescript/#4-type--intersection-types--unique-symbol)

If one empty class is still okay, you can choose [Class + intersection types](/2021-05-07-opaque-type-in-typescript/#2-class--intersection-types)

I will stop on [Type + intersection types + unique symbol](/2021-05-07-opaque-type-in-typescript/#4-type--intersection-types--unique-symbol)

## unique symbol

It's possible to create a symbol in TypeScript without creating it in JavaScript. So it won't exist after compiling

```typescript title="Declare unique symbol"
declare const brand: unique symbol;
```

Also, if you plan to reuse `OpaqueType` and put it to the separate file:

```typescript title="Opaque type implementation"
declare const __opaque__type__: unique symbol;

type OpaqueType<K, T> = K & { readonly [__opaque__type__]: T };
```

It's a good idea as in this case `symbol` won't be accessible outside of the file and therefore you cannot read the property.

## Example

Let's have a look at [CodeSandbox](https://codesandbox.io/s/ts-opaque-units-6j3ti?file=/src/index.ts)

```typescript title="ts-opaque-units example"
import { convert, Days } from "ts-opaque-units";

const daysSinceLast6months = () => {
  const time = 7 as Days;

  const hours = Math.floor(convert(time, "days", "hours"));
  const minutes = Math.floor(convert(time, "days", "minutes"));
  const seconds = Math.floor(convert(time, "days", "seconds"));

  return `${hours}h or ${minutes}m or ${seconds}s`;
};

document.body.innerHTML = daysSinceLast6months();
```

It uses [ts-opaque-units](https://www.npmjs.com/package/ts-opaque-units) which implements `Opaque` function with unique symbol. For instance, `Days` is defined as:

```typescript title="Days example"
import { Opaque } from "../../internal/types/Opaque";

export type Days = Opaque<number, "days">;
```

## Resources

1. [Nominal typing techniques in TypeScript](https://michalzalecki.com/nominal-typing-in-typescript/)

1. [Implementing an opaque type in typescript](https://evertpot.com/opaque-ts-types/)

1. [Support some non-structural (nominal) type matching #202](https://github.com/Microsoft/TypeScript/issues/202)

1. [Functional Typescript: Opaque Types](https://denistakeda.github.io/articles/004_typescript_opaque.html)
