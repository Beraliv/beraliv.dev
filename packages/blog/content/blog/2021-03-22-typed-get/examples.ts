/** Featured */

// type Get<O, P> = never // implementation

type Step1 = Get<
  {
    posts: [
      { title: `Scrollbar customisation`; date: `2018-10-04` },
      { title: `What's inside Udemy player`; date: `2020-01-07` }
    ]
  },
  "posts.0.title"
>
type Step2 = Get<
  [
    { title: `Scrollbar customisation`; date: `2018-10-04` },
    { title: `What's inside Udemy player`; date: `2020-01-07` }
  ],
  "0.title"
>
type Step3 = Get<
  { title: `Scrollbar customisation`; date: `2018-10-04` },
  "title"
>
type Step4 = Get<`Scrollbar customisation`, "">

type Result = `Scrollbar customisation`

/** Conditional type */

type FilterUndefined<T> = T extends undefined ? never : T

/** infer keyword in conditional types */

type AnyFunction = (...args: any) => any

type MyParameters<T extends AnyFunction> = T extends (...args: infer P) => any
  ? P
  : never

/* get */

const get = (obj, path) => {
  const keys = path.split(".")

  return keys.reduce((currentObj, key) => currentObj[key], obj)
}

/** Path */

type PathV1<T> = T extends `${infer Key}.${infer Rest}`
  ? [Key, ...PathV1<Rest>]
  : []

type Path<T> = T extends `${infer Key}.${infer Rest}`
  ? [Key, ...Path<Rest>]
  : T extends `${infer Key}`
  ? [Key]
  : []

/** GetWithArray */

type GetWithArrayV1<O, K> = K extends [infer Key, ...infer Rest]
  ? Key extends keyof O
    ? GetWithArrayV1<O[Key], Rest>
    : never
  : never

type GetWithArray<O, K> = K extends []
  ? O
  : K extends [infer Key, ...infer Rest]
  ? Key extends keyof O
    ? GetWithArray<O[Key], Rest>
    : never
  : never

/** Get */

type Get<O, P> = GetWithArray<O, Path<P>>

/** Recursive conditional types */

type ElementType<T> = T extends ReadonlyArray<infer U> ? ElementType<U> : T

/** Problem 1 with current solution */

type ProductionObject = {
  description?: string
  title: string
  date: string
  author?: {
    name: string
    location?: {
      city: string
    }
  }
}

type Step1 = Get<ProductionObject, "author">
/** ✅
  {
    name: string;
    location?: {
        city: string;
    } | undefined;
  } | undefined
 */

type Step2 = Get<Step1, "name">
// never ❌

/** FilterUndefined & FilterNull */

type FilterUndefined<T> = T extends undefined ? never : T

type FilterNull<T> = T extends null ? never : T

type FilterUndefinedAndNull<T> = FilterUndefined<FilterNull<T>>

/** Updated GetWithArray */

type GetWithArray<O, K> = K extends []
  ? O
  : K extends [infer Key, ...infer Rest]
  ? Key extends keyof O
    ? GetWithArray<O[Key], Rest>
    : never // <- let's update this branch 🔄
  : never

type GetWithArray<O, K> = K extends []
  ? O
  : K extends [infer Key, ...infer Rest]
  ? Key extends keyof O
    ? GetWithArray<O[Key], Rest>
    : Key extends keyof FilterUndefinedAndNull<O>
    ? GetWithArray<FilterUndefinedAndNull<O>[Key], Rest> | undefined
    : undefined
  : never

/* GetWithArray with arrays */

// Expect `string | undefined` but got `string` ❌
type A1 = GetWithArray<ProductionObject, ["keywords", 0]>
// Expect `string | undefined` but got `undefined` ❌
type A2 = GetWithArray<ProductionObject, ["keywords", "0"]>

/* ArrayElement test cases */

const arr = [0, 1, 2, 3]
const constArr = [0, 1, 2, 3] as const

type cases = [
  Expect<Equal<ArrayElement<[0, 1, 2, 3], "0">, 0>>,
  Expect<Equal<ArrayElement<[0, 1, 2, 3], "4">, undefined>>,
  Expect<Equal<ArrayElement<typeof constArr, "1">, 1>>,
  Expect<Equal<ArrayElement<typeof constArr, "5">, undefined>>,
  Expect<Equal<ArrayElement<number[], "2">, number | undefined>>,
  Expect<Equal<ArrayElement<number[], "3">, number | undefined>>,
  Expect<
    Equal<ArrayElement<(number | string)[], "4">, number | string | undefined>
  >,
  Expect<Equal<ArrayElement<(number | undefined)[], "4">, number | undefined>>,
  Expect<Equal<ArrayElement<typeof arr, "0">, number | undefined>>,
  Expect<Equal<ArrayElement<typeof arr, "1">, number | undefined>>,
  Expect<Equal<ArrayElement<readonly number[], "2">, number | undefined>>,
  Expect<Equal<ArrayElement<readonly number[], "3">, number | undefined>>
]

type cases2 = [
  /* also support number-to-number */
  Expect<Equal<ArrayElement<[0, 1, 2, 3], "0">, 0>>,
  Expect<Equal<ArrayElement<[0, 1, 2, 3], "1">, 1>>,
  Expect<Equal<ArrayElement<[0, 1, 2, 3], "2">, 2>>,
  Expect<Equal<ArrayElement<[0, 1, 2, 3], "3">, 3>>,
  Expect<Equal<ArrayElement<[0, 1, 2, 3], "4">, undefined>>,
  Expect<Equal<ArrayElement<typeof constArr, "0">, 0>>,
  Expect<Equal<ArrayElement<typeof constArr, "1">, 1>>,
  Expect<Equal<ArrayElement<typeof constArr, "2">, 2>>,
  Expect<Equal<ArrayElement<typeof constArr, "3">, 3>>,
  Expect<Equal<ArrayElement<typeof constArr, "4">, undefined>>,
  Expect<Equal<ArrayElement<number[], "0">, number | undefined>>,
  Expect<Equal<ArrayElement<number[], "1">, number | undefined>>,
  Expect<Equal<ArrayElement<number[], "2">, number | undefined>>,
  Expect<Equal<ArrayElement<number[], "3">, number | undefined>>,
  Expect<Equal<ArrayElement<number[], "4">, number | undefined>>,
  Expect<
    Equal<ArrayElement<(number | string)[], "4">, number | string | undefined>
  >,
  Expect<Equal<ArrayElement<(number | undefined)[], "4">, number | undefined>>,
  Expect<Equal<ArrayElement<typeof arr, "0">, number | undefined>>,
  Expect<Equal<ArrayElement<typeof arr, "1">, number | undefined>>,
  Expect<Equal<ArrayElement<typeof arr, "2">, number | undefined>>,
  Expect<Equal<ArrayElement<typeof arr, "3">, number | undefined>>,
  Expect<Equal<ArrayElement<typeof arr, "4">, number | undefined>>,
  Expect<Equal<ArrayElement<readonly number[], "0">, number | undefined>>,
  Expect<Equal<ArrayElement<readonly number[], "1">, number | undefined>>,
  Expect<Equal<ArrayElement<readonly number[], "2">, number | undefined>>,
  Expect<Equal<ArrayElement<readonly number[], "3">, number | undefined>>,
  Expect<Equal<ArrayElement<readonly number[], "4">, number | undefined>>
]

/* ArrayElement, v1 */

type ArrayElement<A, K> = K extends keyof A ? A[K] : undefined

/* ArrayElement, v2 */

type ArrayElement<A, K> = K extends keyof A
  ? A[K]
  : A extends (infer T)[]
  ? T | undefined
  : undefined

/* Extends */

type ExtendsTableRow<T extends any[], E extends any> = {
  [K in keyof T]: E extends T[K] ? true : false
}

type ExtendsTable<T extends any[]> = {
  [K in keyof T]: ExtendsTableRow<T, T[K]>
}

type A = ExtendsTable<[[0], number[], readonly number[], any[]]>

/* ArrayElement, final solution */

type ArrayElement<A, K> = any[] extends A
  ? A extends (infer T)[]
    ? T | undefined
    : A extends readonly (infer T)[]
    ? T | undefined
    : undefined
  : A extends readonly any[]
  ? K extends keyof A
    ? A[K]
    : undefined
  : undefined
