---
title: Recursive readonly object type in TypeScript
created: "2021-04-25"
updated: "2021-04-25"
description: Given the object, return object where all properties on all levels are readonly
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - recursive
  - readonly
image: /recursive-readonly-for-objects/step1-example-of-use.png
---

![Example of DeepReadonly use](/recursive-readonly-for-objects/step1-example-of-use.png)

We already solved several challenges with readonly:

- [Readonly under the hood](/2021-04-06-readonly-under-the-hood/)
- [Partial readonly](/2021-04-23-partial-readonly/)

Today we discuss [Deep Readonly](https://github.com/type-challenges/type-challenges/blob/master/questions/9-medium-deep-readonly/README.md)

We apply [readonly modifier](https://www.typescriptlang.org/docs/handbook/2/classes.html#readonly) to all object types inside our object type recursively if we need to prohibit mutations of the whole object, but not only the first layer.

## Recursive conditional types

If we want to make an object immutable for the first layer only, we use normal `Readonly`:

![Readonly solution](/recursive-readonly-for-objects/step3-readonly-solution.png)

To make other layers immutable, we need to apply it recursively.

Solving [Unwrapping the Promises](/2021-04-13-unwrapping-promises/), we already used [Recursive conditional types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types):

![Example of recursive conditional types](/recursive-readonly-for-objects/step2-example-of-recursive-conditional-types.png)

We need to check if a current value is of an object type. If so, apply `DeepReadonly` recursively:

![Solution](/recursive-readonly-for-objects/step4-solution.png)

`PropertyKey` means everything that can be a key in an object (it's one of built-ins in Typescript):

![All possible keys for an object type](/recursive-readonly-for-objects/step5-property-key.png)

Check out the solution on [Playground](https://www.typescriptlang.org/play?#code/PQKgUABBCcELQQCIFNkAcICVkEMAmA9gHYA2AnpPHNTZQEZkQCCRALgBbGMBiArhAAoAAjjYAzXgEoIAYgC2yPAEtec2QCdchUoxkE6AK2QBjVnADWyMgGdZeVGkqUZLiAEVeya6yXEnUAEk5NBJkBTYIHAgAc2QiZHUlYwgAAxR0bHxicgAeABUAPhSIAHd2JPYIORxLCGQANwTGNBx1HAVWBIgCMUiibsMTVng+vAglVltrXjo4fSNTW01jXnVrJUbyEc0snQA6fwgATQJ+Y1FI62mFCA4cYZLkSM1unQh7HBIlImjSicqAPKDRbjfocJS2YzsT6hH7IPbMdRtGwAGggfCIpl8RGsaIAwiQcFcvKMINYCK9nk8iBT4opbhTWDUnt9WBTjMR1vY2j5iAiABIER6NdRosinCDnfreJQkEiS6FyuKxCDi1Zk5AkXoMSUEEXfX7KMRiBJxYbnawkolVUSMa1oAhXOiy+GHbgEdR1AAe7RCyEOKUDk0orDIaCeAA0IABeCAAbwglCgXoAXPHE1BM5E0wBGJOZuhpgDk5SL+YAvvmyMX2FYy1BK1AQ2GngBRL3h0z02MJ-M7bRbVPp-NQfvZO25kcQMdvQsQEtKeuZxuZmdbavz2tkIsZiArygcnHDNmENPpNCZAdkHIRgoQYDAMmcXgkMZ0J7WdpPa0pdudzp4CklCBkBTZQHeABqSjICUlIAOITPyMxpuwrCsGg1gpg+kxQnsBjWHsHrRMA0BgCAwBgJRoAQAA+nR9EMfRxynJ6eIEPYED8qatGMbxNEQORlGhuGSAOJe475HePaUGujAANoANKghAljir0eQALppnkikad6nREHgtjYBy6h4DkAAK6gEOG6ihgpVhorwRDmDSJREAU+YAPyiRkWgSTpCkaZ5WbabpYDlgA3FRIA8XxDEQHkXjDHiRIkvFjECRRSjBB6wwJq2ACOvCfGif5DHuEBiNZahFkIwnIHAUIwsqXjALwPgkNYZZgA1kppbYsZyZQ5WmDkRUlSQOTnuJOg3gUZUdkMigFAtYAaUJLYQFG0lQDgaYCNI0Z3gATCd9Bpt4iQ-AeaZxvmeBpnQBAEKEoj5sgd1TtEX1Zlm7C-X9WZKGmrDqJ4U5ZgYxZXQaS5AyuQPmDWmokAQ8PLhWlCVpWvVbaNAExvGMn+W8+2CEdp3naOpNbHOsM3TTuxbMYgNM1e7xPS9b1EH2tOMJ9xNA7JMRs39IsA0LQOrvz4yg+D-rSzLzOMND84M9EGNZoj4uy8jm6o+jU46yuOOUTFcUZfxfB2bWnoAMqdBhlsZVlYCgJQd729CLxqp65IkB12KYRAqHoZh2HWLh+GEeoxHQMAojWI86iexAUEwWSr1B5yKFoRhWHADh7B4QRREkcAAc5ziacALIek8eKKrCsQh2HBeR9HZdx2RFFgEAA)

Have a good week ☀️
