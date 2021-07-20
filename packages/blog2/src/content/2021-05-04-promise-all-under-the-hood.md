---
title: Promise.all under the hood
date: "2021-05-04"
description: Today we discuss Promise.all. This is helpful in case we need to wait for all the values. Let's solve it 🚀
labels:
  - typescript
  - medium
keywords:
  - typescript
  - challenges
  - promise
  - promise.all
categories:
  - typechallenge
image: /promise-all-under-the-hood/step1-example-of-use.png
---

![Example of Promise.all use](/promise-all-under-the-hood/step1-example-of-use.png)

Today we discuss [Promise.all](https://github.com/type-challenges/type-challenges/blob/master/questions/20-medium-promise-all/README.md)

This is helpful in case we need to wait for all the values (e.g. we pass `[Promise<number>, 42, Promise<string>]` and expect to have `Promise<[number, 42, string]>` at the end).

Let's solve it 🚀

## Iteration over tuple elements

Previously, one of the challenges in easy category was [Unwrapping the Promises](/2021-04-13-unwrapping-promises/) where we imitated `await` in types:

![Awaited solution](/promise-all-under-the-hood/step2-awaited-solution.png)

This will help to iterate over tuple elements and replace `Promise` with the resolved type.

We already know how to iterate over tuple elements with [Making object out of tuple](/2021-04-07-making-object-out-of-tuple/#iteration-over-tuple) but here we have the difference:

1. If we want to have elements of tuple inside the object type, we use [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html):

![Tuple in object type](/promise-all-under-the-hood/step2-tuple-in-object.png)

2. If we need to work with tuple elements and leave the structure as is, we use [Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types) with [Rest elements in Tuples](https://devblogs.microsoft.com/typescript/announcing-typescript-4-2/#non-trailing-rests):

![Tuple in tuple](/promise-all-under-the-hood/step2-tuple-in-tuple.png)

As we need to transform the elements inside the tuple but still need to have the tuple at the end, we will use the second approach. Let's go over all elements and unwrap it with `Awaited`:

![Promise reducer over arrays](/promise-all-under-the-hood/step3-promise-reducer.png)

The only thing we need to do is to apply it to `PromiseAll`:

![Solution, version 1](/promise-all-under-the-hood/step4-solution-v1.png)

Let's see what happened in [Playground](https://www.typescriptlang.org/play?#code/PQKgUABBBMAMEFoIAUBOB7AtgSwM4FMA6AQwBtTJEFqbKAjATwgEEA7AFwAt1WmAxAK4QAFAAFiHAGYCAlBADEmfABNsAzAuKpUxJvLoDspdgmytKleVYgBFAflztsPC1AAqDAA74IXH9NYAYyceCAADNCw8fGZyMN9OYnYIYkDA-E92XBTWFO1dCHRJFAwcAgAZbABrH3Q6ACt8YNwAGgSfVHx2AVRWMwBzCAA3MnsIXG4BUmUIOh8I0uiAHjcAPniAd058TvC3eLx2iE7cdFIhlWOHKeStHQZCV3CwsKzKQJ5HCE9FggBGCAAXhKUQIhBOZwuwgAzDIANzvT7JH6g-DQIEQAAs0ARUA+rC+KLK+GhGNY+A2IOJS0cqAGq2Ewgh53wbU6jWCckBqwgAG9KFACOw3NglOgBOwmQ5IayIH9YLA2gBySTodBK+GUAC+mqglGAwAg+AAHt5gpd2OhZvNItSANqsdRzVBtR2YZ1tWkDAC660RBORGNt0RI5GEdqJ0T+bUjBGgMd+JO9KWy+McMkoLzCTx5ADVsBTCrkAOLYdgACQEdAAXBBOOx2J5cNWDVlApxCPVcIR0Kh+sA4GAQMAwKPQBAAPpT6cz6cQACa4tQEAAwuhlD5yzsfLPd1OIMPR+wvD5mBtiGWVCsecC3Ebjex8KxlNlgwQlmZJDsIABVVaUAB+Fhz0vZQlj-ShazcBEwGPbwqWiAAlFQBHSVBrwxO8TUfZ9sjtT9v3LNpCBIgjlzcC9SG9QCIDtM8L0fMDy1WYiSLffBkOUVCdhWSjVmoqBaztb0YI3QJSC0fwBCCEJcnY2JSGvYQRlIexmwgNwZFrdilnYzjuPQtZ-zAcc913DSHGSFdiAIbIzNnA8R1FTxe2SXkIAAUQARwEMg2g800mmSLUIEkUoICVUQ4PwBB2zIUgn36BxgAlIxcCVUc02RRMFLcSyAWBeSwztaMYDaaFkxsiAsozLLvhy8g8scdFCoa0hw1K+MELBZkoVhSrUyRWqkXq1Fcss0lWrG4rOradjwWlFkYRkb0M1gk9qpshwMTtSgArNdglm83zFOiopRuJcbHFKnSSraLqKtWJ6Wj2wLgiOnyyCWM7iljGJGssrrbtmiA3WdX1nteg6PpO76T3Ov6rvYaE5sTJYHSdHZXUxl1QZxiGWLAajRxMkBJ3sudBFQPxlwAZUfJtyYpidHNJygeVpxJdgYJdxjOVLPlretG2bVtcHbTtu17fs4GACRcA2HZ2YgfNC1OVTZPU4WmxbYA2w7Lsez7AdYGAdWBYJZWAFlex8FdEnIRKHCFhsdbFiXDelocRzAIA). We still have failed tests. But why?

## Fixing the issues with values

If we hover over constants we will see that the result is `Promise<[]>`, but we expected it to have elements' types inside a tuple.

This happens because `as const` converts an array to a tuple. For tuples `T extends [infer H, ...infer Tail] ? true : false` returns `false` because we forgot `readonly` keyword.

But instead of changing `PromiseReducer` let's have a look at `promiseAllTest3`:

![Type inferred from promiseAllTest3](/promise-all-under-the-hood/step5-promise-all-test-3.png)

Type `T` is inferred as `(number | Promise<number>)[]` instead of `[number, number, Promise<number>]`. There is an approach to have values as tuple instead of array in types:

![Make the values a tuple](/promise-all-under-the-hood/step6-make-values-tuple.png)

1. We added `[...T]` instead of `T`
2. We say that `[...T]` is `readonly` to work with tuples only
3. We added [Generic Constrain](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints) to use spread in tuples

All together:

![Solution](/promise-all-under-the-hood/step7-solution.png)

That's it 🔥

Solution is available on [Playground](https://www.typescriptlang.org/play?#code/PQKgUABBBMAMEFoIAUBOB7AtgSwM4FMA6AQwBtTJEFqbKAjATwgEEA7AFwAt1WmAxAK4QAFAAFiHAGYCAlBADEmfABNsAzAuKpUxJvLoDspdgmytKleVYgBFAflztsPC1AAqDAA74IXH9NYAYyceCAADNCw8fGZyMN9OYnYIYkDA-E92XBTWFO1dCHRJFAwcAgAZbABrH3Q6ACt8YNwAGgSfVHx2AVRWMwBzCAA3MnsIXG4BUmUIOh8I0uiAHjcAPniAd058TvC3eLx2iE7cdFIhlWOHKeStHQZCV3CwsKzKQJ5HCE9FggBGCAAXhKUQIhBOZwuwgAzDIANzvT7JH6g-DQIEQAAs0ARUA+rC+KLK+GhGNY+A2IOJS0cqAGq2Ewgh53wbU6jWCckBqwgAG9KFACOw3NglOgBOwmQ5IayIH9YLA2gBySTodBK+GUAC+mqglGAwAg+AAHt5gpd2OhZvNItSANqsdRzVBtR2YZ1tWkDAC660RBORGNt0RI5GEdqJ0T+bUjBGgMd+JO9KWy+McMkoLzCTx5ADVsBTCrkAOLYdgACQEdAAXBBOOx2J5cNWDVlApxCPVcIR0Kh+sA4GAQMAwKPQBAAPpT6cz6cQACa4tQEAAwuhlD5yzsfLPd1OIMPR+wvD5mBtiGWVCsecC3Ebjex8KxlNlgwQlmZJDsIABVVaUAB+Fhz0vZQlj-ShazcBEwGPbwqWiAAlFQBHSVBrwxO8TUfZ9sjtT9v3LNpCBIgjlzcC9SG9QCIDtM8L0fMDy1WYiSLffBkOUVCdhWSjVmoqBaztb0YI3QJSC0fwBCCEJcnY2JSBWe8cJfHIGGEhlKBGUh7GbK5iGUHhSCYO0SMINxqJkWt2KWdjOO49C1n-MBxz3XcIDcBxkhXYgCGyNzZwPEdRU8Xtkl5CAAFEAEcBDINpItNJpki1CBJFKCAlVEOD8AQdsyFIJ9+gcYAJSMXAlVHNNkUTBTPMcAFgXksM7WjGA2mhZNfIgaqM2q75avIer2HRJrBtIcM2vjBCwWZKFYS61MkT6pEBtROqvNJMb1paqa2nY8FpRZGEZG9DNYJPHrfIcDE7UoRKzXYJYYrixScqKNbiQ2hr9sTJZWraabOtWEGWnupLgme2KyCWd7iljGIhq86abIB9qIDdZ1fVB8HHqh17YZPD6Ee+9hoV+1F-sxnZXSdGmMbp1BsZYsBqNHFyQEnAK50EVA-GXABlR8my57mJyCjnKB5AXEl2Bgl3GM4ys+Wt60bZtW1wdtO27Xt+zgYAJFwDYdiliB80LU4dNkvS1abFtgDbDsux7PsB1gYAreVgkzYAWV7HwV0ScgiocVWG3tzXtZdvWhxHMAgA)

Have a wonderful evening 🌇
