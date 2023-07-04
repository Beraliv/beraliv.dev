const convertWordToPascalCase = (word: string): string => {
  if (word === "") {
    return word;
  }

  return `${word[0].toUpperCase()}${word.slice(1, word.length)}`;
};

export { convertWordToPascalCase };
