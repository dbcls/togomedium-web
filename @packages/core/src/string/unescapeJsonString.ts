export const unescapeJsonString = (str: string | undefined): string | undefined => {
  return str?.replace(/\\/g, "");
};
