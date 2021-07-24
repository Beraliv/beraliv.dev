---
title: Readonly under the hood in TypeScript
date: "2021-04-06"
description: Given the object, we need to make properties on the first level readonly
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - readonly
image: /readonly-under-the-hood/step1-example-of-use.png
---

![Example of Readonly use](/readonly-under-the-hood/step1-example-of-use.png)

Second challenge is [Readonly](https://github.com/type-challenges/type-challenges/tree/master/questions/7-easy-readonly)

Similarly to Pick, it's usually used when you need to declare the type which is based on another type. The values on the first layer are immutable, or readonly&nbsp;🔒

## Iteration over an object

As previously for [Pick](/2021-04-05-pick-under-the-hood/#iteration-over-an-object), we use [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) for the iteration:

![Example of Mapped Types](/readonly-under-the-hood/step2-mapped-types.png)

## Make values readonly

To make first layer of properties immutable, we use [`readonly` modifier](https://www.typescriptlang.org/docs/handbook/2/classes.html#readonly) and that's it ✅

![Solution](/readonly-under-the-hood/step3-solution.png)

Check out the solution in [Playground](https://www.typescriptlang.org/play?#code/PQKgUABBDsELQQEoFMCGATA9gOwDYE9J44TSiAjfCAQWwBcALHKgMQFcIAKAAVXoDM2ASggBiNAGcqo8mwCWuOnDnYxAJzRY80zOQBWyAMZKA1snwSiRUTYgBFNsgl05OK1ACSAWwAOuZF7I9BCMyBCyCkoqEAAGKBg4BAA8ACoAfDEQAOZByGpyhhAA7nKMmGx0EGwSKlkQpQB07hAAwjjOamzGEhCoIfg+YSWMvbi4ED5qmINqLk4QmPwQKRASyJV0mBAaCdoANBCBfLUhDGGT03lzPYunYYbtdJ3GyOj9gxCGfNiYleRhOwkNSy2FeTSgRBYmDUEGQAA9UL5-M0Yqi6JYoCo6Hl+KhDGEUpgsBAAN5EKAuOj+ABcqyetXJEHQTkM+R8LhwtI6DKgAF9mg9sM4QkTMLSALL4eJaZKErBpCAAXlJjMpNIgACIABLmDV7RnMiSsuTs1zYWka-iYXSoNQaoj8iEU0UNNVhZXa5BjTAaiDAYAQACiaimalpX2wP0qgOBqj6OxlVAuMzohGdWAahuNppwSs15FtUJ9foDwdD4e+v22kljvWruwIEymKbTsVRzQVADU5MgigtVABxUpatjkWkMOh0HwSan+9GGBgNPQSBrQrLAaBgEDAMC70AQAD6R+PJ+PEAAmuUYW1mRAdRpD6enweINvd6mPpLpYl8KkFcqySgBMfwgABtABpcx6lUMx8FuFIAF1aRSCDzAQsB+TAfdnyfZYnEqFpUDWHocNPV8dzkXxoUqEkgwARzYVBcAOQM4UGYwIF5CB+CmLwIAAcm4D9kDgBcmP8bAcgkYAKgUCR+PfAZ7iI+ZlVAohWPYugkkDBimKSL9NB-VJRQARjSA5v20EysHMtILLAdCwCxHE8QJMyVQpUp1W5SSiCzNkOXNOl8j8qAHiRdZXlpchrX8PgMN3PcQEfUijwgdhZjOGEAGVsWnVK0vIrDwCgBUcoYW0wjgtgYQkTBcFk9px0nadZ2AedF2XVc1HXaBgD4CQijyIgux7Pt6saoKZwgCcpxnOcjS6lc1w3YBJqaoVRogcVoTCFpKrGIIpJa+b2s6pcVt6rcdzAIA) ⭐️
