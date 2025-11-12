---
title: Conditionally readonly object type in TypeScript
created: "2021-04-23"
updated: "2021-04-23"
description: Given the object and a union of properties, return object where those properties are readonly
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - partial
image: /partial-readonly/step1-example-of-use.png
---

![Example of Readonly use](/partial-readonly/step1-example-of-use.png)

We already solved the challenge with readonly (see [Readonly under the hood](/2021-04-06-readonly-under-the-hood/)). Today we want to apply readonly modifier only to the specified keys ([Readonly 2](https://github.com/type-challenges/type-challenges/blob/master/questions/8-medium-readonly-2/README.md)).

## Combination of 2 challenges

Again, as for previous challenge [Omit under the hood](/2021-04-21-omit-under-the-hood/), we have a combination of challenges that we already did:

1. We already learnt how [to apply readonly modifier to the keys](/2021-04-06-readonly-under-the-hood#make-values-readonly):

![Readonly solution](/partial-readonly/step2-readonly-solution.png)

2. We also need [to pick specified keys](/2021-04-05-pick-under-the-hood/):

![Pick solution](/partial-readonly/step3-pick-solution.png)

3. And we need [to have excluded keys without readonly modifier](/2021-04-21-omit-under-the-hood#combination-of-2-challenges):

![Omit solution](/partial-readonly/step4-omit-solution.png)

The algorithm is:

1. Pick keys we want to make readonly
2. Make picked keys readonly
3. Add the rest (or excluded) keys without changes

![Solution, version 1](/partial-readonly/step5-solution-v1.png)

If you check [the current solution](https://www.typescriptlang.org/play?#code/PQKgUABBAcELQQEoFMCGATA9gOwDYE8IAmSeOci0gI0IEFsAXACx0IDEBXCACgAFVGAMw4BKCAGIAtsnQBLDpIkAnNFjyFxmKgCtkAYwZwA1snwBnUqXHWIARQ7IzDWTktQAkpIAOuZNMYQqBAA5sjYyEqyehAABgCy+CgYOAREADwAKgA0EADSAHwxEADuTFFMEAyoJmaVxZiV+F7IgUrBCmEMsRlFAuixuTEAdG4DRWbNerKChMwtZshdmIIQXkqYzUrOjhDL3UXMqF1mLBy4-QtdDA1JagRDEADqTGFjELK12Jhda5gAbrJ0DIcrJjqdzhBJNUWqhcLhVutNttaipkuoINoOE4ILhZCZKi8IF8lFD4TFbil8JlCiMoKQ2JglBBkAAPVDeXyjGLchgWKCyRgRQSoPQtDKYLAQADepCgzgYvgAXBAnJFsMFZRAgWY9JEvM4cMrVQKNVAoHpMBzFjJlVRMJhfAJSABfUYW7DY65YZUJCnqdLirA5ADk8t8wYgAB8IMHtbrZPqXNhg-kIABeaWasPIZUAIgAEqZc1lNXG9QbsHnBPaqKglMXNRarQwbRBhbgFiWoK66XKJZghtn0xAC8g4ZhcxBgMAIABRJTrJTKvQCL5dVFmMyyYLYQIQVF3Qi-JH4UhegdlhMV4e52tKBkTqcz+eL5er777tCb7e7oIHykIhsEQMKefZYEMTY+Na-QZgwSgOE+EAAPK5KQ3IxKMqYAGqyMgxS7LuADioL5hwVDKkwDAMF4ZiKtOvJ6EwQzaGYQyMsEwDQGAIDAGAfGgBAAD6wkiaJIkQAAmpgHBMgAwhKLSFioQliapgkQDxfEgc0EC+qolIBjkBTDn6BBpAAClERiZEZ+SpgAZMhkigjZeT5AA3PxIAqWpokQBkjhdLJqALLUvliRpvGyN4jJdFKEC0LiJg5LOLKTF0zptusijBrw2nIHAjGwr46qOMAHDOB2wZaU0LQrqFw4ANqkKl6VpIleLIGkeloqkmT9gAjPkOSmVSgaYENdldnOaX6Aw7VJV1PWHgGg0htmEbRrGjjxomOApils0GDIU0tUd80dSY3WJPp-r9VgRDraC4ZRjGl57cmw0zelJ3DWAAC6fECi2SjCqK-mDZmcrPTmKpwSapDvRWAD8Rrw+qpCQb4LboLa9qOtgYCumAwNCiKYr9kQUOfr1sww2jaqmlqO3lkmqNw4zmOWlBON4w6aCE8TpOg+T31zTI1P-ui2YMwjUBSwQzM6qzODs8aGPmtz2Otna-NOsTXk+eF6mcFsLxMgAyi2NFG+FkVgKApCphbTB1i0+DSUyZgOhVSa0RAlHUbR9E6kxLFsW0nHAAIZjFBETsQDheEqj7Fb+4HNF0cADFh6x7FR97uC+zgfIQKmcSMi0smu3CYShOnVGZyHjHMXnbTcbxYBAA), you see that you cannot use `Pick` and `Omit` if `K` is not part of `keyof T`. Let's fix that:

![Solution, version 2](/partial-readonly/step5-solution-v2.png)

But still we expect to have all keys by default if we don't specify `K`. So the final solution is:

![Final solution](/partial-readonly/step5-final-solution.png)

As usual, the solution is in [Playground](https://www.typescriptlang.org/play?#code/PQKgUABBAcELQQEoFMCGATA9gOwDYE8IAmSeOci0gI0IEFsAXACx0IDEBXCACgAFVGAMw4BKCAGIAtsnQBLDpIkAnNFjyFxmKgCtkAYwZwA1snwBnUqXHWIARQ7IzDWTktQAkpIAOuZNMYQqBAA5sjYyEqyehAABgCy+CgYOAREADwAKgA0EADSAHwxEADuTFFMEAyoJmaVxZiV+F7IgUrBCmEMsRlFAuixuTEAdG4DRWbNerKChMwtZshdmIIQXkqYzUrOjhDL3UXMqF1mLBy4-QtdDA1JagRDEADqTGFjELK12Jhda5gAbrJ0DIcrJjqdzhBJNUWqhcLhVutNttaipkuoINoOE4ILhZCZKi8IF8lFD4TFbil8JlCiMoKQ2JglBBkAAPVDeXyjGLchgWKCyRgRQSoPQtDKYLAQADepCgzgYvgAXBAnJFsMFZRAgWY9JEvM4cMrVQKNVAoHpMBzFjJlVRMJhfAJSABfUYW7DY65YZUJCnqdLirA5ADk8t8wYgAB8IMHtbrZPqXNhg-kIABeaWasPIZUAIgAEqZc1lNXG9QbsHnBPaqKglMXNRarQwbRBhbgFiWoK66XKJZghtn0xAC8g4ZhcxBgMAIABRJTrJTKvQCL5dVFmMyyYLYQIQVF3Qi-JH4UhegdlhMV4e52tKBkTqcz+eL5er777tCb7e7oIHykIhsEQMKefZYEMTY+Na-QZgwSgOE+EAAPK5KQ3IxKMqYAGqyMgxS7LuADioL5hwVDKkwDAMF4ZiKtOvJ6EwQzaGYQyMsEwDQGAIDAGAfGgBAAD6wkiaJIkQAAmpgHBMgAwhKLSFioQliapgkQDxfEgc0EC+qolIBjkuTMiyLbYOgtQmPgewZMOVk2amaakAAZEg+nqGkAAKURGJkRn5PkLnIZIoJ+Xk+QANz8SAKlqaJEAZI4XSyagCy1HFYkabxsjeIyXRShAtC4iYOSziykxdM6bbrIowa8NpyBwIxsK+OqjjABwzgdsGWlNC0K5pcOADapBlRVaRFXiyBpHpaKpJk-YAIz5DkfoEAtWDLQFXZzuV+gMBNxXTbNh4BktIbZhG0axo48aJjgKalXtBgyNto3PQdk0mDNiTufNgaYEQF2guGUYxpe93Jitu0Va9K1gAAunxAotkowqiglS2ZnKIM5iqcEmqQEMVgA-EaBPqqQkG+C26C2vajrYGArpgCjQoimK-ZENjn5zbMuPk2qppard5ZJmT+NC1TlpQbT9MOmgTMs2zaMczD+0yDz-7otmguE1A2sECLOpizgEvGpT5oyzTrZ2grTos9FsUZepnBbC8TIAMotjRzsZVlYCgKQqae0wdYtNZMkqg6nVJrRECUdRtH0TqTEsWxbSccAAhmMUETBxAOF4dHuCxzg8eJzRdHAAxaesexWdmDHFZ8hAqZxIyLSyWHcJhKEFdUVXKeMcx9dtNxvFgEAA) 💻

Have a nice weekend 🌤
