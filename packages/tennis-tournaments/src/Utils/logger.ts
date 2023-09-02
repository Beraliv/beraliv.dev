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

  return {
    log,
  };
};

const logger = createLogger({
  enabled: false,
});

export { logger };
