import is from "@sindresorhus/is";

type ClassName = string | Record<string, boolean> | undefined;

export const classNames = (...args: ClassName[]): string => {
  const array = [];

  for (const arg of args) {
    if (is.string(arg)) {
      array.push(arg);
      continue;
    }

    if (is.object(arg)) {
      const keys = Object.keys(arg);

      for (const key of keys) {
        const value = arg[key];

        if (value) {
          array.push(key);
        }
      }
    }
  }

  return array.join(" ");
};
