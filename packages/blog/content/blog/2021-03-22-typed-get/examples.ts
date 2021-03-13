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
