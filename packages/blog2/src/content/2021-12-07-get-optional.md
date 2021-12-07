---
title: GetOptional
date: "2021-12-07"
description: Given an object, returns object with all optional fields
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - getoptional
image: /get-optional/image.png
---

```typescript title=Example of GetOptional use
type GetOptional<T> = any; // implementation

type cases = [
  Expect<Equal<GetOptional<{ foo: number; bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ a: undefined; b?: undefined }>, { b?: undefined }>>
];
```

Today we discuss [GetOptional](https://github.com/type-challenges/type-challenges/blob/master/questions/59-hard-get-optional/README.md)

Here we consider multiple approaches including new possibilities from TypeScript 4.1

Let's have a look ⤵️

## Pick only optional keys

## What is optional key?

## Return only optional keys

## Solution

To be able to check the whole solution with tests, please have a look at the Playground –

Thank you for your time! 🕛

Have a wonderful weekend ☃️ and see you soon! 👋
