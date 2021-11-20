---
title: Advanced types / Holy.js notes
date: "2021-11-20"
description: The power of TypeScript will be revealed by the example of several tasks from type-challenges of the hard level.
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - holyjs
image: /advanced-types-holyjs-notes/image.png
---

![Max and I discuss StringToNumber on Holy.js](/advanced-types-holyjs-notes/image.png)

On November, 5, together with [Max](https://github.com/ColCh) we had a talk about [Advanced types in TypeScript on HolyJS](https://holyjs-moscow.ru/en/talks/advanced-types-in-typescript/). Let's sum it up.

## Table of contents

- [Why do we need types](/2021-11-20-advanced-types-holyjs-notes#why-do-we-need-types)
- Basic and advanced types
  - [Basic types](/2021-11-20-advanced-types-holyjs-notes#basic-types)
  - [Advanced types](/2021-11-20-advanced-types-holyjs-notes#advanced-types)
  - [Difference between basic and advanced types](/2021-11-20-advanced-types-holyjs-notes#basic-or-advanced-types)
  - [Ways to express advanced types](/2021-11-20-advanced-types-holyjs-notes#ways-to-express-advanced-types)
- [Type challenges](/2021-11-20-advanced-types-holyjs-notes#type-challenges)
  - [Testing challenges](/2021-11-20-advanced-types-holyjs-notes#testing-challenges)
  - Solutions
    - [Tuple Filter](/2021-11-20-advanced-types-holyjs-notes#tuple-filter)
    - [Split](/2021-11-20-advanced-types-holyjs-notes#split)
    - [StringToNumber](/2021-11-20-advanced-types-holyjs-notes#stringtonumber)
    - [GetOptional](/2021-11-20-advanced-types-holyjs-notes#getoptional)
- [Conclusion](/2021-11-20-advanced-types-holyjs-notes#conclusion)
