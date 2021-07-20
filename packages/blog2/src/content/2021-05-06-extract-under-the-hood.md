---
title: Extract under the hood in TypeScript
date: "2021-05-06"
description: Given a union of several types, remove those types which doesn't extend the specified structure
labels:
  - typescript
  - medium
keywords:
  - typescript
  - challenges
  - extract
categories:
  - typechallenge
image: /extract-under-the-hood/step1-example-of-use.png
---

![Example of Promise.all use](/extract-under-the-hood/step1-example-of-use.png)

Today we discuss [Type Lookup](https://github.com/type-challenges/type-challenges/blob/master/questions/62-medium-type-lookup/README.md)

This is quite a rare case but if you need to match every element inside a union type by its field type (and you know in advance which one), that's what you need.

Let's take a look 👀

## Filterting

This solution looks like what we did in [Exclude under the hood](/2021-04-12-exclude-under-the-hood/):

![Exclude solution](/extract-under-the-hood/step2-exclude-solution.png)

We used [Distributive Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types) which helped us filtering out the elements we need.

Here, we need to remove not matched (with `type`) elements of a union. Or in other words (if you don't like double negations as me 😅), we need to pick the union elements of a specific structure. We know in advance that the field is `type`. Let's try:

![Solution, version 1](/extract-under-the-hood/step3-solution-1.png)

Also, if you're familiar with internal type `Extract` (it's the opposite what `Exclude` does), you can apply it here:

![Solution, version 2](/extract-under-the-hood/step3-solution-2.png)

Great job 🔥

Please, don't hesitate to go to the test cases in [Playground](https://www.typescriptlang.org/play?#code/PQKgsAUABFBsBMUC0UAqBPADgUygGQHsCBrAV00hiWpqUqgCN0oBBAOwBcALAt5gMVJQAFAAEAhpwBmpAJRQAxAFtsAEwCWpJYtJt1vRUvEVoUegotQAiqWwBnDvrb16AZQIrHKuwBoo6AiEjZgB3SQ4oDgIoABsiMkwoKQIAJyhxSKxcdTZ0qF0nSOimSK5sdTTxDg4U9QZSDnsAOjNTegBJXO51OygAYy5xGJjsNgBzbD8Q3BDAmNVY9WJcKKgJiO5cPtSU+0xeDXHMnEZmO2xxFIGcsaTU0q2PJQMAAw4sl6T1bHmoHIf8npXgBhKpQAA+UAAIgQxi8Wp0oARNmlZilVL4oNMsephlBsAAPHB9DbRdZQF4wuF3NIvQgkACqmAAPFSIVBQRw-AByVSw7kAPk+kgWL05n2StPpxCZrNh7M5PL6VUFn3+mzuwwIIRu+IJ4iUmBGTRcphe5o4dnoOUaKSk4j6uE5UAA3vQYO8cAAuKDc5Ucbnuxi7NR2H3clhMOx2HLqSTc9nc1w8FLccQVBOQ7nA0gpGKZ30AIVGYyGgdMAF9TTAbdg7Q7cGy3aYPVlw3yxuWYDAGCGMeGABKBNiqAvcwu1aqSdBjwukYYd2cEAl1rvd7ZxFLh3vathjkJcdSNMcMGIO4hrqttUye3AAWXQVIwJwAvPh4rLnZCqTzFwKoMAwB6sSjQLKsDC4JSsIvPQ5owdeMD-gAat8IRIrkADiR4DqQDA+lw1SYGGgGWgMTQAFZ2E0qRjMACCQCAwCQMxECgFAAD6nFcdxXFQAAmoEaTAgQqi4AOda4DxUmcVAjEsbe76MiyDJ+Kg-5vgAogSNQOhwzIqa6xzYD6qBQBWAoANwsWx0lSWg9gRKC5y9LZPGyUxEDqIaqQRC6UAaQAjqQQx+FpIFmUkKQeL6oi3kgAxDCM4z2MADS4nY5aQLW9aOhyYLNq23q+v6a69tgobhpG6DRrG8aJsmPmDBmiY5nms4lmWkBXllnB1vauVNvQt7tvy9BlRVvpDroo6JhOR4cNOs7zvM-Kzcuq70BuqTblFIR7omB5HtgJ5nn0F5dfJWSsHoRgxFAb5ftCsKXScyrOfdUAANr0GF2AksygXBTEzLSrK7BeSFvp-n4VICgKPg-USf16YDQwgx+LLg7dSoqvDeUcHDCMQAAuix1kgBxrm8YIqZlGkriNERlNU+x7mQKA9D-smly4AEuZQHYBAxGlvBhlABEcERXokXYZGUdRKS0QgwCSHY0wpJzUAodgaGC8Ljii-hhHEcApFcBRVE0XR8DAHrItsFapj-neqROoMwwlvYRuSybZsWwrYwMR5kBAA)

Have a wonderful day 🌇
