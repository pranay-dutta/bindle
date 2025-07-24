export const toNormalCase = (inputString: string) => {
  return inputString.toLowerCase().replace(/(^|\s)\w/g, (c) => c.toUpperCase());
};
