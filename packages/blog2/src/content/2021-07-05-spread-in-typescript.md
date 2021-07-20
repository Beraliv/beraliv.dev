---
title: Spread in TypeScript
date: "2021-07-05"
description: Today we discuss Merge. You can use it the same way as use spread in JavaScript. The final object will contain the result of two objects.
labels:
  - typescript
  - medium
keywords:
  - typescript
  - challenges
  - merge
categories:
  - typechallenge
image: /spread-in-typescript/step1-example-of-use.png
---

![Example of Merge use](/spread-in-typescript/step1-example-of-use.png)

Today we discuss [Merge](https://github.com/type-challenges/type-challenges/blob/master/questions/599-medium-merge/README.md)

It's quite convenient to use it in combination with ES6 spread operator for objects.

Let's try it out 🚀

## Iterate over object keys

As I previously said, EcmaScript 6 introduced the spread operator which does the same in JavaScript which we want to achieve here. Let's have an example:

![Spread in JavaScript](/spread-in-typescript/step2-spread-in-js.png)

If we have the same key in both objects, we use if from the second object. Otherwise, we get it from the first object.

So let's iterate over all keys of two objects in TypeScript and check whether we have a key in second object. If so, we extract value from the second object. Otherwise, we get value from the first object – https://tsplay.dev/Nl0BlN

![Merge, version 1](/spread-in-typescript/step3-solution-v1.png)

Unfortunately, we have an error when we use `F[K]` as TypeScript doesn't know in advance if `K` is a key of first object `F`. Let's add the condition explicitly:

![Merge, final version](/spread-in-typescript/step4-solution.png)

This workaround works and that's actually the solution – https://tsplay.dev/wRpM7m

Thank you for your time and have a wonderful evening 🌇
