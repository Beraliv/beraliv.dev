export const fetchJson = async (...args: Parameters<typeof fetch>) => {
  const response = await fetch(...args);
  const json = await response.json();
  return json;
};
