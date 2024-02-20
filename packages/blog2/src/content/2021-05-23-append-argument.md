---
title: Append argument type into function type in TypeScript
date: "2021-05-23"
description: Given the function and the type, include the type as the following argument in the list of function arguments
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - append argument
image: /append-argument/step1-example-of-use.png
---

![Example of AppendArgument use](/append-argument/step1-example-of-use.png)

Today we discuss [AppendArgument](https://github.com/type-challenges/type-challenges/blob/master/questions/191-medium-append-argument/README.md)

I didn't have that example in production so not sure if it's practical at all.

Anyway let's try to solve it 🚀

## Infer arguments of a function

We already solved [ReturnType challenge](/2021-04-19-return-type-under-the-hood/):

![ReturnType solution](/append-argument/step2-returntype-solution.png)

Similarly we can define `Parameters` (which exists out of the box in TypeScript):

![Parameters solution](/append-argument/step3-parameters-solution.png)

Let's use them both to infer `Parameters` and `ReturnType` for `Fn` and append another argument:

![Solution, version 1](/append-argument/step4-solution-v1.png)

It's working just fine – https://tsplay.dev/WGnZvm 🔥

## Saving the names of function arguments in TypeScript

But what I want to improve here is to have the same labels (names of arguments in the function signature) we had before. If we hover over any example, we will see the difference:

![Problem of solution, version 1](/append-argument/step4-problem-of-solution-v1.png)

We can achieve it with adding `[...args: Args]` instead `[...Args]`:

![Solution](/append-argument/step5-solution.png)

That's it 💫: https://tsplay.dev/wgrb4W

Thank you for your time 🙏🏻
