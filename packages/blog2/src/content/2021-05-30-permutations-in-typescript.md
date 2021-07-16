---
title: Permutations in TypeScript
date: "2021-05-30"
description: Permutation is a synthetic example which can hardly be used in production
labels:
  - typescript
  - medium
keywords:
  - typescript
  - challenges
  - permutations
categories:
  - typechallenge
featured: /permutations-in-typescript/step1-example-of-use.png
---

![Example of Permutation use](/permutations-in-typescript/step1-example-of-use.png)

Today we discuss [Permutation](https://github.com/type-challenges/type-challenges/blob/master/questions/296-medium-permutation/README.md)

This is more synthetic example which can be hardly used in production. I didn't know about it beforehand.

Anyway let's try to solve it 🚀

## Iterate over union type

Using `unknown`, `any` or `never` we can distribute union type:

![Distribute union type and put it into tuple type](/permutations-in-typescript/step2-distribute-union-and-put-to-tuple.png)

But if we try this one, we will get an error `Type instantiation is excessively deep and possibly infinite`.

Somehow we need to store the union element which we currently put into the tuple, and then iterate over the rest elements. For this reason let's add another [Generic type variable](https://www.typescriptlang.org/docs/handbook/2/generics.html) `K`:

![Use generic type variable](/permutations-in-typescript/step3-solution-v2.png)

Now we face `never` 🧐 for all the examples https://tsplay.dev/wj5EbW

## Check if type is never or not

We have `never` because at the last step we have nothing to iterate over in a union type. Let's have a short example:

![Iteration over union example](/permutations-in-typescript/step4-show-never-problem.png)

So for `never` we should return empty array to fix this problem.

To prevent future errors, we shouldn't use `T extends never` as this distributes union type the same way as for `unknown` and `any`. So it's not what we look for.

However, if we wrap `T` and `never` in a tuple and use `[T] extends [never]`, it will actually check for `never`. Let's include it in the solution:

![Solution](/permutations-in-typescript/step5-solution.png)

Looks overloaded but not that hard, right? 😊

## All together

Let's recap ⬇️

1. We apply [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types) for `K` which allows us to include elements into a tuple step by step
2. With `K` we exclude just added element from next steps using `Exclude<T, K>`
3. Last iteration where there is nothing in union type we return empty tuple. We do this with condition `[T] extends [never]`

Please check the solution with test cases: https://tsplay.dev/weexew

Have a wonderful week ahead 🚀
