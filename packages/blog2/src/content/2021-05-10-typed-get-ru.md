---
title: Advanced Get (Russian)
date: "2021-03-26"
description: Базовое решение извлечения значения из объекта, опциональные пути, массивы и кортежи, общее решение и связка с JavaScript
labels:
  - typescript
  - javascript
keywords:
  - typescript
  - challenges
  - get
image: /typed-get/get-usage-example.png
---

![Пример дебага Get](/typed-get/get-usage-example.png)

Не так давно я раскопал на просторах GitHub репозиторий [type-challenges](https://github.com/type-challenges/type-challenges). У меня есть целый блог, где я решаю задачки оттуда, но сегодня я попытаюсь показать не только реализацию Get, но и продемонстрирую общие проблемы, покажу улучшения и использование в production.

Если перед началом чтения хочется ознакомиться с понятиями из TypeScript, которые требуются в данной статье, переходите в [Summary&nbsp;⚓️](/2021-03-26-typed-get/#summary)

Также, эта статья является переводом статьи, которую я написал на английском. Если интересно, [переходите](/2021-03-26-typed-get/).

## 1. Базовая реализация

[Текущий челлендж](https://github.com/type-challenges/type-challenges/blob/master/questions/270-hard-typed-get/README.md) располагается в категории "сложное".

Предполагается, что нам нужно находить значения для пути только в объекте (реализация не требует пути в массиве и кортеже)

Так с чего же начнем?

### 1.1. Получение ключей

Представим, если бы мы решали эту задачу с помощью JavaScript:

![Функция Get в JavaScript](/typed-get/get-in-js-v1.png)

Перед тем, как вызывать `keys.reduce`, мы получаем список всех ключей. В JavaScript нам достаточно вызвать метод `split`. В TypeScript нам тоже надо как-то получить список ключей из строки.

Благодаря TypeScript 4.1, мы можем использовать [Template Literal types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#template-literal-types). С их помощью мы можем удалить точки между ключами. Давайте определим тип `Path` и попробуем сделать первый подход:

![Path преобразовывает строку в ключи, версия 1](/typed-get/path-v1.png)

Выглядит коротко и просто. Однако после покрытия тестами мы поняли, что упустили случай с единственным элементом (без точки). Тесты написаны в [Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBACghsAFgHgCoD4oF4qqhAD2AgDsATAZygAMASAbwEsSAzCAJygGkIQBfAHQNmbTgCUIFYH2oAoKFAD8UANo8QAGigCd8JMglT0AXXlQAXKtOyA9ACooAfWcvXL3JOBQAwnAqSnNyDHKDsbWUYAWzAAe3YveigAUQBHAFc4ABstJIJIAGMvPigWdhjIqAByAAFQSABafMQszNIAc0kbNOBGTIpK2Vk66Hy-AJwVM1yC4GRUjMzkPRRKmJIIeoBrXnqwBERK9C0VVfWtnb2kSuN0I6m8iEK59Kyl-eRKgCZzkAFLg6Oqi+P0qWkq-2utw09xmzwWb30lSQ7AgEAE21+EMBJ2RqNBVQx+PB+0hd2MQA). Давайте добавим этот случай:

![Path преобразовывает строку в ключи, финальная версия](/typed-get/path-v2.png)

Так лучше. Тесты вместе с реализацией доступны в [Playground](https://www.typescriptlang.org/play?ssl=5&ssc=9&pln=1&pc=1#code/C4TwDgpgBACghsAFgHgCoD4oF4qqhAD2AgDsATAZygAMASAbwEsSAzCAJygGkIQBfAHQNmbTgCUIFYH2oAoKFAD8UANo8QAGigCd8JMglT0AXXlQAXLnxFSlGsNYduvGWYXK1vUwoWWVp2QB6ACooAH0IyKjI3ElgKABhOApJcOj0sKhgwNlGAFswAHt2ePooAFEARwBXOAAbLXKCSABjeL4oFnZCvKgAcgABUEgAWhbEerrSAHNJQOrgRjqKPtlZYegW5NScFTMm1uBkKtq65D0UPsKSCBGAa14RsAREPvQtFSub+8fnpD7jOh3vtmhA2scavVzi9kH0AEw-EACP6vd6qeGIvpaPoogFAjQgw4Q07Q-R9JDsCAQAQPJG4tGfClUrH9WksnEvPHA4xAA).

### 1.2. Reducer для объекта

После того, как мы получили ключи, мы наконец-то можем вызвать `keys.reduce`. Чтобы это сделать, давайте определим тип `GetWithArray`, имея уже путь в виде кортежа `K`:

![GetWithArray для объекта, версия 1](/typed-get/get-with-array-v1.png)

Немного прокомментирую:

1. `K extends [infer Key, ...infer Rest]` проверяет, что у нас есть хотя бы один элемент в кортеже
2. `Key extends keyof O` позволяет использовать `O[Key]` и рекурсивно переходит к следующему уровню объекта

Давайте протестируем это решение (ссылка на [Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwHUCWwAWBBATpghiAPAPIA0UA0gHxQC85UEAHsBAHYAmAzlANpIsBmETOQghSAOkl9BwgEoQOwALoAoKFAD8IkPSatOUANaiA9vyiE16zbHjI0WXAULcyopaXmKKV9QC4oFggANyErAKDQzBUVAHoAKigAfRTUtNSoABUFYCgAYRwOBWT00qSoeNiVJABbMBNMXIBvKABRAEcAVxwAG1JWhkgAY1yAXyh+TBMaqAByAAFQSABaIdRentYAcwVYzuAkHo5ZmKXobMVCACMAKwgRmigmqwPgTYCAAwBlIamenquOGEQ06immSA4OAOJhYHysbChEE+ACYAAwARgAHMt0ajlqiACxw9Q4faoBoBZ7WQI4GpIqAfdCbBiiKAAISEEAAXnxidYeiYhlCkDDKb5rEMUCBPgBZTosJBrPnqUZWVWqlRnKBCopcWjcKwDYbAfAdbo9fBwRAoDDYPD4C7Aa53EakbizV6bWZKCikb6-Ez-QHA0HAcGQ6Gwii+w2De4ms29S12G2Oe2O53xt2zBHMb2+hlorE4vGEj7R4ix42mrpJq32W1OB05TOung5hS-JBgSP50iRIQVqvxmvm5PWhx2ggZ25Z9uktANWakWYsWkQPsMpmMVkczDc3lD9RGkeJi311NT5uXWdt90L8mYZdzAVC3sryWgTcfOUKpVHto4xGUc6xTScmxnF1gGzB8lw-IE2GfVdOhqK4hE3AdMCHJQgA)). Опять мы забыли случай, правда уже когда у нас пустой массив. После добавления код выглядит так:

![GetWithArray для объекта, версия 2](/typed-get/get-with-array-v2.png)

Финальная версия с тестами в [Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwHUCWwAWBBATpghiAPAPIA0UA0gHxQC85UEAHsBAHYAmAzlANoC6AUFCgB+KIUFQAXHUbN2XbkhYAzCJnIQQpAHS6lq9QCUIHYAKFDRZTfSatOUANaaA9srESLI2PGRosuASE3NYgvKTGphSeFtIsEABuajFxicn8APQAVFAA+vkFhQVQAComwFAAwjgcJnlFDblQWRn8SAC2YC6YFQDeUACiAI4ArjgANqQDDJAAxhUAvlDKmC7tUADkAAKgkAC0s6gT46wA5iYZI8BI4xwb-Py70GWmhABGAFYQ8zRQvRLXYAnaQAAwAyrNVuNxm8cOpZiNTGskBwcNcXCwQRI2GiIKCAEwABgAjAAOPbEwl7QkAFixQhwV1Q3Wk-y8LBw7TxUBB6BODBsACE1BAAF5KekWcYuWZopAY1kxISzFAgUEAWRGLCQh0lQgWEgNBse4GgstqXFo3Ak0zmwHwwzG43wcEQKAw2Dw+BewHeX3mpG4G0BJw2vAopHBkJc0Nh8MRwGRqPRmIoEZtM2+9sdExdvndAS9Pr9WcDGxxzDDEZ5RLJFKptJBaeIGbtDtGuddfg9gW95RLAZ45ZMkKQYBTVdI8SSmGbraz7adebd-k9BGLn1LQ8ZaG6G1IGw5XMnPL5jCFIvFqfTQltC5zzq7BbXfdem8HQZ3zMw+820tlE4HiqoAniCmrarqc63pm8yLp2+arr2G7+sAZZfnuQFwmwv6HiM7RvGoJ7Tmoc68EAA)

### 1.3. Все вместе

![Get for type challenge](/typed-get/get-for-type-challenge.png)

Давайте протестируем все вместе и удостоверимся, что тип работает как ожидается:[Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBACghsAFgHgCoD4oF4qqhAD2AgDsATAZygAMASAbwEsSAzCAJygGkIQBfAHQNmbTgCUIFYH2oAoKFAD8UANo8QAGigCd8JMglT0AXXlQAXLnxFSlGsNYduvGWeVrephZZWnZoSCgAcQhgAHVGJABBdnY4EGQAeS0uTBwua2JyKl83KESzSwzCLLsVESd1LR0BCvFJYC8FJWcQTNsqAGteAHsWfLNmlpDwyMQYuITEjxBjLUNgdEHmyxIIADcOZdWNrf9waBGkrRg04NCI6Nj449gEFFOl2QB6ACooAH0v75-v3AaoABhOAUSSfX4Qj5QV7PWSMAC2YB67GAUHoUAAogBHACucAANloMQRIABjVF8KAsdg9eFQADkAAEAhAALSkxAE-GkADmkmeOOAjHxFHpsn2gVQDUSACMAFYQcnYNFmIXAbmWagAZVJNPx+JlcE4pJxUlpjAoCEYPRIcgUZAQEE1ACYAAwARgAHKz3a7Wa6ACx2qBwQWIZGWejLEhweFOmhRbkEXhQABCHAgAC9mMGFPieqSrTbI8sFKTIiBNQBZHEkRgc3NQPhmZvNiXQQugqg4FRmYlk4DIbF4-HII5SqSyhXkrT0tXc+noLTa3U9fWG42m4Dmy1Cm3UdBLvskxWD4cEsehNDS+Wn2cO4iL5dur0+v2Bg9HhT909D3EX8cb2nYB70kXVGDAPcSCfKA1k2dhDw0Y8Bz-EdL0HCdgCnO8GVDJBkQEGM4xg6hE0IFN03YLMc0Q5Df3PUdAMnW8Z1wsMCPzQsoIEctQBIms6wbWjvxPclUIAq9MOw1j6Tw8N2B4o0yEInF4RlDgYLgjhaOMIA). Отлично, базовую часть мы закончили.

## 2. Опциональные пути

When we work with real data in production, we don't always know if the data is valid or not. In this case we have optional paths all over the project.

Let's add test cases with optional paths and see what happens in the [Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBACghsAFgHgCoD4oF4qqhAD2AgDsATAZygAMASAbwEsSAzCAJygGkIQBfAHQNmbTgCUIFYH2oAoKFAD8UANo8QAGigCd8JMglT0AXXlQAXLnxFSlGsNYduvGWeVrephZZWnZoSCgAcQhgAHVGJABBdnY4EGQAeS0uTBwua2JyKl83KESzSwzCLLsVESd1LR0BCvFJYC8FJWcQTNsqAGteAHsWfLNmlpDwyMQYuITEjxBjLUNgdEHmyxIIADcOZdWNrf9waBGkrRg04NCI6Nj449gEFFOl2QB6ACooAH0v75-v3AaoABhOAUSSfX4Qj5QV7PWSMAC2YB67GAUHoUAAogBHACucAANloMQRIABjVF8KAsdg9eFQADkAAEAhAALSkxAE-GkADmkmeOOAjHxFHpsn2gVQDUSACMAFYQcnYNFmIXAbmWagAZVJNPx+JlcE4pJxUlpjAoCEYPRIcgUZAQEE1ACYAAwARgAHKz3a7Wa6ACx2qBwQWIZGWejLEhweFOmhRbkEXhQABCHAgAC9mMGFPieqSrTbI8sFKTIiBNQBZHEkRgc3NQPhmZvNiXQGA0sg48nWkiyhVKnBR+2SXWMMBCm2KSxSdjMHkAblVkQ1UDnC+X9sds+A85IS7MoaQyJnKqGMbju-3h6G+cLU5IZ5HQyg5dA183y2bClb4pZb4gmCOAqGYbxQMQUiAaCVAwmYxJksAyDYni+LIEcUpSAOirAFo9Jqty9LoFo2q6j0+qGsaprAOalqPtQ6DEfBJI4chuIEuhoRoNK8o4XhDrEERJFul6Pp+oGDFMQoCGsShHEYTxg64QyZBjvOk59kJUBrJs7CMRozGIWxqGcUhmHANh5J4ce4bsAIl4QFp1CJoQKbpuwWY5vphmyexaEKVhvFWQyNnIgI95FiQAjviATk1nWDbedJLHksZ8lceZlnKfSoV2YW7BkPZOLwjKHBaTpHBJVA4FgF2PaPtBYJwclRlyf5XGdj03a9jaWV4QRjnEeue4LlVMmpW1pnIJ13WPn1KmOlpG4HmNKVIZNRwzfVfbzfSqkUOOGk2ktI0HlAAA+UC1qpLDMBAZCra1flTVtPX9kF2W5fZsaDVoy08hdV3kBAt1rA9UmYmtaXtUhr1zR91lhmFEWPtFFYnTegPXSDd3gwZLW+SZm11W9u1fflhUkMVpXsFp2Og-d3nGEAA).

Optional paths are not working properly. The reason behind it is simple. Let's go through one example to find the problem:

![Problem 1 with Get for type challenge](/typed-get/problem-1-with-get-for-type-challenge.png)

We cannot extract a key from an object if it can be `undefined` or `null`.

Let's fix it step by step:

### 2.1. Remove undefined, null or both

First, we declare 3 simple filters:

![Filter undefined, null or both](/typed-get/filter-undefined-and-null.png)

We detect if `undefined` or/and `null` exist within the union type and, if so, delete it from the union. At the end we work only with the rest.

You can find the test cases again on the [Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAYglgG2BATgVQHYBMIDM4YRYA8AKgHxQC8UpUEAHstgM5QCu2eBRUA-FEIA3VFABctAFCTQkWImQoAcuwQIylGnUbMsbDKoT9BEESnFSZ4aPCSpMOfISwBBbCrUbq8u+i5OiYltFD3UKcmkAegAqKAB9BMSkxNoIFmAoAGEAQxY0+OTCuKhoyMk4AFswAHsUDIBvKABRAEd2bIQAGmaGSABjDIBfKFwUaoqoAHIAAVkIAFo+gAsOhAgMAHM0yPZgRBZJ6TmoPtz8mgBtSSge-uBiVvb1YPt-Hld3Q2IARigAHygACZ-lAAMwgziOd7kbq-AHAgGg8gw663CADB5tDpBBSvKHONxYULESbVQiTEGTYAAd2qFIBVKWKAgEHpgkMMKmZNZlJpdN5TJZk2RnVRTV66Puj2xLz8+KIhOJcKmfLZBjUELezk5yqptOFKJu4rumKeON8Dm4BM+nkhVqInOEqBFYolGOlz1xcvtHyJX3VCEdpmdhrR7qxnotWoVNvUdoCWBBAaDZhdAF0gA)

### 2.2. Modify reducer

Remember what we did for the type challenge. Let's extend our solution to support optional paths:

![Extend GetWithArray solution for objects](/typed-get/get-with-array-v2.5.png)

1. We need to make sure the key exists in the keys of an optional object
2. Otherwise, we assume it doesn't exist

![GetWithArray for objects, version 3](/typed-get/get-with-array-v3.png)

Let's add tests and check if it's working in the [Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAYglgG2BATgVQHYBMIDM4YRYA8AKgHxQC8UpUEAHstgM5QCu2eBRUA-FEIA3VFABctAFCTQkWImQoAcuwQIylGnUbMsbDKoT9BEESnFSZ4aPCSpMOfISwBBbCrUbq8u+i5OiYltFD3UKcmlZaABxCGAAdThgAAsXFBQAQxBiAHkAGigAaU0i+iYIVigAbQBdSShjHPqLQrLdNiqCXFFCiBACgDohrtEAJQgWYDqGhoFekDaKvSgAaz6Ae1woJpmZgViEpNT0rNyq+ZqC8cmI3YaJecXKtZBNn0UHbmc3LFDc27usygB0SKTSmWywXs-h4rnchn+5z6lyg12AlAAPhwYc5moCJJxHLC8RZhKhpAB6ABUUAA+vSGYyGbQJsAoABhDIsCZ0pl82lQKkUyRwAC2YHWKDZAG8oABRACO7AyCAKcoYkAAxmyAL5QXAodaiqAAcgAAlEALSa5IqhAVADmEwp7GAiBYJsi1igAAVDVh2Nq4OsMDkAEYAKwg2u80uaOBYmpQcDAbpDfAkk2TGAdzTdwHtmeA2dzDSwGWQRZLzQyruSkozUDjuwwGVFECrBFLMwQ601FeDGEbzbumqSIE7OZJOuaM5nVjk-e5bBoVWa6q1wGIiuV6hBR3Bpz96wDQZD4aj2oKVRN+ftJpq5AKWa75Cf6410a3O5VxH3YJObJj1PNNQ0jL9rxNctkAfJ8oBfHM3zyD9N23JVf3-Y4IWIYDA1Ai8IOqKCJiTFNQNg59iy7KAsUJL4iCQlCvzQ3c-ziUEsKPf08MHAiryI2sUklE0ChNVt2wo+CqJzGjsSJZxGIaDdmJ-Pd2IPQCcO4s8wMvYBIME+sUBE01e37cjRLHUBJIQh1ZLogIsEU+VP21FiMPUgDsNwnS+P0gS62EyyMhQLATLE9hRTDVBJIc2FGJqIA)

Good job ✅

## 3. Accessing arrays and tuples

The next desired step for us is to support arrays and tuples:

![Problem 2 with Get for type challenge](/typed-get/problem-2-with-get-for-type-challenge.png)

In JavaScript it would look like this:

![Get function for arrays in JS](/typed-get/get-for-arrays-in-js.png)

Here, a key can be either a `string` or a `number`. We already know how to get the keys with `Path`:

![Path transforms a string into keys](/typed-get/path-v2.png)

### 3.1. Reducing arrays

As for objects, we can similarly call `keys.reduce` for arrays. To do so, we will implement the same type `GetWithArray` but for arrays and then combine two solutions of `GetWithArray` in one.

First, let's take a basic implementation for objects and adapt it for arrays. We use `A` instead of `O` for semantic reasons:

![GetWithArray for arrays, version 1](/typed-get/get-with-array-for-arrays-v1.png)

After testing in the [Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwHUCWwAWBBATpghiAPOgDRQDSAfFALxlQQAewEAdgCYDOUA2gLoBQUKAH4o6AVABctBkzacuSZgDMImMhBAkAdDsUq1AJQjtg-QYJGkNdRiw5QA1hoD2S0ePPDY8ZGiy4CdC4rEB4SIxNyD3MpZggAN1Vo2ISkvgB6ACooAH08-IL8qAAVY2AoAGEcdmNcwvqcqEz0viQAWzBnTHKAbygAUQBHAFccABsSfvpIAGNygF8oJUxnNqgAcgABUEgAWhnUcbGWAHNjdOHgJDH2db4+HehSkwB5ACMAKwg56m5xdPSUAADOIAAYAZRmKzGYzeODUM2GJlWSHYOCuzmYoKI-0BAEYwQAmIF4gAcuzxQN2QIALNjcVBCeIuNEAYytCDPCZMIoTjjPGzCVoCZ4ABTc3lQAA+UGYwzab1UAEpePzzIKtEzPJgIDhWJixiBZfLFZheOJ+DwANz3R5QGbVWo0FmCKazYD4IajMb4OCIFAYbB4fDPYDvL5zEhcdZA9Y8cgkCFQ5wwuEIpHAFFojFY8gJ8Ru74er3jX0+AP+YOh8NFqPrPFxhNQUHEskUqm00F5tWFuaekalv2+QMBENlGuR7jrQnrEgxxskCXME7dgvTIv971l-1+IMEaufWtTmdzhtz2PxxfAHnL6XGhWqO-DNgQJSKCCsVeu9d9ks+ocVnuY6vIek7RieGwQdOC73qaT4vm+cSfvm37upug7lruo4HhGwB1gAzDBz6sK+77ITiPBAA), we found several gaps:

1. Arrays cannot have a `string` key:

![Debugging normal arrays](/typed-get/debug-get-with-array-for-arrays-v1-for-normal-string-array.png)

Here `'1' extends keyof string[]` is `false` therefore it returns `never`.

2. Similarly for readonly arrays:

![Debugging readonly arrays](/typed-get/debug-get-with-array-for-arrays-v1-for-readonly-string-array.png)

3. Tuples (e.g. `[0, 1, 2]`) return `never` instead of `undefined`:

![Debugging tuples](/typed-get/debug-get-with-array-for-arrays-v1-for-tuples.png)

Let's fix that as well! 🚀

### 3.2. Infer `T | undefined`

![Extend GetWithArray solution for arrays](/typed-get/get-with-array-for-arrays-v1.5.png)

For arrays we want to get `T | undefined`, depending on the values inside the array. Let's infer that value:

![GetWithArray for arrays, version 2](/typed-get/get-with-array-for-arrays-v2.png)

We added `A extends readonly (infer T)[]` as all arrays extend readonly arrays.

Only need to fix the final case with tuples. Please check the tests in the [Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwHUCWwAWBBATpghiAPOgDRQDSAfFALxlQQAewEAdgCYDOUA2gLoBQUKAH4o6AVABctBkzacuSZgDMImMhBAkAdDsUq1AJQjtg-QYJGkNdRiw5QA1hoD2S0ePPDY8ZGiy4CdC4rEB4SIxNyD3MpdBtZe0wIHFZnZgAbECgACj1VKAAVAEpeaM8ROEQUDGw8fAKoAB8oAFc2CCVFCFZw42Aoz08pZggAN1Vo4bGJvgB6ACooAH0V1bXVwr6oAGEcdmNl9aOlqHnZviQAWzBnTGAoAG8oAFEARxacdJJn+kgAY3uAF8oEpMM5LlAAOQAAVAkAAtH9UJ90iwAObGWYtYBIdLsSF8Phw6AFPoAeQARgArCAA6jccSzWZQAAM4gABgBlP5g9LpCk4NR-FomcFIdg4HFpdlERnMgCMHIATCz5QAOeHylnwlkAFhlcqgSvEXGiTKNWjZnhMmEUaNlnnNSq0is82RtdqaUGYLUuFNUJTCZuZzuNniSKTSmW9vv9mFKgn4PAA3ITiVA-nsDjRTYIfv9gPg3h90vhKr4agF6uTqbTgCQuJCWZCeOQSFyec4+QKhSLgGKJVLmOzyG3xPm60X3p8yz5qv46qSTJSaQCG5D5S221B2Sr1ZrtXqR2O879J8WZ+X57UCEvgCu6+ulZCSE2tyQPcw0aOHS8zwCpxLWcqj8G9q2XWs124SFn1fTdX2bVsP2AW0vy9H0-XyZo2lYDoulYH9x3-QsL1LK9QKrO8HygxtYKhOiYPfGNMLUbD2k6EYCJPP8C0Ay85woxca1XetoIAZiYnC8M4wieCAA).

### 3.3. Tuples

At the moment, if we try to extract value by non-existing index from tuples, we will get the following:

![Debugging tuples](/typed-get/debug-get-with-array-for-arrays-v2-for-tuples.png)

To fix it, we need to distinguish tuples from arrays. Let's use `ExtendsTable` to find correct condition:

![ExtendsTable type function](/typed-get/extends-table.png)

Let's use it for different types:

1. `[0]`
2. `number[]`
3. `readonly number[]`
4. `any[]`

![Use ExtendsTable with different types](/typed-get/use-extends-table.png)

Let me create the table to clarify what is located inside `A`:

|                         | `[0]` | `number[]` | `readonly number[]` | `any[]` |
| ----------------------: | :---: | :--------: | :-----------------: | :-----: |
|               **`[0]`** |  ✅   |     ✅     |         ✅          |   ✅    |
|          **`number[]`** |  ❌   |     ✅     |         ✅          |   ✅    |
| **`readonly number[]`** |  ❌   |     ❌     |         ✅          |   ❌    |
|             **`any[]`** |  ❌   |     ✅     |         ✅          |   ✅    |

We just created the table of `extends` for TypeScript types.

If you see ✅ for the row and the column, it means the row type extends the column type. Several examples:

- `[0] extends [0]`
- `number[] extends readonly number[]`

On the other hand if it's ❌, the row type doesn't extend the column type. More examples:

- `number[] extends [0]`
- `readonly number[] extends number[]`

Let's take a closer look at row `any[]`: for column `[0]` it's ❌, but for other types it's ✅

This is actually an answer! 🔥🔥🔥

Let's rewrite `GetWithArray` using the condition `any[] extends A`:

![GetWithArray for arrays, final version](/typed-get/get-with-array-for-arrays-v3.png)

1. We distinguish arrays from tuples using `any[] extends A`
2. For arrays we infer `T | undefined`
3. For tuples, we extract their value if index exists
4. Otherwise, we return `undefined`

If you want to see it all in one place, don't forget to check out the [Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBA4hwHUCWwAWBBATpghiAPOgDRQDSAfFALxlQQAewEAdgCYDOUA2gLoBQUKAH4o6AVABctBkzacuSZgDMImMhBAkAdDsUq1AJQjtg-QYJE5mIXnUYsOo8eagB6V1BzY87Z+ZHodrKOmBA4rAD2zAA2IFAAFHqqUAAqAJS8fi4icIgoGN4EKVAAPlAArmwQSooQrCRGJuRZ5lKVrNW1rC3uUMDlYNHGLVKkGkEOnADWGhFKTi7ZsPDIaFi4BOhcYyA8DcbAzYutFVU1zHV+UhcAbqp8fK4AVFAA+u8fnx+pB1AAwjh2MY3l9Qa8oE9XHwkABbMARTDAKAAbygAFEAI7lHDREho+iQADGSIAvlAlJgIjCoAByAACoEgAFpCagcUNmABzYyucrAJDRdg0h6M6ApA4AeQARgArCDE6jccS9AAM4gABgBlQmU6LRKVeKCE8omKlIdg4flRdVEZUeACMGoATCr7QAOJn2lVMlUAFhtdqgTvEXD8vSdWjVLhMmEUnNtLnDWkdLniMbjpSgzHKMKlqgyezDHgjwZcoXCUViWZzecwmUE-B4AG4ReBoITAcCaKHBPiicB8JjsdF8LlVgUNvhxSZpXLiSQuDSVTSeOQSFqdRE9Qa1MbTTDzZakNbyGvxH35QOhzjRyt8us8FPJbLLwuafaV2uoOqXe7Pd6-XVU8E3RAlL0HLEbzHe9CifGcX3nbgaSdGkSCXT8SHTLlgPPMDiQg4dbzyNZYOnYBZ1fJCULQj80OXVdMOAWMuUzbNc2SMp2k6C5WBw3s8KvSCR2gkjJzIijEMXajaWk5CMOrdi1E4s4uj40D+wIqC71Ex9xIQ4A3wAZnkrjzjqHCeCAA) ✅

## 4. One solution

Now we have 2 solutions:

1. For objects

![GetWithArray for objects](/typed-get/get-with-array-v3.png)

2. For arrays and tuples

![GetWithArray for arrays](/typed-get/get-with-array-for-arrays-v3.png)

Let's move the details of the implementation to functions `ExtractFromObject` and `ExtractFromArray`:

![ExtractFromObject implementation](/typed-get/extract-from-object.png)

![ExtractFromArray implementation](/typed-get/extract-from-array.png)

As you can see, we’ve added restrictions to both functions:

1. `ExtractFromObject` has `O extends Record<PropertyKey, unknown>`. It means that it accepts only general objects
2. `ExtractFromArray` similarly has `A extends readonly any[]`, which means that it accepts only general arrays and tuples

This helps to distinguish cases and avoid mistakes while passing types. Let's reuse them in `GetWithArray`:

![GetWithArray, refactored version](/typed-get/get-with-array-v4.png)

I covered this refactoring with tests. Another [Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAYglgG2BATgVQHYBMIDM4YRYA8AKgHxQC8UpUEAHstgM5QCu2eBRUA-FEIA3VFABctAFChIsRMhQA5dggRlKNOo2ZY2GFQn6CIIlOKkzo8JKkw58hLAEFsy1eupyb6Lg6LFrBTc1CnJJaXBoAFEmFABDAGNgGBQAewBbAHkAIwArCCTiTPomCFYoACUC1JQSAAU0yBRQAGkIEAAaDgwAawxUgHcMci6WjSgWkp02HvbU3ChMySgjTIBtFoBdZfNJ7TLdKFmQea8FO25HFyxgorCVlYFA218eZ1cDO43NqAAfbvsbx2KwknEBjnCligMWA8SSKQyThQ8RAxCcUwObBQEDiWFSGAQICgcQwIDWm1G4xJZJ++3KTh2AnRdMO2Nx+MJUAAFARcKJSABKcnAox0f5gy5EEWg14QkETDHlY6nBkPIxOb7SgGSrCQyJQADiEGAAHU4MAABZIlFFSmePalcrCx6LHYSB3TKBrXmiNqdKAAOiDPrMVRYwG2aoExRZbCqCRq9UaqFa7S6nD6g2GIpdRtN5qtyLiqJhcOSaSyeQKwFtE3aI0qEHD9zV5hjjtZOLxBKJ1OdrdzxrNlutxeIpcS5cRRdRmVG9a6YeALYHMvBUrVEmEqHCAHoAFRQAD6J9PZ9PtCbwCgAGE4iwm8fz8+j1B97vJHB0mAateAN7QgAjuwcQIF0MSQEkUAAL5QLgFZQAA5AAApYAC0CQWqBCBlAA5k2u7sMAiAsIheqyA0qRYOwSRwPiOT5FBNB-jsxHADhEjhigBC4TsOAsAk3FgMR+J8JxsI8XxcTIFu7DpNkO4rHEREWjUYlQCxaoYHE6QQOJ3EYLxaoIKkCTSXRGDqZprYJOaID6ZJarQTszkrMAcS4Sw6lrIhbJJIhXSIZYAlCcAAVIUIcA4KkiGRlALBwLh2nAOw2LqYhTg4Qw7RQAAQqgEAAF4EGRKw-uGLASGy3acgBFrAOkCAOYZMH9qYCX4pV3JcTxfyCHJCkoEK2zOREshmQ+bA0GsOwQdW47AaBxB5sOhY2pR1G0fRVZJF0PlsThsUNj1hnkCMs0MJBNZRItagrQWo6ohtNEiRgDHVntiH8YJcDCRZR1dCduF9RKfhYGdHQXVdC0gXdQ4PTOxDPVtb07cAn1YNJEAA-18moBDUPzTdsPLfDI6I8jr3vbtXqIcplo1OFiHabpONAyDspEATKxzYUxNLfd5PrWkm1U2jn306pKBMyZZmvUztmgGzEkteKnPg+dPOXUTt2k-mQtjpTFnU+jtOS4zgWy+Z+JM7iWDYiwpGbA2oNvNz0La3zuuC2thsiy9xvi2bKkW0hglEGUxGgaRgUAAw467jju7z13e2TvtPf7KMm597meUz8fO4FflhRz64a5DWvQ-zcP6xnSNZ2LjGm-tHkx0hADMCfq8nnupyTPuPQ3VEB9tzefQlSXSal2NF0hmWMDl+XYsVGCIWXOq99Xad10PRtjx9tPlcA7eIYXDZ1Q1TXxSrwOwWr5dbzrA-p3vjeB+PR+pBVBdM-VjXKwMsDB+m9NYe23i-XeFN34Hxpj5dqFlT7n0BrfPq+g8ZmBAWDAmmwgA) is waiting for you 🚀.

## 5. Binding to JavaScript

Let's return to the solution on the JavaScript:

![Get function in Javascript](/typed-get/get-in-js-v1.png)

At the moment we use `lodash` in our project, e.g. function `get`. If you check [common/object.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/lodash/common/object.d.ts#L1022) in `@types/lodash`, you'll see that it's quite straightforward. The `get` call in playground returns `any` for most of the cases: [typescript-lodash-types](https://codesandbox.io/s/typescript-lodash-types-ndhvf?file=/src/index.type.ts:1379-1856)

Let's replace `reduce` with any `for` loop (e.g. `for-of`) to have early exit in case `value` is `undefined` or `null`:

![Get function in JavaScript, version 2](/typed-get/get-in-js-v2.png)

Let's try to cover the `get` function with types we just wrote. Let's divide it into 2 cases:

1. `Get` type can be used _iff_ (if and only if) all the restrictions can be applied and the type is correctly inferred
2. A Fallback type is applied _iff_ the validation is not passed (e.g. we pass `number` but expected `string` in `path`)

To have 2 type overloads we need to use `function`:

![Get function with fallback types, version 3](/typed-get/get-in-js-v3-fallback.png)

The implementation is ready ✅

But we still need to use our `Get` type, let's add it:

![Get function, final version](/typed-get/get-in-js-v4.png)

Please check the final solution in [Codesandbox 📦](https://codesandbox.io/s/typescript-get-implementation-types-gnsvo?file=/src/get/index.type.ts:1584-1598):

1. We added [the implementation of get with types 🔥](https://codesandbox.io/s/typescript-get-implementation-types-gnsvo?file=/src/get/index.ts:1027-1096)
2. We covered [the types with tests 🧪](https://codesandbox.io/s/typescript-get-implementation-types-gnsvo?file=/src/get/index.type.ts:1584-1598)
3. We covered the [get function with tests 🧪](https://codesandbox.io/s/typescript-get-implementation-types-gnsvo?file=/src/get/index.test.ts:490-516)

## Summary

To solve the challenge we needed to know several TypeScript concepts:

1. [Tuples](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-1-3.html#tuple-types) were introduced in TypeScript 1.3, but [Variadic Tuple Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types) were only released in TypeScript 4.0 so we can use spread inside them:

![Example of a tuple](/typed-get/tuples.png)

![Example of variadic tuple types](/typed-get/variadic-tuple-types.png)

2. [Conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#conditional-types) which were introduced in TypeScript 2.8

![Example of a conditional type](/typed-get/conditional-types.png)

3. [`infer` keyword in conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types) which was also introduced in TypeScript 2.8

![Example of an infer keyword in conditional types](/typed-get/infer-keyword-in-conditional-types.png)

4. [Recursive conditional types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#recursive-conditional-types), which were introduced in TypeScript 4.1

![Example of recursive conditional types](/typed-get/recursive-conditional-types.png)

5. [Template Literal types](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#template-literal-types), which were also introduced in TypeScript 4.1

![Example of template literal types](/typed-get/template-literal-types.png)

6. [Generic Constrains](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)

![Example of generic constrains](/typed-get/example-of-generic-constrains.png)

7. [Function Overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)

![Example of function overloads](/typed-get/function-overloads.png)
