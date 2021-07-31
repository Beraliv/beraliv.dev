export const getCodeTitle = (meta: string | undefined): string | undefined => {
  if (!meta) {
    return undefined;
  }

  const matches = meta.match(/title=(?<title>.*)/);

  if (!matches) {
    return undefined;
  }
  if (!matches.groups) {
    return undefined;
  }
  const { title } = matches.groups;
  return title;
};
