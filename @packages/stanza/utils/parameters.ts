/** Validate an HTML string parameter without coercing other runtime values. */
export const readStringParameter = (value: unknown, name: string): string => {
  if (typeof value !== "string") {
    throw new TypeError(`Stanza parameter "${name}" must be a string.`);
  }
  return value;
};

/** V4 represents an omitted nonboolean attribute as undefined. */
export const readOptionalStringParameter = (value: unknown, name: string): string | undefined => {
  return value === undefined ? undefined : readStringParameter(value, name);
};
