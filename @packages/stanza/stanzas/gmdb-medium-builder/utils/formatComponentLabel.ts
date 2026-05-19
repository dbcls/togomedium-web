import { decodeHTMLEntities } from "%core/string/decodeHtmlEntities";

export const formatComponentLabel = (label: string): string => {
  return label.includes(";") ? decodeHTMLEntities(label) : label;
};
