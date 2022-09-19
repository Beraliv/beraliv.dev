---
title: With or without enums in TypeScript
date: "2022-09-10"
description: Pros and cons of enums in TypeScript
labels:
  - typescript
keywords:
  - typescript
  - enums
image: /with-or-without-enums/image.png
---

## What

You're uncertain whether you need to use enums or not.

Here are some points that make it easy to come to a conclusion.

## Why use enums

### No lookup objects for const enums

Values of const enums are inlined and lookup objects aren't emitted to JavaScript.

```typescript title="Const enums"
// typescript
const enum Answer {
  No = "No",
  Yes = "Yes",
}

const yes = Answer.Yes;
const no = Answer.No;

// javascript
const yes = "Yes"; /* Answer.Yes */
const no = "No"; /* Answer.No */
```

🏝 Playground – https://tsplay.dev/m3Xg2W

See [the difference in bundle size impact for enums and const enums](#bundle-size-impact)

### Refactoring

Given existing enum `HttpMethod`, when you want to replace existing value `"POST"` with e.g. `"post"`, you change enum's value and you're done!

As you use references in your codebase, `HttpMethod.Post` persists but only value is updated.

```typescript title="Enum usage when we need to change value 'POST'"
enum HttpMethod {
  Get = "GET",
  Post = "POST",
}

const method: HttpMethod = HttpMethod.Post;
//    ^? 'POST'
```

This argument isn't very strong, because:

1. Values are rarely changed
2. It's not only possible solution (union types, object + `as const`)

### Opaque-like type

If you're not familiar with [Opaque types](/2021-05-07-opaque-type-in-typescript), it's a way to declare types of the same structure, which are not assignable to each other.

The perfect example can be 2 currencies (e.g. USD and EUR). You cannot simply put dollars into euro account without taking into account currency exchange rate:

```typescript title="Opaque type example"
declare const brand: unique symbol;

type Brand<K, T> = K & { readonly [brand]: T };

type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

let euroAccount = 0 as EUR;
let dollarAccount = 50 as USD;

// Error: Type '"USD"' is not assignable to type '"EUR"'.
euroAccount = dollarAccount;
```

String enums act like opaque types. It means that we can only assign values of this enum, but not string literals.

```typescript title="You cannot use string literals as string enum value"
const enum VolumeStatus {
  AUDIBLE = "AUDIBLE",
  MUTED = "MUTED",
  FORCE_MUTED = "FORCE_MUTED",
}

class Volume {
  public status: VolumeStatus = VolumeStatus.AUDIBLE;
}

const volume = new Volume();
volume.status = VolumeStatus.AUDIBLE;

// Error: Type '"AUDIBLE"' is not assignable to type 'VolumeStatus'.
volume.status = "AUDIBLE";
```

🏝 Playground – https://tsplay.dev/W4xY4W

## Why not use enums

### Numeric enums are NOT type-safe

Given numeric enum and any variable of its type, TypeScript allow you to assign any number to it.

```typescript title="TypeScript allow to assign any number to variable of numeric enum type"
enum Output {
  Error = 1,
  Warning = 2,
  Log = 3,
}

interface Options {
  output?: Output;
}

const options: Options = {};
options.output = Output.Error;
options.output = Output.Warning;
options.output = Output.Log;

// oops, but still safe
options.output = 3;

// !!! OOPS !!! unsafe 😅
options.output = 4;
options.output = 5;
```

🏝 Playground – https://tsplay.dev/mx3rBN

### Enum is NOT just a type feature added

TypeScript is supposed to be JavaScript, but with static type features added.

If we remove all of the types from TypeScript code, what's left should be valid JavaScript code.

The formal word used in the TypeScript documentation is "type-level extension":

> Most TypeScript features are type-level extensions to JavaScript, and they don't affect the code's runtime behaviour.

Given function `add` in TypeScript:

```typescript title="TypeScript example"
function add(x: number, y: number): number {
  return x + y;
}

add(1, 2); // Evaluates to 3
```

By removing types, it becomes valid JS code:

```javascript title="Same example but in JavaScript"
function add(x, y) {
  return x + y;
}

add(1, 2); // Evaluates to 3
```

Unfortunately, enums break this rule (in comparison to classes which only add type information on top of existing JS code) for now.

You can simply try to execute this code in the browser and you will get a syntax error:

```javascript title="Enum is reserved keyword but cannot be used now"
// Uncaught SyntaxError: Unexpected reserved word
enum Answer { No = 0, Yes = 1 }
```

At the moment of writing this blog post, [proposal for ECMAScript enums](https://github.com/rbuckton/proposal-enum) was on stage 0.

### Const enum + preserveConstEnums option === enum + potential pitfalls

When you use const enums, their values are inlined and no lookup object is emitted to JavaScript.

However, when you enable [preserveConstEnums](https://www.typescriptlang.org/tsconfig#preserveConstEnums) option in `tsconfig.json`, lookup object is emitted.

```typescript title="Const enums with enabled preserveConstEnums"
// typescript
const enum Answer {
  No = 0,
  Yes = "Yes",
}

const yes = Answer.Yes;
const no = Answer.No;

// javascript
var Answer;
(function (Answer) {
  Answer[(Answer["No"] = 0)] = "No";
  Answer["Yes"] = "Yes";
})(Answer || (Answer = {}));

const yes = "Yes"; /* Answer.Yes */
const no = 0; /* Answer.No */
```

In addition, when you publish const enums or consume them from declaration files, you may face [ambient const enums pitfalls](#ambient-const-enum-pitfalls).

## Choose your solution

Let's sum up what we just discussed in a table:

| Approach                                               | Declaration                                     | No lookup objects<sup>1</sup> | Type-safe<sup>2</sup> | Refactoring<sup>3</sup> | Optimal<sup>4</sup> | Type-only<sup>5</sup> | Opaque-like<sup>6</sup> |
| :----------------------------------------------------- | :---------------------------------------------- | :---------------------------: | :-------------------: | :---------------------: | :-----------------: | :-------------------: | :---------------------: |
| [Numeric enums](https://tsplay.dev/wORypW)             | `enum Answer { No = 0, Yes = 1 }`               |              ❌               |          ❌           |           ✅            |         ❌          |          ❌           |           ❌            |
| [String enums](https://tsplay.dev/w1peKW)              | `enum Answer { No = 'No', Yes = 'Yes' }`        |              ❌               |          ✅           |           ✅            |         ❌          |          ❌           |           ✅            |
| [Heterogeneous enums](https://tsplay.dev/WKRYzm)       | `enum Answer { No = 0, Yes = 'Yes' }`           |              ❌               |          ❌           |           ✅            |         ❌          |          ❌           |           ❌            |
| [Numeric const enums](https://tsplay.dev/mpLrXm)       | `const enum Answer { No = 0, Yes = 1 }`         |              ✅               |          ❌           |           ✅            |         ✅          |          ❌           |           ❌            |
| [String const enums](https://tsplay.dev/m3Xg2W)        | `const enum Answer { No = 'No', Yes = 'Yes' }`  |              ✅               |          ✅           |           ✅            |         ❌          |          ❌           |           ✅            |
| [Heterogeneous const enums](https://tsplay.dev/wXjMDm) | `const enum Answer { No = 0, Yes = 'Yes' }`     |              ✅               |          ❌           |           ✅            |         ❌          |          ❌           |           ❌            |
| [Object + as const](https://tsplay.dev/mLyeaW)         | `const ANSWER = { No: 0, Yes: "Yes" } as const` |              ❌               |          ✅           |           ✅            |         ✅          |          ❌           |           ❌            |
| [Union types](https://tsplay.dev/wORyEW)               | `type Answer = 0 \| 'Yes'`                      |              ✅               |          ✅           |           ❌            |         ✅          |          ✅           |           ❌            |

1. Union types are type-only feature so no JS code is emitted. Const enums inline their values and don't emit lookup objects. Other solutions, i.e. object + as const and normal enums, emit lookup objects.

1. All numeric enums (whether normal, heterogeneous or const) aren't type-safe as you can assign any number to the variable of its type.

1. Only union type lacks refactoring. It means that if you need to update value in a codebase, you will require to run type check over your codebase and fix all type errors. Enums and objects encapsulate it by saving lookup object.

1. To be able to compare approaches between each other, please have a look at [Bundle-size impact](#bundle-size-impact).

1. Only union types are type-only feature. Other solutions emit lookup objects or aren't just a type feature added.

1. We treat all string enums as opaque-like types. It means that only their values can be assigned to the variable of its type.

## How to get rid of enums

If you decided to get rid of enums, here are my suggestions.

### Numeric enum => object + as const + Values

We can use `as const` and expose JS objects the same way we do it with numeric enums but in a safe way.

It's also included in [Enums - Objects vs. Enums | TypeScript Docs](https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums)

Before:

```typescript title="Example with numeric enums"
enum Output {
  Error = 1,
  Warning = 2,
  Log = 3,
}

interface Options {
  output?: Output;
}

const options: Options = {};
options.output = Output.Error;
options.output = Output.Warning;
options.output = Output.Log;

// oops, but still safe
options.output = 3;

// !!! OOPS !!! unsafe 😅
options.output = 4;
options.output = 5;
```

After:

```typescript title="Same example with object, as const and Values"
const OUTPUT = {
  Error: 1,
  Warning: 2,
  Log: 3,
} as const;

type Values<Type> = Type[keyof Type];

type TOutput = Values<typeof OUTPUT>;

interface Options2 {
  output?: TOutput;
}

const options2: Options2 = {};
options2.output = OUTPUT.Error;
options2.output = OUTPUT.Warning;
options2.output = OUTPUT.Log;

// valid and safe
options2.output = 3;

// invalid
options2.output = 4;
options2.output = 5;
```

🏝 Together in Playground – https://tsplay.dev/Nr4r3W

### String const enum => union type + inlined string literals

Values within string const enums are usually self-explanatory, so we can use union types without losing readability.

Bundle size will be the same as same string literals are inlined when you use const enum.

Before:

```typescript title="Example with string const enum"
const enum OutputType {
  LOG = "LOG",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

type OutputEvent =
  | { type: OutputType.LOG; data: Record<string, unknown> }
  | { type: OutputType.WARNING; message: string }
  | { type: OutputType.ERROR; error: Error };

const output = (event: OutputEvent): void => {
  console.log(event);
};

output({ type: OutputType.LOG, data: {} });
output({ type: OutputType.WARNING, message: "Reload app" });
output({ type: OutputType.ERROR, error: new Error("Unexpected error") });
```

After:

```typescript title="Same example with string literal types"
type OutputEvent2 =
  | { type: "LOG"; data: Record<string, unknown> }
  | { type: "WARNING"; message: string }
  | { type: "ERROR"; error: Error };

const output2 = (event: OutputEvent2): void => {
  console.log(event);
};

output2({ type: "LOG", data: {} });
output2({ type: "WARNING", message: "Reload app" });
output2({ type: "ERROR", error: new Error("Unexpected error") });
```

If you need to keep values (i.e. `"LOG" | "WARNING" | "ERROR"`) in a separate type, like `OutputType` previously in enum, you still can do it:

```typescript title="Inferring type from OutputEvent2"
type TOutput = OutputEvent2["type"];
//   ^? "LOG" | "WARNING" | "ERROR"
```

🏝 Together in Playground – https://tsplay.dev/mM1klm

### Numeric const enums => it depends

Values within numeric const enums are usually unreadable (e.g. `0`, `1`).

When a meaning doesn't make much sense, you can still use union type:

```typescript title="Union types"
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
```

Otherwise, follow the approach with [Numeric enum => object + as const + Values](#numeric-enum-=>-object-+-as-const-+-values).

It will definitely increase your bundle size. But again, it will keep you code type-safe by eliminating assignment of any number.

To compare the bundle size, please have a look at [Bundle size impact](#bundle-size-impact)

## What about ambient enums

Apart from enums and const enums, there are ambient enums.

It's a way to describe the shape of existing enum types, e.g.:

```typescript title="Declaration of ambient enum"
declare enum Colour {
  Red = "red",
  Green = "green",
  Blue = "blue",
}
```

Usually you can find them in declaration files, e.g. [@prisma/client](https://github.com/prisma/prisma/blob/main/packages/engine-core/src/common/types/Transaction.ts#L1-L7)

```typescript title="@prisma/client/runtime/index.d.ts"
declare enum IsolationLevel {
  ReadUncommitted = "ReadUncommitted",
  ReadCommitted = "ReadCommitted",
  RepeatableRead = "RepeatableRead",
  Snapshot = "Snapshot",
  Serializable = "Serializable",
}
```

It's still very unlikely that you use ambient enums directly in your codebase. I would recommend to avoid using them.

### Ambient const enum pitfalls

If you DO use them, you probably already know that inlining enum values come with subtle implication, here are some of them:

1. They are incompatible with [isolatedModules](https://www.typescriptlang.org/tsconfig#isolatedModules) option in `tsconfig.json`

1. If you export const enums and provide them as an API to other libraries, it can lead to surprising bugs, e.g. [Const enums in the TS Compiler API can make depending on typescript difficult](https://github.com/microsoft/TypeScript/issues/5219) 🐞

1. Unresolvable imports for const enums used as values cause errors at runtime with [importsNotUsedAsValues](https://www.typescriptlang.org/tsconfig#importsNotUsedAsValues) option in `tsconfig.json` set to `"preserve"`

TypeScript advises to:

> A. Do not use const enums at all. You can easily ban const enums with the help of a linter. Obviously this avoids any issues with const enums, but prevents your project from inlining its own enums. Unlike inlining enums from other projects, inlining a project’s own enums is not problematic and has performance implications.

> B. Do not publish ambient const enums, by deconstifying them with the help of `preserveConstEnums`. This is the approach taken internally by the TypeScript project itself. `preserveConstEnums` emits the same JavaScript for const enums as plain enums. You can then safely strip the const modifier from .d.ts files in a build step.

Read more about [const enum pitfalls](https://www.typescriptlang.org/docs/handbook/enums.html#const-enum-pitfalls).

## Bundle size impact

Let's first have a look at examples (I left only examples with heterogeneous values):

```typescript title="Enums"
// typescript
enum Answer {
  No = 0,
  Yes = "Yes",
}

const yes = Answer.Yes;
const no = Answer.No;

// javascript
var Answer;
(function (Answer) {
  Answer[(Answer["No"] = 0)] = "No";
  Answer["Yes"] = "Yes";
})(Answer || (Answer = {}));

const yes = Answer.Yes;
const no = Answer.No;
```

```typescript title="Const enums"
// typescript
const enum Answer {
  No = 0,
  Yes = "Yes",
}

const yes = Answer.Yes;
const no = Answer.No;

// javascript
const yes = "Yes"; /* Answer.Yes */
const no = 0; /* Answer.No */
```

```typescript title="Const enums with enabled preserveConstEnums"
// typescript
const enum Answer {
  No = 0,
  Yes = "Yes",
}

const yes = Answer.Yes;
const no = Answer.No;

// javascript
var Answer;
(function (Answer) {
  Answer[(Answer["No"] = 0)] = "No";
  Answer["Yes"] = "Yes";
})(Answer || (Answer = {}));

const yes = "Yes"; /* Answer.Yes */
const no = 0; /* Answer.No */
```

```typescript title="Ambient enums"
// typescript
declare enum Answer {
  No = 0,
  Yes = "Yes",
}

const yes = Answer.Yes;
const no = Answer.No;

// javascript
const yes = Answer.Yes;
const no = Answer.No;
```

```typescript title="Ambient const enums"
// typescript
declare const enum Answer {
  No = 0,
  Yes = "Yes",
}

const yes = Answer.Yes;
const no = Answer.No;

// javascript
const yes = "Yes"; /* Answer.Yes */
const no = 0; /* Answer.No */
```

```typescript title="Object + as const"
// typescript
const ANSWER = {
  No: 0,
  Yes: "Yes",
} as const;

const yes = ANSWER.Yes;
const no = ANSWER.No;

// javascript
const ANSWER = {
  No: 0,
  Yes: "Yes",
};

const yes = ANSWER.Yes;
const no = ANSWER.No;
```

```typescript title="Union types"
// typescript
type Answer = 0 | "Yes";

const yes: Answer = "Yes";
const no: Answer = 0;

// javascript
const yes = "Yes";
const no = 0;
```

Given 3 different types of values (numeric, string and heterogeneous), let's compare the bundle size (in bytes) of different solutions:

| Approach             | Enum | Const enum | Const enum + `preserveConstEnums` | Object + `as const` | Union type |
| :------------------- | :--- | :--------- | :-------------------------------- | :------------------ | :--------- |
| Numeric values       | 126  | 44         | 112                               | 80                  | 44         |
| Heterogeneous values | 124  | 48         | 117                               | 83                  | 48         |
| String values        | 116  | 49         | 108                               | 83                  | 49         |

When you need to keep a lookup object (enum, const enum + `preserveConstEnums` and object + `as const`), the optimal solution is always an object + `as const`.

When you don't need a lookup object (const enum and union type), both const enum and union type are optimal.

If you're interested in comparison itself, please go to Github repo [with-or-without-enums-bundle-size-impact](https://github.com/Beraliv/with-or-without-enums-bundle-size-impact) 🔗

## Shout out

This article couldn't be that good without the help of:

- [AleksandrSI](https://github.com/AleksandrSl)
- [Joe Previte](https://github.com/jsjoeio)
- [bautistaaa](https://github.com/bautistaaa)
- [Bishwajit Jha](https://github.com/ajitjha393)

Thank you mates, your feedback was really helpful! 👏

## Links 🔗

1. [How do the different enum variants work in TypeScript? | Stack Overflow](https://stackoverflow.com/questions/28818849/how-do-the-different-enum-variants-work-in-typescript)

1. [TS features to avoid | Execute Program](https://www.executeprogram.com/blog/typescript-features-to-avoid)

1. [Numeric enums | TypeScript Docs](https://www.typescriptlang.org/docs/handbook/enums.html#numeric-enums)

1. [String enums | TypeScript Docs](https://www.typescriptlang.org/docs/handbook/enums.html#string-enums)

1. [Heterogeneous enums | TypeScript Docs](https://www.typescriptlang.org/docs/handbook/enums.html#heterogeneous-enums)

1. [Const enums | TypeScript Docs](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums)

1. [Const enum pitfalls | TypeScript Docs](https://www.typescriptlang.org/docs/handbook/enums.html#const-enum-pitfalls)

1. [Ambient enums | TypeScript Docs](https://www.typescriptlang.org/docs/handbook/enums.html#ambient-enums)

1. [Do you need ambient const enums or would a non-const enum work | TypeScript Issue comment](https://github.com/microsoft/TypeScript/issues/40344#issuecomment-956368612)

1. [JavaScript reserved keywords](https://www.w3schools.com/js/js_reserved.asp)

1. [Proposal for ECMAScript enums | GitHub](https://github.com/rbuckton/proposal-enum)

1. [with-or-without-enums-bundle-size-impact | GitHub](https://github.com/Beraliv/with-or-without-enums-bundle-size-impact)
