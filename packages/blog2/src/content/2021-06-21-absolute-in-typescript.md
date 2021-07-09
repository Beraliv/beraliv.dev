---
title: Absolute in TypeScript
date: "2021-06-21"
description: Today we discuss Absolute. To return a number here is a very complicated task because a number of iterations is limited (if we try to solve it with arrays). Instead we can use string literals and return a string as a result.
labels:
  - typescript
  - medium
keywords:
  - typescript
  - challenges
  - absolute
categories:
  - typechallenge
featured: ./step1-example-of-use.png
---

![Example of Absolute use](/absolute-in-typescript/step1-example-of-use.png)

Today we discuss [Absolute](https://github.com/type-challenges/type-challenges/blob/master/questions/529-medium-absolute/README.md)

To return a number here is a very complicated task because a number of iterations is limited (if we try to solve it with arrays). Instead we can use string literals and return a string as a result.

Here we go 🚀

## Return result for the string

If we have a string, and we know that there's a number in it, we can check for a minus sign at the beginning:

![Positive in case we have negative](/absolute-in-typescript/step2-return-result-for-string.png)

Otherwise, we return the same string as we expect it to be positive

https://tsplay.dev/WKko8W

## Return result for the number and bigint

Still we return the same number or bigint if we pass it to `Absolute`

As we already can manipulate numbers in a string, let's put a number to a string:

![Put number and bigint into a string](/absolute-in-typescript/step3-return-result-for-number-and-bigint.png)

And now all the tests are passed ✅ – https://tsplay.dev/WJ9oRm

Good night ⛈🌙
