export const capitalize = (word: string): string => {
  return word.replace(/\b(\w)/g, (s) => s.toUpperCase());
};
