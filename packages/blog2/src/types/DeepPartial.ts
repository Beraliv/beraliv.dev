export type DeepPartial<T> = Partial<
  {
    [K in keyof T]: T[K] extends Record<string, unknown>
      ? DeepPartial<T[K]>
      : T[K];
  }
>;
