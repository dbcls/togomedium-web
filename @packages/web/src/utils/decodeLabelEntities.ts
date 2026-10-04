import { decodeHTMLEntities } from "%core/string/decodeHtmlEntities";

/** Decode entity tokens only, preserving markup as text for React to escape. */
export const decodeLabelEntities = (label: string): string =>
  label.replace(/&(?:#[0-9]+|#x[0-9a-f]+|[a-z][a-z0-9]+);/gi, decodeHTMLEntities);
