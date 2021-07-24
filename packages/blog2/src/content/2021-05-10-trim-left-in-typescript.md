---
title: Trim Left in TypeScript
date: "2021-05-10"
description: Given the string, remove whitespaces from the beginning
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - trim
image: /trim-left-in-typescript/step1-example-of-use.png
---

![Example of TrimLeft use](/trim-left-in-typescript/step1-example-of-use.png)

Today we discuss [Trim Left](https://github.com/type-challenges/type-challenges/blob/master/questions/106-medium-trimleft/README.md)

[String.prototype.trimStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) does the same in JavaScript what we are about to do in TypeScript.

Let's try 👩‍💻

## Iteration over a string

We already know how to iterate over:

- Object types (see [Pick under the hood](/2021-04-05-pick-under-the-hood/#iteration-over-an-object))
- Tuple types (see [Making object out of tuple](/2021-04-07-making-object-out-of-tuple/#iteration-over-tuple))
- Union types (see [Exclude under the hood](/2021-04-12-exclude-under-the-hood/#iteration-over-a-union-type))

For strings we need several concepts:

1. [Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types) to infer substrings without whitespaces.
2. [Template Literal types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#template-literal-types) to match substrings in a string.

First, let's declare `Whitespace` which will be removed from the beginning:

![Whitespace example](/trim-left-in-typescript/step2-whitespace.png)

Second, let's try to remove the first whitespace if it is a part of a string we pass. We will get something like this:

![Example with removing one whitespace](/trim-left-in-typescript/step3-remove-one-whitespace.png)

[Not all test cases are completed](https://www.typescriptlang.org/play?#code/PQKgUABBCMAMBsEC0EAqAnAlgWwgGQFMAzAF0mSUqvICMBPCAQQDsSALAe2YYDEBXCAAoAAgENWRPgEoIAYmwEAJpj65ZJAtgAOAG1EakOzBvSid5crKsQAinwIBnEpi4WoASW07NBVhAAGGDiEpAA8qAB8-hAA7myYAMZsECSiANaOEOIQBAAeogkkEE5YzADmKXRaBFnMihDoBCR86MwOWRDMBDHFJKUVMcbJ7DVxxo5aBTU0BGWYzMzzFY3YHABuSgB0bhA8HOg5+V4EO-5nJA7kJFU1fThKEAC8aFjYISShAORQABIEOjoOBAAOr7HT1CCfCIQYDAQ7VQoPEhAmaQv4AoGg9DgqCfchnfw7aEANUw3QgXAgAHFjD8+DQAFwQNgkEhaBwM2EXJKbABWDk2+zKwDg8DAIGAYCloAgAH15QrFQqIABNDgtCAAYQ4ihqf0acqVRtlEAlUuu1RB8Q0DkmCRqz2+3wAPpCADrMF3ukifADc5puL2CxA+AGVDho6u0Sktoc9w3lI4p2v4ACQAb2B1omUwAvhn5kQCAcAEqOEi5wlQAD8EDLTnITND-rAMuNRrQ5a1ogcmXbStNkpwWn2RXTEAAogBHPhmAA0k9yCKKuYgRHQHFwn2EFoISCSZm85UcwD4zh0DjxYF3EASPcyzwA2uQJ0uCIVQtPZzpwq93l8SihBdPkAiIIjnF83w-L8zF-YMwm+UDgNA8DIOXT8Z1goI3hDL4oHwpDIRQiCoFfdCYJ-bD-2+fDegOWigKIvpaMhMCSMXcjMMov9cJoiAPTdIoiA4FFRAORjPmE0TxLYsAAF0pWlEBDX7eVdhaEYDlDDR2RU1TB1bcAoGhUM2DEmo6HVA4HA4HQzxcNomRZNkOS5BweX5QV0GFUVgHEBwYmLcgSTJHobLs5wuA5ZlWXZTlgG5Ng+QFIURQQYBwvsqLgogABZfYak1MyAV8MpHCc2LXIS9yks8oVxUlMAgA) because we don't remove whitespaces after the first one. Let's apply the type recursively:

![Solution](/trim-left-in-typescript/step4-solution.png)

That's it 💪

The solution is available in [Playground](https://www.typescriptlang.org/play?#code/PQKgUABBCMAMBsEC0EAqAnAlgWwgGQFMAzAF0mSUqvICMBPCAQQDsSALAe2YYDEBXCAAoAAgENWRPgEoIAYmwEAJpj65ZJAtgAOAG1EakOzBvSid5crKsQAinwIBnEpi4WoASW07NBVhAAGGDiEpAA8qAB8-hAA7myYAMZsECSiANaOEOIQBAAeogkkEE5YzADmKXRaBFnMihDoBCR86MwOWRDMBDHFJKUVMcbJ7DVxxo5aBTU0BGWYzMzzFY3YHABuSgB0bhA8HOg5+V4EO-5nJA7kJFU1fThKEAC8aFjYISShAORQABIEOjoOBAAOr7HT1CCfCIQYDAQ7VQoPEhAmaQv4AoGg9DgqCfchnfw7aEANUw3QgXAgAHFjD8+DQAFwQNgkEhaBwM2EXJKbABWDk2+zKwDg8DAIGAYCloAgAH15QrFQqIABNDgtCAAYQ4ihqf0acqVRtlEAlUuu1RB8Q0DkmCRqz2+3wAPpCADrMF3ukifADc5puL2CxA+AGVDho6u0Sktoc9w3lI4p2v4ACQAb2B1omUwAvhn5kQCAcAEqOEi5wlQAD8QbeIdCZacEXITND-rAMuNRrQ5a1ogcmW7StNkpwWn2RXTEAAogBHPhmAA0s9yCKKuYgRHQHFwn2EFoISCSZm85UcwD4zh0DjxYEPEASA8yzwA2uQZ2uCIVQvPFzpwled4vhKKEV0+UCIgiJcPy-H8-zMQDgzCb5IPAyDoNg9dfwXRCgnrFCoCItDIQwmCoE-bCEIA-DgO+IjegOBiwNIvoGMhKDyNXKjcJooCG3oiAPTdIoiA4FFRAOFjPjEiSpM4sAAF0pWlEBDWHeVdhaEYDlDDR2XUjTR07cAoGhUM2Ekmo6HVA4HA4HQrxcNomRZNkOS5BweX5QV0GFUVgHEBwYmLcgSTJHp7Mc5wuA5ZlWXZTlgG5Ng+QFIURQQYAoqc2KwogABZfYak1SyAV8MpHFchKPOSrzUp8oVxUlMAgA)

Have a good day and week 🌤
