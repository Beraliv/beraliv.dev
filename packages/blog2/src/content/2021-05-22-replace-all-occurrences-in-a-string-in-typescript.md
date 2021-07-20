---
title: Replace all occurrences in a string in TypeScript
date: "2021-05-22"
description: Today we discuss ReplaceAll. We need to remove all occurrences in the string and place instead the different value. Let's do that 🚀
labels:
  - typescript
  - medium
keywords:
  - typescript
  - challenges
  - replaceall
categories:
  - typechallenge
image: /replace-all-occurrences-in-a-string-in-typescript/step1-example-of-use.png
---

![Example of ReplaceAll use](/replace-all-occurrences-in-a-string-in-typescript/step1-example-of-use.png)

Today we discuss [ReplaceAll](https://github.com/type-challenges/type-challenges/blob/master/questions/119-medium-replaceall/README.md)

We need to remove all occurrences in the string and place instead the different value

Let's start ⏳

## Replace all occurrences

Let's check [the solution for `Replace`](/2021-05-17-replace-occurrence-in-a-string-in-typescript/) and adapt it for `ReplaceAll`:

![Replace, solution](/replace-all-occurrences-in-a-string-in-typescript/step2-replace-solution.png)

This solution substitutes `From` for `To` once: https://tsplay.dev/mA7ZXw

Let's do that as many times as required:

![ReplaceAll, version 1](/replace-all-occurrences-in-a-string-in-typescript/step3-solution-v1.png)

But if we call `ReplaceAll` recursively this way, we will do it incorrectly. Let me give an example:

![Not working example for version 1](/replace-all-occurrences-in-a-string-in-typescript/step4-example-for-v1-solution.png)

So instead of calling `ReplaceAll` for the whole string, let's do it for the rest of the string, or `End`:

![Solution](/replace-all-occurrences-in-a-string-in-typescript/step5-solution.png)

Thank you for your time! ⌛️

The final solution with test cases are available here: https://tsplay.dev/mplJBm

Have a wonderful evening 👩‍💻
