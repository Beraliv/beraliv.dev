---
title: CamelCase
date: "2022-02-25"
description: Given a string in any case, returns a string in camel case
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - camelcase
image: /camel-case/image.png
---

```typescript title="Example of CamelCase use"
type CamelCase<T> = any; // implementation

type cases = [
  Expect<Equal<CamelCase<"ONEWORD">, "oneword">>,
  Expect<Equal<CamelCase<"two_words">, "twoWords">>,
  Expect<Equal<CamelCase<"TwoWords">, "twoWords">>,
  Expect<Equal<CamelCase<"HERE-THREE-WORDS">, "hereThreeWords">>
];
```

Today we discuss two connected type challenges:

- [CamelCase (medium)](https://github.com/type-challenges/type-challenges/blob/master/questions/610-medium-camelcase/README.md)
- [CamelCase (hard)](https://github.com/type-challenges/type-challenges/blob/master/questions/114-hard-camelcase/README.md)

Let's have a look ⤵️

## Scope of solution

Even though the challenges are similar, there are a few differences between them. Let's check test cases and define supported cases (from which we can transform a string) in a table:

| CamelCase     | medium | hard |
| ------------- | ------ | ---- |
| empty string  | ✅     | ✅   |
| oneword       | ❌     | ✅   |
| snake_case    | ❌     | ✅   |
| CONSTANT_CASE | ❌     | ✅   |
| kebab-case    | ✅     | ❌   |
| COBOL-CASE    | ❌     | ❌   |
| camelCase     | ❌     | ❌   |
| PascalCase    | ❌     | ❌   |

Playgrounds – https://tsplay.dev/WvV9AW & https://tsplay.dev/Wyb06w respectively.

Let's break a typical format and define our own test cases which will cover our own solution.

## Test cases

Let's include all cases we mentioned in a table:

```typescript title="All possible cases"
type cases = [
  // empty string
  Expect<Equal<CamelCase<"">, "">>,
  // oneword
  Expect<Equal<CamelCase<"oneword">, "oneword">>,
  Expect<Equal<CamelCase<"ONEWORD">, "oneword">>,
  // snake_case
  Expect<Equal<CamelCase<"two_words">, "twoWords">>,
  Expect<Equal<CamelCase<"here_three_words">, "hereThreeWords">>,
  // CONSTANT_CASE
  Expect<Equal<CamelCase<"TWO_WORDS">, "twoWords">>,
  Expect<Equal<CamelCase<"HERE_THREE_WORDS">, "hereThreeWords">>,
  // kebab-case
  Expect<Equal<CamelCase<"two-words">, "twoWords">>,
  Expect<Equal<CamelCase<"here-three-words">, "hereThreeWords">>,
  // COBOL-CASE
  Expect<Equal<CamelCase<"TWO-WORDS">, "twoWords">>,
  Expect<Equal<CamelCase<"HERE-THREE-WORDS">, "hereThreeWords">>,
  // camelCase
  Expect<Equal<CamelCase<"twoWords">, "twoWords">>,
  Expect<Equal<CamelCase<"hereThreeWords">, "hereThreeWords">>,
  // PascalCase
  Expect<Equal<CamelCase<"TwoWords">, "twoWords">>,
  Expect<Equal<CamelCase<"HereThreeWords">, "hereThreeWords">>
];
```

Now, let's think if we can add something else here.

If we check CamelCase (medium) test cases once again https://tsplay.dev/WvV9AW, there are a lot of cases where a separator `-` is in all possible positions.

Let's also diversify our tests:

```typescript title="Separator in different positions"
type cases = [
  // separator at the start and the end
  Expect<Equal<CamelCase<"two-words-">, "twoWords">>,
  Expect<Equal<CamelCase<"-two-words">, "twoWords">>,
  Expect<Equal<CamelCase<"-two-words-">, "twoWords">>,
  // repeated separator
  Expect<Equal<CamelCase<"two----words">, "twoWords">>,
  Expect<Equal<CamelCase<"----two----words">, "twoWords">>,
  Expect<Equal<CamelCase<"-----two----words----">, "twoWords">>,
  // mixed separators
  Expect<Equal<CamelCase<"two-_--__words">, "twoWords">>,
  Expect<Equal<CamelCase<"two-_--__words-_--__">, "twoWords">>,
  Expect<Equal<CamelCase<"-_--__two-_--__words">, "twoWords">>,
  Expect<Equal<CamelCase<"-_--__two-_--__words-_--__">, "twoWords">>
];
```

Also don't forget that in case of `string` we should return `string` as well. Other types are not allowed:

```typescript title="string and other types"
type cases = [
  // string
  Expect<Equal<CamelCase<string>, string>>,
  // other types
  // @ts-expect-error
  CamelCase<number>,
  // @ts-expect-error
  CamelCase<symbol>
];
```

I combined all of them together in Playground – https://tsplay.dev/NabBEm

Looks neat 👀 Let's solve it now ⬇️

## Plan

Now we need to think how in general we want to solve this challenge:

- Given a string, we split it into words
- Given words, we format it specifically for camelCase
- Given formatted words, we join it and get correct result
- Support all cases we came up with

## Split string into words

### Words

To be able to understand how to format a string, we need to extract words from it. Let's define a type `Words`. Given a string, it returns a tuple of words:

```typescript title="Extracting words"
type Separator = "_" | "-";

type Words<S> = S extends `${infer Word}${Separator}${infer Rest}`
  ? [Word, ...Words<Rest>]
  : [];
```

Checking solution in Playground – https://tsplay.dev/N7P9Dm, we still see that we have problems with separators in different places.

### Separators in different places

For this particular one, we need to filter words which are empty:

```typescript title="Filtering empty words"
type Separator = "_" | "-";

type FilterEmptyWord<Word, T extends unknown[]> = Word extends ""
  ? T
  : [Word, ...T];

type Words<S> = S extends `${infer Word}${Separator}${infer Rest}`
  ? FilterEmptyWord<Word, Words<Rest>>
  : FilterEmptyWord<S, []>;
```

We added `FilterEmptyWord` which checks if a string is empty. Based on it, it returns a tuple with a word or not. We used it in `Words`.

A link to a Playground – https://tsplay.dev/NrKklm

### Mixed separators

I know it's a rare case, but let's try to understand why it's broken.

> Feel free to skip this heading and move on to the next one if you're not interested in this part.

Having a look at any of them, we see that unions are involved in these examples:

```typescript title="Current result for mixed separators"
type MixedSeparator = Words<"two-_--__words">;
//    ^? ["two-", "words"] | ["two-", "-", "words"] | ["two-", "--", "words"] | ["two-", "--", "-", "words"] | ["two-", "_", "words"] | ["two-", "_", "-", "words"] | ["two-", "_", "--", "words"] | ... 8 more ... | [...]
```

So we see the problem because of the conditional type `` S extends `${infer Word}${Separator}${infer Rest}` `` which distributes string into several union elements because we have alternatives how to split a string for different separators.

Let me demonstrate it here:

```typescript title="Reproduce the problem with mixed separators"
type Separator = "_" | "-";

type Test<S> = S extends `${infer Word}${Separator}${infer Rest}`
  ? [Word, Rest]
  : [];

type Step1 = Test<"a-_b">;
//   ^? ["a-" | "a", "b" | "_b"]
```

Playground like for it – https://tsplay.dev/m0okON 🐞

One possible way to solve it is to split it into several conditional types, e.g.:

```typescript title="Split into several conditional types"
type FilterEmptyWord<Word, T extends unknown[]> = Word extends ""
  ? T
  : [Word, ...T];

type Words<S> = S extends `${infer Word}_${infer Rest}`
  ? Word extends `${string}-`
    ? S extends `${infer Word}-${infer Rest}`
      ? FilterEmptyWord<Word, Words<Rest>>
      : FilterEmptyWord<S, []>
    : FilterEmptyWord<Word, Words<Rest>>
  : S extends `${infer Word}-${infer Rest}`
  ? FilterEmptyWord<Word, Words<Rest>>
  : FilterEmptyWord<S, []>;
```

It looks complicated – https://tsplay.dev/N9yooN, but what we do:

1. Check where we have underscore
2. If we have hyphen earlier, split by hyphen
3. If we don't have hyphen earlier, split by underscore
4. Otherwise we have a oneword string

> I don't like this approach because if we have another separator, we need to adapt the algorithm here, which takes time

Another way is to prepare a string before using `Words`:

```typescript title="Validate mixed separators"
type Separator = "_" | "-";

type FilterEmptyWord<Word, T extends unknown[]> = Word extends ""
  ? T
  : [Word, ...T];

type SimplifiedWords<S> = S extends `${infer Word}${Separator}${infer Rest}`
  ? FilterEmptyWord<Word, SimplifiedWords<Rest>>
  : FilterEmptyWord<S, []>;

type IsRepeatedSeparator<Ch, Validated> = Ch extends Separator
  ? Validated extends `${string}${Separator}`
    ? true
    : false
  : false;

type RemoveRepeatedSeparator<
  NotValidated,
  Validated = ""
> = NotValidated extends `${infer Ch}${infer Rest}`
  ? IsRepeatedSeparator<Ch, Validated> extends true
    ? RemoveRepeatedSeparator<Rest, Validated>
    : RemoveRepeatedSeparator<Rest, `${Validated & string}${Ch}`>
  : Validated;

type Words<S> = SimplifiedWords<RemoveRepeatedSeparator<S>>;
```

It looks longer – https://tsplay.dev/w669rw, but we got rid of repetition:

1. We renamed our old solution `Words` into `SimplifiedWords`
2. Before calling it, we use `RemoveRepeatedSeparator` which removes separator, if there was another one before it with help of `IsRepeatedSeparator`

> If we have another separator in the future, we only need to update `Separator`, which is useful

Let's stop on it and will fix camelCase and PascalCase.

### camelCase and PascalCase

As you probably already found out, we cannot identify camel and pascal cases now, because we only check it we have a separator.

For these 2 particular cases, we understand that we have a start of a next word when case is switched from lower to upper.

## Join correctly formatted words
