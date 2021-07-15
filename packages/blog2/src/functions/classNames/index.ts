type ClassName = string | Record<string, boolean>;

export const classNames = (...args: ClassName[]): string => {
  const array = [];

  for (const arg of args) {
    if (typeof arg === "string") {
      array.push(arg);
      continue;
    }

    if (typeof arg === "object") {
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
