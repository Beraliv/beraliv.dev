---
title: CamelCase
date: "2022-07-10"
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

Today we discuss [CamelCase](https://github.com/type-challenges/type-challenges/blob/master/questions/00114-hard-camelcase/README.md).

Let's have a look ⤵️

## Scope of solution

Previously there was [another medium challenge](https://github.com/type-challenges/type-challenges/tree/eaaee50775eaac7519751d446a96723c55d6b081/questions/00610-medium-camelcase) which [was removed](https://github.com/type-challenges/type-challenges/commit/ff5bff3b0d009a7d4f9033aefde0159b95ebb463). The quick difference between them in a table:

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

Playgrounds for 2 solutions – https://tsplay.dev/WvV9AW & https://tsplay.dev/Wyb06w.

Let's solve this type challenge differently: to define wider test cases and come up with the solution for them.

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

If we check CamelCase (medium) test cases once again https://tsplay.dev/WvV9AW, there are a lot of tests where a separator `-` is in all possible positions, let's add them too:

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
  // @ts-expect-error: Expected `string` but got `number` instead
  CamelCase<number>,
  // @ts-expect-error: Expected `string` but got `symbol` instead
  CamelCase<symbol>
];
```

I combined all of them together in Playground – https://tsplay.dev/NabBEm

Looks neat 👀 Let's solve it now ⬇️

## Steps to solve it

Now we need to think how in general we want to solve this challenge. Let's break it into steps using [a Gherkin syntax](https://cucumber.io/docs/gherkin/reference/):

- [Split into words](#split-into-words) – GIVEN a string, THEN it is split into words
- [Make it camel case](#make-it-camel-case) – GIVEN words, THEN first word becomes lowercase AND other words become Uppercase
- [Formatted words are joined together](#formatted-words-are-joined-together) – GIVEN formatted words, THEN they are joined together
- GIVEN different cases, THEN result is in camel case

## Split into words

### Words

To be able to understand how to format a string, we need to extract words from it. Let's define a type `Words`. Given a string, it returns a tuple with words:

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

> If you want to dive into details, please continue reading. Otherwise, I would suggest to skip it as it's not a common case and only helpful in educational purposes.

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

Same example in Playground – https://tsplay.dev/m0okON 🐞

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

It looks complicated – https://tsplay.dev/N9yooN, but what we do here:

1. Split a string by hyphen

GIVEN a string
WHEN it has underscore `_`
AND previous character is `-`
THEN split a string by hyphen `-`

2. Split a string by underscore

GIVEN a string has underscore `_`
WHEN previous character is NOT a hyphen
THEN split a string by underscore `_`

3. String is oneword

GIVEN a string
WHEN it has neither underscore `_` nor hyphen `-`
THEN it is NOT split

> I don't like this approach because if we have another separator, we need to adapt the algorithm here, which takes time

Another way is to prepare a string before using `Words`:

```typescript title="Validate mixed separators"
type Separator = "_" | "-";

type FilterEmptyWord<Word, T extends unknown[]> = Word extends ""
  ? T
  : [Word, ...T];

type SplitBySeparator<S> = S extends `${infer Word}${Separator}${infer Rest}`
  ? FilterEmptyWord<Word, SplitBySeparator<Rest>>
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

type Words<S> = SplitBySeparator<RemoveRepeatedSeparator<S>>;
```

Previous solution was in 13 lines, and this one is twice as much, but we got rid of the potential repetition which is good:

1. Previous solution `Words` was renamed to `SplitBySeparator`
2. `RemoveRepeatedSeparator` is used to validate a string and to remove repeated separators
3. `IsRepeatedSeparator` checks whether separator is repeated or not

Playground – https://tsplay.dev/mZ4RPw

> If we have another separator in the future, we only need to update `Separator`, which is useful

Let's stop here and move on to camel and Pascal cases.

### Pascal and camel cases

At this point we cannot identify camel and pascal cases, because there is no separator between words. We can only spot it by capital letters in a word.

To be able to distinguish whether we have a separator or not, I came up with a type `WhichApproach`:

```typescript title="Split solution into 2 different approaches"
type WhichApproach<S> = S extends `${string}${Separator}${string}`
  ? "separatorBased"
  : "capitalBased";

type Words<S> = {
  separatorBased: SplitBySeparator<RemoveRepeatedSeparator<S>>;
  capitalBased: [S];
}[WhichApproach<S>];
```

https://tsplay.dev/N71DnW 🏝

As oneword strings are now capital letter based, I used `capitalBased: [S]` to not break it.

As a next step, let's create `SplitByUppercase` and `IsUppercase` for capital based approach:

```typescript title="Extracting words for camel and pascal cases"
type IsUppercase<Ch extends string> = [Ch] extends [Uppercase<Ch>]
  ? true
  : false;

type SplitByCapital<
  S,
  Word extends string = "",
  Words extends unknown[] = []
> = S extends ""
  ? [...Words, Word]
  : S extends `${infer Ch}${infer Rest}`
  ? IsUppercase<Ch> extends true
    ? SplitByCapital<Rest, Ch, [...Words, Word]>
    : SplitByCapital<Rest, `${Word}${Ch}`, Words>
  : [];
```

Long story short, we iterate over letters and accumulate each new word in `Word` until we reach capital letter. We understand it when `IsUppercase` returns true. When a string is empty, a tuple with all words is returned.

https://tsplay.dev/w6PD0m 🏝

That's not final solution. If you have a look at it, you will see that it's correctly working for lowercase oneword and camel case. How come?

1. When we have pascal case, `IsUppercase<Ch> extends true` is correct, so we add empty string to `Words` the next line.
2. When we have uppercase oneword, we split letters one by one, because `IsUppercase<Ch> extends true` treats letters as different words.

To be able to fix the first problem, we already have a type `FilterEmptyWord` but we need to add `Word` at the end, not the beginning. I updated it as:

```typescript title="Update filtering empty words"
type FilterEmptyWord<
  Word,
  T extends unknown[],
  S extends "start" | "end"
> = Word extends ""
  ? T
  : {
      start: [Word, ...T];
      end: [...T, Word];
    }[S];
```

Together it will look as the following:

```typescript title="Removing empty string from words"
type FilterEmptyWord<
  Word,
  T extends unknown[],
  S extends "start" | "end"
> = Word extends ""
  ? T
  : {
      start: [Word, ...T];
      end: [...T, Word];
    }[S];

type IsUppercase<Ch extends string> = [Ch] extends [Uppercase<Ch>]
  ? true
  : false;

type SplitByCapital<
  S,
  Word extends string = "",
  Words extends unknown[] = []
> = S extends ""
  ? FilterEmptyWord<Word, Words, "end">
  : S extends `${infer Ch}${infer Rest}`
  ? IsUppercase<Ch> extends true
    ? SplitByCapital<Rest, Ch, FilterEmptyWord<Word, Words, "end">>
    : SplitByCapital<Rest, `${Word}${Ch}`, Words>
  : [];
```

Much better – https://tsplay.dev/WPRQEN 🏝

Fixing uppercase oneword is not a big deal. We can just add one conditional type `IsUppercase` and if it is `true`, then return the string as is. Together with `SplitByCapital` it will look like:

```typescript title="Add support for camel and upper cases"
type Words<S> = {
  separatorBased: SplitBySeparator<RemoveRepeatedSeparator<S>>;
  capitalBased: IsUppercase<S & string> extends true ? [S] : SplitByCapital<S>;
}[WhichApproach<S>];
```

Voila 💫 Well done – https://tsplay.dev/w8EDPN 🏝

## Make it camel case

Now we have words and we need to prepare them before joining together. To do so, we need:

1. Make first word lower case
2. Capitalise other words

We start from `WordCase` to support both lower and pascal case:

```typescript title="Word case"
type WordCase<S> = {
  pascal: Capitalize<WordCase<S>["lower"]>;
  lower: Lowercase<S & string>;
};
```

Iterating over words, let's apply pascal case:

```typescript title="Make all words pascal case"
type PascalCasify<T, R extends unknown[] = []> = T extends [
  infer Head,
  ...infer Rest
]
  ? PascalCasify<Rest, [...R, WordCase<Head>["pascal"]]>
  : R;
```

And will use it in `CamelCasify`:

```typescript title="Make first word lower case and other pascal case"
type CamelCasify<T> = T extends [infer Head, ...infer Rest]
  ? PascalCasify<Rest, [WordCase<Head>["lower"]]>
  : [];
```

Almost done here, now we have `type CamelCaseWords<S> = CamelCasify<Words<S>>;`.

I updated tests to be able to test transformations with words – https://tsplay.dev/NlEZBm 🏝

Well done ✅

## Formatted words are joined together

Given a tuple with all words in correct case, we need to join them together. Let's write `Join`:

```typescript title="Join"
type Join<T, S extends string = ""> = T extends [infer Word, ...infer Rest]
  ? Join<Rest, `${S}${Word & string}`>
  : S;
```

As you see here, we get the word from tuple and add it to the end of string literal. Therefore, at the end we will get the concatenated string.

I used `Word & string` to get rid of extra conditional type where I would check that it's the string (we know it's a string here anyway).

And after all, combining 3 types `Join`, `CamelCasify` and `Words`, we can create `CamelCase`:

```typescript title="Final solution"
type CamelCase<S extends string> = Join<CamelCasify<Words<S>>>;
```

Don't forget about generic constrain as we also have tests for types other than a string.

Playground – https://tsplay.dev/wRGknN 👏

Thank you for your attention and have a wonderful evening and the rest of the weekend!

Cheers 👋
