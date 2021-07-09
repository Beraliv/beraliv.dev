---
title: ReturnType under the hood
date: "2021-04-19"
description: We start solving medium challenges today. And we are going to discuss Get Return Type. To get rid of repetitive code we sometimes need to reuse return type of any functions.
labels:
  - typescript
  - medium
keywords:
  - typescript
  - challenges
  - returntype
categories:
  - typechallenge
featured: ./step1-example-of-use.png
---

![Example of ReturnType use](/return-type-under-the-hood/step1-example-of-use.png)

We start solving medium challenges today. And we are going to discuss [Get Return Type](https://github.com/type-challenges/type-challenges/blob/master/questions/2-medium-return-type/README.md)

To get rid of repetitive code we sometimes need to reuse return type of any functions. Let's do that ⤵️

## Unwrapping values from types

In [Unwrapping the Promises](/2021-04-13-unwrapping-promises/#unboxing-values-from-types) we already discussed that [Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types) is used to get an inferred type variable in the true branch of the conditional type:

![Example of conditional type](/return-type-under-the-hood/step2-example-of-conditional-type.png)

For functions we need to have as general type as possible to cover all types of functions:

![Find a general function](/return-type-under-the-hood/step3-find-any-function.png)

This is useful in conditional types to infer the value:

![Solution](/return-type-under-the-hood/step4-solution.png)

If you interested in test cases, please have a look at [Playground](https://www.typescriptlang.org/play?ssl=31&ssc=11&pln=29&pc=1#code/PQKgUABBBMELQQOIFMAuEBKaCuAnAdhACoCeADspPHDbVQEYkQCC+qAFgPb5MBi2EABQABAIZsAZtgCUEAMQBbZABMAltgXzV+Cclzz62VQBtUcbVSpzrEAIrZkAZ1SrulqAEkFZY8iVsIDmQIQxMzbQgAAyxUPHxSCgAeIgA+SIgAc2R8PVUAYwgAd1UOTmx0bEdtDIgSgDp3CF5OfWQAD1FvX0bI3tRHKjzuZwgJQgBeIQA3AC4Qzk5fcVlxlIgAbyooVQlp6S2oCFwcAggARgPkY0dKQ8Pj2NPoKgBfRtRyYNEISYBZEhicQSyESHwonF2YzWwGAEEcXGwxmUIWCACIzhAAD4wVFUXqRRprABqqmQhQg3CQJQAEth6HN2KhUGRHDMYf08uw6gArRx1FoZYDPEDAMBi0AQAD60plsplEAAmmV9ABhTjKYLUvTBOW66UQEVisHBf6AgjA5JrSZECDtVDZZSOIR1F2iXAZVkQcQkADaAF0VmttLp9BgqAB+TBUOY5KZ6ADc4pAUr1cuITnQKtENydqbThtU3ha6HWEAAogBHbCiYwAGnLbQoeXQL1GuE4mgA5MJjXBOTXfPgso5gOUTI5O0bPhA8tmnD8ID6qGXG8hm4lK9XjIlnLhqvXTSd4p9EoJA3DUHuhykb7Xl6v15ua4kztAAMwHgFHi1nn5rV9vjeKR3lAK5NqgG5Vs+apdO0ADy9DcmuqCfmax5JL+qwQDBPjwYhyFASBDbgZBW6JAACu2CiqDciT0AsSz4MBECHo86EgphayUR2NEgvRizIOIQHAfeJFPtunEQJ2EgLJ2qHfiekmSdJsmEaJyGkc+GLYtA8lsRaxoQqMTG3upj5Qdu2kwHpQInoZkL4Gcal+lOFDYR2uFtAhSHNgumxQKIcw+q+9YqZwnYuVA9BunMnbsFcxjhVQZDHFMZ4xho9B6GAbxgEM+AjGMC6CLM8wCcsf4QFMECRhiczPPlhWOcVpX8Yx9aFHM3rntVtUQPVYpJimeb6vwuBBPoADK9ossNI0GqKoBUGsk3sG6wQkMqcKLGOwwMkyLJssAHJcry-LukKwDiI4hTZVAxKkuSjg7S4e0QIyzKsuyjicjyfICpdz3GLtBXLSxLTBCqa3GIOw77Z9R0nX950ZGAhpgEAA) 💻
