---
title: Replace occurrence in a string in TypeScript
date: "2021-05-17"
description: Today we discuss Replace. We need to remove one occurrence in the string and place instead the different value. Let's do that 🚀
labels:
  - typescript
  - medium
keywords:
  - typescript
  - challenges
  - replace
categories:
  - typechallenge
featured: ./step1-example-of-use.png
---

![Example of Replace use](/replace-occurrence-in-a-string-in-typescript/step1-example-of-use.png)

Today we discuss [Replace](https://github.com/type-challenges/type-challenges/blob/master/questions/116-medium-replace/README.md)

We need to remove one occurrence in the string and place instead the different value

Let's do that 🚀

## Replace occurrence

Let's first find occurrence within a string and replace it with the different value:

![Replace, version 1](/replace-occurrence-in-a-string-in-typescript/step2-solution-v1.png)

We don't know start and end but know for sure that `From` is in the string `S`.

That's not the perfect solution though: https://tsplay.dev/WGnp9m

So when the input string `S` is empty, we want to have it as a result. Let's replace `never` with `S`:

![Replace, version 2](/replace-occurrence-in-a-string-in-typescript/step3-solution-v2.png)

Still we missed the case where we try to replace empty `From`: https://tsplay.dev/WYJabw

Here we don't need to do anything:

![Solution of Replace](/replace-occurrence-in-a-string-in-typescript/step4-solution.png)

The solution is available here: https://tsplay.dev/wgrVMW

Have a wonderful evening ☕️
