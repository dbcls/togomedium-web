export const stringToBoolean = (str: string): boolean => {
  return str.toLowerCase() === "true";
};
export const booleanToString = (bool: boolean): BooleanString => {
  return bool ? "true" : "false";
};
