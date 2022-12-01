const cx = (...classes: (string | Record<string, boolean>)[]) => {
  const filteredClasses = [];

  for (const c of classes) {
    if (typeof c === "string") {
      filteredClasses.push(c);
    } else if (typeof c === "object") {
      for (const [key, value] of Object.entries(c)) {
        if (value) {
          filteredClasses.push(key);
        }
      }
    }
  }

  return filteredClasses.join(" ");
};

export { cx };
