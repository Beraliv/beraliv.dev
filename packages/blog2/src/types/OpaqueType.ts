declare const __TYPE__: unique symbol;

export type OpaqueType<T, U extends string> = T & {
  readonly [__TYPE__]: U;
};
