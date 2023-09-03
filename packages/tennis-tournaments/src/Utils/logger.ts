interface LoggerOptions {
  enabled: boolean;
}

type SerialisablePrimitive = boolean | number | string;

type SerialisableArgument =
  | SerialisablePrimitive
  | Record<string, SerialisablePrimitive>;

const createLogger = ({ enabled }: LoggerOptions) => {
  const log = (message: string, ...args: SerialisableArgument[]) => {
    if (!enabled) {
      return;
    }

    console.log(message, ...args);
  };

  const warn = (message: string, ...args: SerialisableArgument[]) => {
    if (!enabled) {
      return;
    }

    console.warn(message, ...args);
  };

  return {
    log,
    warn,
  };
};

const logger = createLogger({
  enabled: true,
});

export { logger };
