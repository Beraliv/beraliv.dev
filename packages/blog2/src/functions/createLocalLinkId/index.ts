export const createLocalLinkId = (sentence: string): string => {
  const lowerCase = sentence.toLowerCase();
  const noPunctuation = lowerCase.replace(/[^\w ]/g, "");
  const connected = noPunctuation.replace(/ /g, "-");
  return connected;
};
