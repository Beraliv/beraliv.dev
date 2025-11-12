---
title: Transform tuple type into object type with same key and value in TypeScript
created: "2021-04-07"
updated: "2021-04-07"
description: Given the tuple, we need to get object where key and value equals to the elements of the tuple
labels:
  - typescript
keywords:
  - typescript
  - challenges
image: /making-object-out-of-tuple/step1-example-of-use.png
---

![Example of TupleToObject use](/making-object-out-of-tuple/step1-example-of-use.png)

Third challenge is [TupleToObject](https://github.com/type-challenges/type-challenges/blob/master/questions/11-easy-tuple-to-object/README.md)

I would say it's rarely used. But what we want to achieve here is having identical keys and values 🙂🙂 for the result object

## An array or a tuple?

What is the difference between [arrays](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays) and [tuples](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)

TypeScript defines [tuple](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types) as:

> A tuple type is another sort of `Array` type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.

It means we can check `length` and will get the exact number:

![Examples of tuples](/making-object-out-of-tuple/step0-tuples.png)

[Arrays](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays) cannot do that as you see:

![Examples of arrays](/making-object-out-of-tuple/step0-arrays.png)

## Iteration over tuple

Usually we iterate over objects and use [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html):

![Example of Mapped Types](/making-object-out-of-tuple/step2-mapped-types.png)

With [Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) we can use `number` type to get the type of tuple's elements:

![Example of Mapped Types for tuples](/making-object-out-of-tuple/step3-mapped-types-for-tuples.png)

- `extends readonly any[]` is required for calling `T[number]` without errors
- `T[number]` gets the values from the tuple `T`
- `in` is for iteration over the values
- `Value` is a tuple element which is used as a key and a value of [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

Let's rename it and we just completed another challenge ✅

![Solution](/making-object-out-of-tuple/step4-solution.png)

Good job, don't forget to check [the solution with tests on Playground](https://www.typescriptlang.org/play?#code/PQKgUABBCM0QtBAKgVwA4BsCmEAuB7CAeQCMArLAY10gXnodpIE8IBnASwDt98uIAFAAFOPPgEoIAYiwBDNq1q0pKiAEUUWNrg58lUAOIcAbln6zzAJ0uzmAGjw2ubAGb5LAWzyFZEfOSpcPGY0HAsAEzwACxwAayxmYGNZDE0IDxRtCG5onABzEzMIWWtbADp9CAAxdwgsAA9ZD0wsSoADDtw2Wko+LNx0bAgAXggAbQByXC0MWQmHCY98cKwMCABmeYhF5dWIAA0tnZW1gE0JgF1itghe5xooHr6gyy0UDFwALmRBrCR8UgUagAHlwISw+BceF+AD4IMBgHV6qFqFhIgBvPAzWTfKbYo5LE4bCa4wl7TYLMlrQ6k3bUgl0iDnWlE84AX1oHTalThADUOFgAO5+fhGXAACRQJG+UVwuDQbE+CK6lCiZTIbDK7jywFgYBAwDARtAEAA+uaLZaLUz8ChLBAAMK7CDirCvM1Wz2miAGo1g0I-Fr-QGBYFIJHTLjhG6vWThPgYVgWZhjC5w0bo2hjXkpNI5JBjLgoDwkN0XC7fHOpVocsAmr2e5BaIIO+RaD0N62+jjNdxBTEAUQAjigUg4B8jAhA2RAXJZ8F4JkJ-Vh4KqUtguHktMAUDoMGwJka7v1fiNxni2LMGUSKdsqQcb3tzld5Ldnn7wbc2zdRmNaBOKK4MCw6jhgYa-MGAQgiukLQi0MIOJi0xXji2wodeADc96MpsLLkhM2HHHsNI4UShxEQ+zJkc+ExsjCiFgBcRrGiAHadt6VR2rgMT2gAytMCrsZ2PqGqAtBwnxUQlDgzC2vabD4KkOh9DKcoKkqwAqmqGpapYOqwMAFhsIKboSRA-JCuwSl7rozhqfKirKmwqrqpq2q6tAwCKcpdndFAcIALLuDgDrSRgm7boqECyo5mnaW5el5PqhpgEAA)
