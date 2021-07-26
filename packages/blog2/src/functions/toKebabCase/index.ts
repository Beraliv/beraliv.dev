export const toKebabCase = (sentence: string): string => {
  return sentence.replace(/ /g, "-");
};
