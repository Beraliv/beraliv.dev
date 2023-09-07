interface LoggerOptions {
  enabled: boolean;
}

type SerialisablePrimitive = boolean | number | string;

type SerialisableArgument =
  | SerialisablePrimitive
  | Record<string, SerialisablePrimitive>;

type MethodName = "log" | "warn" | "error";

const createLogger = ({ enabled }: LoggerOptions) => {
  const flaggedProxy =
    <Arguments extends readonly any[]>(method: MethodName) =>
    (...args: Arguments) => {
      if (!enabled) {
        return;
      }

      console[method](...args);
    };

  return {
    log: flaggedProxy<
      [message: String, ...args: readonly SerialisableArgument[]]
    >("log"),
    warn: flaggedProxy<
      [message: String, ...args: readonly SerialisableArgument[]]
    >("warn"),
    error: flaggedProxy<[error: unknown]>("error"),
  };
};

const logger = createLogger({
  enabled: true,
});

export { logger };
