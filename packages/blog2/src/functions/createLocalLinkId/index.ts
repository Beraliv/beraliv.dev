export const createLocalLinkId = (sentence: string): string => {
  const lowerCase = sentence.toLowerCase();
  const noPunctuation = lowerCase.replace(/[\?\,]/g, "");
  const connected = noPunctuation.replace(/ /g, "-");
  return connected;
};
