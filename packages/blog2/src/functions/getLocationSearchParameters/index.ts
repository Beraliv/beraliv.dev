// ?label=typescript
export const getLocationSearchParameters = (
  search: string
): Record<string, string | undefined> => {
  // label=typescript
  const withoutQuestionMark = search.slice(1);
  // ['label=typescript']
  const parameters = withoutQuestionMark.split("&");
  // [['label', 'typescript']]
  const parameterEntries = parameters
    .filter((entry) => entry !== "")
    .map((entry) => entry.split("=") as [string, string]);
  // { label: 'typescript' }
  const parametersObject = Object.fromEntries(parameterEntries);

  return parametersObject;
};
