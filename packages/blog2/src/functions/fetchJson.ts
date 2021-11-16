export const fetchJson = async <T>(
  ...args: Parameters<typeof fetch>
): Promise<T> => {
  const response = await fetch(...args);
  const json: T = await response.json();
  return json;
};
