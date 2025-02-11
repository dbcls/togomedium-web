import { Optional } from "yohak-tools";

export const unescapeJsonString = (str: Optional<string>): Optional<string> => {
  return str?.replace(/\\/g, "");
};
