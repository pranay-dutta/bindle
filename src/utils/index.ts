export const toNormalCase = (inputString: string) => {
  return inputString.toLowerCase().replace(/(^|\s)\w/g, (c) => c.toUpperCase());
};

export const toKebabCase = (inputString: string) => {
  return inputString.toLowerCase().replace(/\s+/g, "-");
};
