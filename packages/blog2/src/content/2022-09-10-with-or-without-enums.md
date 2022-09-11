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

Only string enums act like opaque types. It means that we cannot assign string literal values.

```typescript title="You cannot use string literal values as string enums value"
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

### Numeric enums are NOT safe

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

TypeScript is supposed to be JavaScript, but with static type features added

If we remove all of the types from TypeScript code, what's left should be valid JavaScript code. The formal word used in the TypeScript documentation is "type-level extension":

> Most TypeScript features are type-level extensions to JavaScript, and they don't affect the code's runtime behaviour.

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

### Const enum + preserveConstEnums option === enum + potential surprising bugs

Some projects use const enums as normal enums by enabling [preserveConstEnums](https://www.typescriptlang.org/tsconfig#preserveConstEnums).

See [bundle-size impact for const enums with enabled preserveConstEnums](#bundle-size-impact)

### Ambient const enum pitfalls

Ambient enums are rarely used in a codebase. If you DO use them, you probably already know that inlining enum values come with subtle implication, here are some of them:

1. They are incompatible with `isolatedModules`

1. If you export const enums and provide them as an API to other libraries, it can lead to surprising bugs, e.g. [Const enums in the TS Compiler API can make depending on typescript difficult](https://github.com/microsoft/TypeScript/issues/5219) 🐞

1. Unresolvable imports for const enums used as values cause errors at runtime with `importsNotUsedAsValues: "preserve"`

TypeScript advises to:

> A. Do not use const enums at all. You can easily ban const enums with the help of a linter. Obviously this avoids any issues with const enums, but prevents your project from inlining its own enums. Unlike inlining enums from other projects, inlining a project’s own enums is not problematic and has performance implications.

> B. Do not publish ambient const enums, by deconstifying them with the help of `preserveConstEnums`. This is the approach taken internally by the TypeScript project itself. `preserveConstEnums` emits the same JavaScript for const enums as plain enums. You can then safely strip the const modifier from .d.ts files in a build step.

## Choose your solution

Let's sum up what we just discussed in a table:

| Approach                                               | Declaration                                     | Strict<sup>1</sup> | Refactoring<sup>2</sup> | Opaque-like<sup>3</sup> | [Bundle-size impact](#bundle-size-impact)<sup>4</sup> |
| :----------------------------------------------------- | :---------------------------------------------- | :----------------: | :---------------------: | :---------------------: | :---------------------------------------------------: |
| [Numeric enums](https://tsplay.dev/wORypW)             | `enum Answer { No = 0, Yes = 1 }`               |         ❌         |           ✅            |           ❌            |                           3                           |
| [String enums](https://tsplay.dev/w1peKW)              | `enum Answer { No = 'No', Yes = 'Yes' }`        |         ✅         |           ✅            |           ✅            |                           2                           |
| [Heterogeneous enums](https://tsplay.dev/WKRYzm)       | `enum Answer { No = 0, Yes = 'Yes' }`           |         ❌         |           ✅            |           ❌            |                           3                           |
| [Numeric const enums](https://tsplay.dev/mpLrXm)       | `const enum Answer { No = 0, Yes = 1 }`         |         ❌         |           ✅            |           ❌            |                           1                           |
| [String const enums](https://tsplay.dev/m3Xg2W)        | `const enum Answer { No = 'No', Yes = 'Yes' }`  |         ✅         |           ✅            |           ✅            |                           1                           |
| [Heterogeneous const enums](https://tsplay.dev/wXjMDm) | `const enum Answer { No = 0, Yes = 'Yes' }`     |         ❌         |           ✅            |           ❌            |                           1                           |
| [Object + as const](https://tsplay.dev/mLyeaW)         | `const ANSWER = { No: 0, Yes: "Yes" } as const` |         ✅         |           ✅            |           ❌            |                           2                           |
| [Union types](https://tsplay.dev/wORyEW)               | `type Answer = 0 \| 'Yes'`                      |         ✅         |           ❌            |           ❌            |                           0                           |

1. All numeric enums (whether normal, heterogeneous, const or ambient) aren't strict as you can assign any number to the variable of its type.

1. Because union type is type-only feature, it lacks refactoring. It means that if you need to update value in a codebase, you will require to run type check over your codebase and fix all type errors. Enums and objects encapsulate it by saving the mapping in its structure.

1. We treat all string enums as opaque-like types. It means that only their values can be assigned to the variable of its type.

1. Only union is a type-only feature, meaning there's no JS code added. Const enums leave only values. String enums leave the whole object structure. Numeric enums (normal and heterogeneous) leave mirror object structure. See the comparison below.

## How to get rid of enums

If you decided to get rid of enums, here are my suggestions.

### Numeric enum => object + as const + Values

We can use `as const` and expose JS objects the same way we do it with numeric enums but in a safe way.

It's also included in [TypeScript Docs | Enums - Objects vs. Enums](https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums)

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

It will definitely increase your bundle size. But again, it will keep you code safe by eliminating assignment of any number.

### Bundle size impact

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

## Links 🔗

1. [Difference between `const enum` and `enum` | Stackoverflow](https://stackoverflow.com/questions/28818849/how-do-the-different-enum-variants-work-in-typescript)

1. [TS features to avoid | Execute Program](https://www.executeprogram.com/blog/typescript-features-to-avoid)

1. [Numeric enums | TypeScript Docs](https://www.typescriptlang.org/docs/handbook/enums.html#numeric-enums)

1. [String enums | TypeScript Docs](https://www.typescriptlang.org/docs/handbook/enums.html#string-enums)

1. [Heterogeneous enums | TypeScript Docs](https://www.typescriptlang.org/docs/handbook/enums.html#heterogeneous-enums)

1. [Const enums | TypeScript Docs](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums)

1. [Const enum pitfalls | TypeScript Docs](https://www.typescriptlang.org/docs/handbook/enums.html#const-enum-pitfalls)

1. [Do you need ambient const enums or would a non-const enum work | TypeScript Issue comment](https://github.com/microsoft/TypeScript/issues/40344#issuecomment-956368612)
