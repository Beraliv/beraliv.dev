---
title: Intrinsic string manipulation types in TypeScript
created: "2021-05-14"
updated: "2021-05-14"
description: Uppercase, Lowercase, Capitalize and Uncapitalize since TypeScript 4.1
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - uppercase
  - capitalise
image: /type-aliases-for-string-manipulation/step1-example-of-use.png
---

![Example of Capitalize use](/type-aliases-for-string-manipulation/step1-example-of-use.png)

Today we discuss [Capitalize](https://github.com/type-challenges/type-challenges/blob/master/questions/110-medium-capitalize/README.md)

If you need to make first character in a string uppercase, that's the challenge you look for.

Let's have a look 👀

## Type aliases for String manipulation

Since [TypeScript 4.1](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/) we have type aliases `Uppercase`, `Lowercase`, `Capitalize` and `Uncapitalize`.

Knowing [how to iterate over a string](/2021-05-10-trim-left-in-typescript/#iteration-over-a-string) let's find first element and make it uppercase:

![Solution](/type-aliases-for-string-manipulation/step2-solution.png)

We inferred `First`, made it uppercase with type alias `Uppercase`. In case of empty string we return itself without any update.

Tests and examples are available in [Playground](https://www.typescriptlang.org/play?#code/PQKgUABBCM0AwQLQQMIEMAOBLALmgNlgF4CmkSilV5ARgJ4QCCAdjgBYD2zDAYgK4QAFAAE0rAGZ8AlBADEAWxIATLH3lycJeRnxpNiQpoBOBcuVkWIART4kAzjixczUAJLb8WkqwgADdNh4hKQAPAAqAHy+EADubFgAxmwQCVwAbiRGOHYQ7CQQ4lhGDhCeOMYQHOIQaBAORljMAOa5HBB8GBiZCWh2+WJKpSRoGbls+Ub2ODV2iFh2AHQuEDwcRhAkAB5oHmRQ5L6H2eQ4dF0pmLgExMoQALyol0E3IQDk4-j4bTFr+EqvEQgwGAG02XQSmkGODaNHyrwAEiRPt9fv8DodloCAGpYEgxSrMCAAcVw8L4NAAXBA2OUMHYKcDskkFgArRZrJrAWBwMAgYBgAWgCAAfVFYvFYogAE0OHx1igOEp8ojJiKJerhRA+QLTucAldgiQQgBlUGaZhKHL1RpNQEPU1bc2WvwAEgA3o1xJkVkUHABfd2e70AJSmft85AA-K63QBVTrdXpGni+nARANu0P+iNQKnGgDcArAQo16ogYSmjz6OVLEq1-Kw2jW0zdEAAogBHPgEAA07bBJAhED9BSMHHUr2EupIiCSBE8zXswD4jnwdleOrO+R61fuEAA2uQ2wOISFO938CF9c9Qq9xBwODQ0EYAX3XqtH8+AREe0eTzgzy7Agryea5bx4AB5CCACFGGDV8IHfKDYPgiIfz-cEAPPYDrzAo07wfCAnxfH9EI-IivzQ38oGPTDAIvEDAjwt4ENeb9fwAXSLYsQDVWtRRWOU8nWY1NDpPj+PrHjyEBY02GffI6FldY7A4fAVycZh6WpWl6UZOxmTZBYOS5eBgDEOwYkyGSIBxPE6jUjSuG0mkcDpBlgCZNhWXZIxOW5YBVPUxxnJsgBZNZ8hQeTPm8Jp7CpVz3P0wzfKaXl+TAIA)

Have a wonderful Friday 🔥
