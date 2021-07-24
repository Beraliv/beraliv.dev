---
title: Flatten Tuple Type in TypeScript
date: "2021-06-13"
description: Given the tuple, make it flatten as Array.prototype.flat when pass Infinity
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - flatten
image: /flatten-tuple-type-in-typescript/step1-example-of-use.png
---

![Example of Flatten use](/flatten-tuple-type-in-typescript/step1-example-of-use.png)

Today we discuss [Flatten](https://github.com/type-challenges/type-challenges/blob/master/questions/459-medium-flatten/README.md)

It works the same way as [Array.prototype.flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat/) when you pass `Infinity`

Let's find out how to do that in TypeScript 💪

## Iteration over tuple elements

Knowing the approach from different challenges, as we want to save the structure (it will be tuple at the end), we apply [Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types) with [Rest elements in Tuples](https://devblogs.microsoft.com/typescript/announcing-typescript-4-2/#non-trailing-rests).

We iterate over elements:

![Iterate over tuple elements](/flatten-tuple-type-in-typescript/step2-iterate-over-tuple.png)

Then we have 2 cases:

1. If the element is a tuple, we apply changes recursively
2. Otherwise, we leave it as is

Let's add second case:

![Put element to the result tuple type](/flatten-tuple-type-in-typescript/step3-always-put-elements-to-the-result-type.png)

## Call it recursively when needed

At the moment, if we have a look at Playground – https://tsplay.dev/w18bXW, we will find that not all tests are passed.

We forgot to apply function recursively when we have an element as tuple. Let's have an example here:

![Example where Flatten isn't working](/flatten-tuple-type-in-typescript/step4-not-applying-recursively-for-elements-which-are-tuples.png)

In this case we cannot just add it to result tuple, we need to call `Flatten` before and then put all the elements of it to the result type. Let's change the implementation based on that:

![Solution](/flatten-tuple-type-in-typescript/step5-solution.png)

Now it's working as expected 🔥

Check out Playground – https://tsplay.dev/WKk0DW

Thank you for your time and have a productive upcoming week 🚀
