---
title: Convert string literal type into number literal type in TypeScript
created: "2021-12-03"
updated: "2021-12-03"
description: Given a number as string literal type, returns a number as number literal type
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - stringtonumber
image: /string-to-number/image.png
---

```typescript title="Example of StringToNumber use"
type ToNumber<S extends string> = any; // implementation

type cases = [
  Expect<Equal<ToNumber<"0">, 0>>,
  Expect<Equal<ToNumber<"27">, 27>>
];
```

Today we discuss [StringToNumber](https://github.com/type-challenges/type-challenges/blob/master/questions/300-hard-string-to-number/README.md)

The type `StringToNumber` is identical to the method `Number.parseInt` in JavaScript

It's not easy topic but let's try what we can do here 🔥

## Idea

Let's quickly plan how we can solve the challenge:

```typescript title="Idea 1"
type Input = '210';

// 1. Split number into digits
type Step1 = ['2', '1', '0'];
// 2.1. Multiply the previous result by 10
// 2.2. Add the current digit
// 2.3. Do it recursively while we have digits
type Step2 = (('2' * 10) + '1') * 10 + '0';

type Result = 210;
```

Looks like a plan, but...

The problem is that we don't have multiplication `*` and addition `+` operators in TypeScript (by version 4.5) that can be applied for number literal types.

But instead if we replace:

1. Digits => tuples
2. Multiplication by 10 => type `Multiply10` that accepts tuples
3. Addition => type `Add` that accepts number and digit as tuples

So let's update the approach for the challenge:

```typescript title="Idea 2 of solving the challenge"
type Input = '210';

// 1. Split number into digits
type Step1 = ['2', '1', '0'];
// 2.1. Use Multiply10 to multiply tuple by 10
// 2.2. Use Add to add one tuple to another
// 2.3. Do it recursively while we have digits
type Step2 = Add<Multiply10<Add<Multiply10<'2'>, '1'>>, '0'>;
// 3. Transform tuple to number literal type
type Step3 = [0, 0, 0, 0, 0, ... 204 more ..., 0]['length']

type Result = 210;
```

Now it looks clear. Let's try it out!

## Convert digits to tuples

As we plan to deal with digits, let's create a mapping between digits and tuples:

```typescript title="Map digits to tuples"
type DigitMapping = {
  "0": [];
  "1": [0];
  "2": [0, 0];
  "3": [0, 0, 0];
  "4": [0, 0, 0, 0];
  "5": [0, 0, 0, 0, 0];
  "6": [0, 0, 0, 0, 0, 0];
  "7": [0, 0, 0, 0, 0, 0, 0];
  "8": [0, 0, 0, 0, 0, 0, 0, 0];
  "9": [0, 0, 0, 0, 0, 0, 0, 0, 0];
};
```

Let's save it in https://tsplay.dev/w6Xqrm and check the length of tuples for all possible digits:

```typescript title="Checking tuples for all digits"
type cases = [
  Expect<Equal<DigitMapping["0"]["length"], 0>>,
  Expect<Equal<DigitMapping["1"]["length"], 1>>,
  Expect<Equal<DigitMapping["2"]["length"], 2>>,
  Expect<Equal<DigitMapping["3"]["length"], 3>>,
  Expect<Equal<DigitMapping["4"]["length"], 4>>,
  Expect<Equal<DigitMapping["5"]["length"], 5>>,
  Expect<Equal<DigitMapping["6"]["length"], 6>>,
  Expect<Equal<DigitMapping["7"]["length"], 7>>,
  Expect<Equal<DigitMapping["8"]["length"], 8>>,
  Expect<Equal<DigitMapping["9"]["length"], 9>>
];
```

It's working as expected 💪

## Multiply by 10

Next, we want to "multiply" tuples by 10. It means that we want to return the tuple with the length of original tuple multiplied by 10. For that we use spread 10 times:

```typescript title="Multiply tuples by 10"
type Multiply10<T extends readonly any[]> = [
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T
];
```

Let's save current progress in https://tsplay.dev/WPxJeW and add tests.

```typescript title="Test cases for multiplication"
type cases = [
  Expect<Equal<Multiply10<[]>["length"], 0>>,
  Expect<Equal<Multiply10<[0]>["length"], 10>>,
  Expect<Equal<Multiply10<[0, 0]>["length"], 20>>,
  Expect<Equal<Multiply10<[0, 0, 0]>["length"], 30>>,
  Expect<Equal<Multiply10<[0, 0, 0, 0]>["length"], 40>>,
  Expect<Equal<Multiply10<[0, 0, 0, 0, 0]>["length"], 50>>,
  Expect<Equal<Multiply10<[0, 0, 0, 0, 0, 0]>["length"], 60>>,
  Expect<Equal<Multiply10<[0, 0, 0, 0, 0, 0, 0]>["length"], 70>>,
  Expect<Equal<Multiply10<[0, 0, 0, 0, 0, 0, 0, 0]>["length"], 80>>,
  Expect<Equal<Multiply10<[0, 0, 0, 0, 0, 0, 0, 0, 0]>["length"], 90>>
];
```

Given tuples that represent all possible digits, we multiply it by 10 and check that it equals to 0, 10, 20, ..., 90 respectively.

Pretty neat, ha 🤓

## Addition

Another most important part is adding one tuple to another. That means we want to return the tuple which length is the sum of two tuples' lengths:

```typescript title="Addition"
type Add<N1 extends readonly any[], N2 extends readonly any[]> = [...N1, ...N2];
```

Let's save it https://tsplay.dev/w8Kq0W and test it as usual:

```typescript title="Test cases for Add"
type cases = [
  Expect<Equal<Add<[], [0, 0, 0, 0, 0, 0, 0, 0, 0]>["length"], 9>>,
  Expect<Equal<Add<[0], [0, 0, 0, 0, 0, 0, 0, 0]>["length"], 9>>,
  Expect<Equal<Add<[0, 0], [0, 0, 0, 0, 0, 0, 0]>["length"], 9>>,
  Expect<Equal<Add<[0, 0, 0], [0, 0, 0, 0, 0, 0]>["length"], 9>>,
  Expect<Equal<Add<[0, 0, 0, 0], [0, 0, 0, 0, 0]>["length"], 9>>,
  Expect<Equal<Add<[0, 0, 0, 0, 0], [0, 0, 0, 0]>["length"], 9>>,
  Expect<Equal<Add<[0, 0, 0, 0, 0, 0], [0, 0, 0]>["length"], 9>>,
  Expect<Equal<Add<[0, 0, 0, 0, 0, 0, 0], [0, 0]>["length"], 9>>,
  Expect<Equal<Add<[0, 0, 0, 0, 0, 0, 0, 0], [0]>["length"], 9>>,
  Expect<Equal<Add<[0, 0, 0, 0, 0, 0, 0, 0, 0], []>["length"], 9>>
];
```

Now we're ready to combine it all together and come to the implementation of `StringToNumber`

## Solution

So let's combine all we have together and come up with the final solution:

```typescript title="Final solution"
type DigitMapping = {
  "0": [];
  "1": [0];
  "2": [0, 0];
  "3": [0, 0, 0];
  "4": [0, 0, 0, 0];
  "5": [0, 0, 0, 0, 0];
  "6": [0, 0, 0, 0, 0, 0];
  "7": [0, 0, 0, 0, 0, 0, 0];
  "8": [0, 0, 0, 0, 0, 0, 0, 0];
  "9": [0, 0, 0, 0, 0, 0, 0, 0, 0];
};

type Multiply10<T extends readonly any[]> = [
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T
];

type Add<N1 extends readonly any[], N2 extends readonly any[]> = [...N1, ...N2];

type ToNumber<
  S extends string,
  T extends readonly any[] = []
> = S extends `${infer D}${infer Rest}`
  ? ToNumber<Rest, Add<Multiply10<T>, DigitMapping[D & keyof DigitMapping]>>
  : T["length"];
```

So we start iterating over the string with conditional type `` S extends `${infer D}${infer Rest}` ``.

Given the digit, we apply [the idea](/2021-12-03-string-to-number#idea) that we discussed above:

1. With `Multiply10` we multiply the current number by 10
2. With `Add` with sum the number and the digit
3. Do it recursively while we have digits
4. At the end we have a result tuple, which we convert to number literal type by using `['length']`

We also transform digit to tuple using `DigitMapping[D & keyof DigitMapping]`. We use `& keyof DigitMapping` to be sure that we have only digits (because the keys of `DigitMapping` are only digits).

That's basically it 🎉

To be able to check the whole solution with tests, please have a look at the Playground – https://tsplay.dev/NlxoON

Thank you for your time! 🕛

Have a wonderful weekend ☃️ and see you soon! 👋
