const isDefined = Boolean as unknown as <TValue>(
  value: TValue
) => value is NonNullable<TValue>;

export { isDefined };
