import { QueryData } from "%stanza/state/media-finder/queryData";
import { isArray } from "is-what";

export const queryDataToInfoText = (data: QueryData | null): string => {
  if (!data) {
    return "";
  }
  return Object.entries(data)
    .map(([key, value]) => {
      let valueText: string;
      if (isArray(value)) {
        valueText = value.join(", ");
      } else {
        valueText = value ?? "";
      }
      return `${key}${valueText ? ":" : ""}${valueText}`;
    })
    .join(" / ");
};
