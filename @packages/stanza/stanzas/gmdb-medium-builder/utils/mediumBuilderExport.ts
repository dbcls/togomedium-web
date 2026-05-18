import { mapAppStateToDraftAppData } from "%stanza/stanzas/gmdb-medium-builder/schema/appDataMapper";
import type { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";

export type MediumBuilderDraftDownload = {
  filename: string;
  json: string;
};

export type MediumBuilderDraftDownloadOptions = {
  now?: Date;
  document?: Document;
  url?: Pick<typeof URL, "createObjectURL" | "revokeObjectURL">;
};

const FALLBACK_FILENAME_PREFIX = "medium-builder-draft";
const JSON_MIME_TYPE = "application/json";

export const createMediumBuilderDraftFilename = (title: string, now = new Date()): string => {
  const basename = createFilenameBasename(title) || FALLBACK_FILENAME_PREFIX;

  return `${basename}-${formatLocalDate(now)}.json`;
};

export const createMediumBuilderDraftJson = (state: AppState): string => {
  return JSON.stringify(mapAppStateToDraftAppData(state), null, 2);
};

export const downloadMediumBuilderDraft = (
  state: AppState,
  options: MediumBuilderDraftDownloadOptions = {},
): MediumBuilderDraftDownload => {
  const json = createMediumBuilderDraftJson(state);
  const filename = createMediumBuilderDraftFilename(state.document.title, options.now);

  downloadTextFile({
    content: json,
    filename,
    mimeType: JSON_MIME_TYPE,
    documentRef: options.document ?? globalThis.document,
    urlRef: options.url ?? globalThis.URL,
  });

  return { filename, json };
};

const createFilenameBasename = (title: string): string => {
  const sanitizedTitle = Array.from(title.normalize("NFKC"))
    .filter((character) => character.charCodeAt(0) > 31 && !`"*/:<>?\\|`.includes(character))
    .join("");

  return sanitizedTitle
    .trim()
    .replace(/\s+/gu, "-")
    .replace(/-+/gu, "-")
    .replace(/^[.-]+|[.-]+$/gu, "");
};

const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const downloadTextFile = ({
  content,
  filename,
  mimeType,
  documentRef,
  urlRef,
}: {
  content: string;
  filename: string;
  mimeType: string;
  documentRef: Document | undefined;
  urlRef: Pick<typeof URL, "createObjectURL" | "revokeObjectURL"> | undefined;
}) => {
  if (!documentRef || !urlRef?.createObjectURL || !urlRef?.revokeObjectURL) {
    throw new Error("Browser download APIs are unavailable.");
  }

  const blob = new Blob([content], { type: mimeType });
  const objectUrl = urlRef.createObjectURL(blob);
  const anchor = documentRef.createElement("a");

  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.style.display = "none";

  try {
    documentRef.body.append(anchor);
    anchor.click();
  } finally {
    anchor.remove();
    urlRef.revokeObjectURL(objectUrl);
  }
};
