export const loadBooleanSetting = (
  key: string,
  defaultValue: boolean = false
): boolean => {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? stored === "true" : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const saveBooleanSetting = (key: string, value: boolean): void => {
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // Silently fail if localStorage is unavailable
  }
};

export const loadStringSetting = (
  key: string,
  defaultValue: string = ""
): string => {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? stored : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const saveStringSetting = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Silently fail if localStorage is unavailable
  }
};
