---
title: Append to Object in TypeScript
date: "2021-06-16"
description: We have spread on objects in JavaScript so we can add value by the specified key, let's find out how to do that in TypeScript.
labels:
  - typescript
keywords:
  - typescript
  - challenges
  - appendtoobject
image: /append-to-object/step1-example-of-use.png
---

![Example of AppendToObject use](/append-to-object/step1-example-of-use.png)

Today we discuss [AppendToObject](https://github.com/type-challenges/type-challenges/blob/master/questions/527-medium-append-to-object/README.md)

In JavaScript we don't have a method for that, but spread with adding extra field is similar to what we want to do.

Let's try to solve it 🚀

## Add key and value

First of all, we need to add the value by the key. Let's try out https://tsplay.dev/w62Yew:

![Add value by key, version 1](/append-to-object/step2-add-value-by-key-v1.png)

But unfortunately we cannot use type `U` as a value here.

Instead we say that we iterate over elements from `U` – https://tsplay.dev/WP5XJw.

![Add value by key, version 2](/append-to-object/step2-add-value-by-key-v2.png)

But this is also not working as `U` should have the specific type to be a key in an object – `PropertyKey`. In this case we need to add [Generic Constrain](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints):

![Add value by key, final version](/append-to-object/step2-add-value-by-key-v3.png)

It's available in here – https://tsplay.dev/Nl09GN

## Remove intersection

So even now we have failed tests. Let's check why it happens:

![Example with intersection](/append-to-object/step3-result-with-intersection.png)

We have an intersection because we use `&`, but we need to get rid of it to have one result object.

To fix that, we can create auxiliary type `RemoveIntersection`:

![Remove intersection](/append-to-object/step4-remove-intersection.png)

Just apply it in `AppendToObject` and that's it 😅

Check out the final solution – https://tsplay.dev/wRpLQm ✅

Thanks for reading and have a good evening 🌆
