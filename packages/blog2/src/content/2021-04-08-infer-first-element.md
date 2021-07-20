---
title: Infer first element in TypeScript
date: "2021-04-08"
description: Given the tuple, return its first element
labels:
  - typescript
  - easy
keywords:
  - typescript
  - challenges
  - first
categories:
  - typechallenge
image: /infer-first-element/step1-example-of-use.png
---

![Example of First use](/infer-first-element/step1-example-of-use.png)

Fourth challenge is [First of Array](https://github.com/type-challenges/type-challenges/blob/master/questions/14-easy-first/README.md)

We can use it for both arrays and tuples, but for tuples you get exact value.

To distinguish arrays and tuples, please visit [Making object out of tuple](/2021-04-07-making-object-out-of-tuple/#an-array-or-a-tuple)

## Extracting first element

Previously we described [how to iterate over tuples](/2021-04-07-making-object-out-of-tuple/#iteration-over-tuple). For this challenge we don't need it as we can access index directly using `[0]`:

![Solution](/infer-first-element/step2-solution.png)

But don't forget about [Generic Constrains](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints) using `extends` (it's already added). Without it we cannot call `T[0]` and will get an error `Type '0' cannot be used to index type 'T'`

Thank you for your time! 🕒

If you interested in test cases, please have a look at [Playground](https://www.typescriptlang.org/play?#code/PQKgUABBCMAsEFoIDECWAnAzgFwgewDMIBBddAQwE9JEE76aAjSkgO2wAs9WXkBXCAAoAAuXYE+ASggBiAKblMLGeTJUaNGVogBFPnJypuGqAEkAtgAcANnPNz2EchADmDuelQBjCAAM0WNgAPAAqAHy+EJzkuNjkANYGTqwkaiy+IZFiACYQ6HLYfOismBCo2ADkpQQYOBBytvbsVVGUlnIAdCYoeOj1AB7kVrbdvmPYmDTYbXJOZNAQALwQANoV5BUANBAVjFs7XhUAulMzc+gATEurAMzbF9vQJ1Cn7RAcCtkLywE4QaroaBhCDAYADdpebByXLYPAQRizdYVV6zD7kbJXH61YIAi7A0HguSQ6FROEIiA3GhjXzdYEANVQcgA7vgUgBxcoACT4jAAXO9sNhLJheaCJl4OB0AFaYDq9FzAOBgEDAMBq0AQAD62p1up1EAAmngihAAMJ4bKzTkeWZ6u3aiAqtXTN6-YIhAZQ1jZUpiSgrI7A5YhFYABhO6pAWvteogIQMuFNiiSMdjTtQVl6uAA3hAAKIARz45Gs2zz-QhuAAvhACOg8OYdsIXXIEBKS7ZWG5MMA+NhUNZMMiwC2IF5k6VlisaOXK0FC8XrEE3UEVncIA8YIHtjcwmFNjOK0TgguS8vsavBNJFsDoBd17nyPycJ4uxAq9uhNfb-e9weoLOx7zkWZ4rgG+4QKwcgAG4eH+h5zqeS5gXw3pyDUUHZJ+qGWhh0J7mAEaRtGqYOvw6CcB4EAAMpQsKJGkY6qqgDQwLURwqizJQxp9JgeDWH2RglPyHCCsKorAOKkoynK6AKnAwBiJgTIeKxEAMsyEB8QJ-bcCKApCiKYqYBK0qyvKiqwMA2mCXpakALK9LMpocdYnbdiJYlGZJJnSeZcnKqqYBAA)
