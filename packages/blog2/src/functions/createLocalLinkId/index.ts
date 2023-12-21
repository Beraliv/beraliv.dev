export const createLocalLinkId = (sentence: string): string => {
  const lowerCase = sentence.toLowerCase();
  const noPunctuation = lowerCase.replace(/[^\w\-\s]/g, "");
  const trimmed = noPunctuation.trim();
  const connected = trimmed.replace(/\s+/g, "-");
  return connected;
};
