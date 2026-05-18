import {
  type ComponentsWithComponentsResponse,
  type ComponentWithComponentsParams,
  PATH_COMPONENTS_WITH_COMPONENTS,
} from "%api/componentsWithComponents/definitions";
import { makeApiUrl } from "%core/network/makeApiUrl";
import {
  appDataSchema,
  DRAFT_SCHEMA_VERSION,
} from "%stanza/stanzas/gmdb-medium-builder/schema/appData";
import {
  mapDraftAppDataToAppState,
  type DraftIdFactory,
  type DraftMapperWarning,
} from "%stanza/stanzas/gmdb-medium-builder/schema/appDataMapper";
import type { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { nanoid } from "nanoid";
import type { ZodError } from "zod";

export type ImportErrorCode =
  | "file-read-failed"
  | "invalid-json"
  | "unsupported-schema-version"
  | "schema-validation-failed"
  | "mapper-failed";

export type ImportError = {
  code: ImportErrorCode;
  message: string;
  detail?: string;
};

export type ImportWarning =
  | DraftMapperWarning
  | {
      code: "component-candidates-fetch-failed";
      path: [];
      message: string;
      error: unknown;
    };

export type ImportResult =
  | {
      success: true;
      state: AppState;
      warnings: ImportWarning[];
    }
  | {
      success: false;
      error: ImportError;
      warnings: ImportWarning[];
    };

export type ImportDependencies = {
  readFileText?: (file: File) => Promise<string>;
  fetchComponents?: () => Promise<ComponentsWithComponentsResponse>;
  createId?: DraftIdFactory;
};

export const importDraftJson = async (
  file: File,
  dependencies: ImportDependencies = {},
): Promise<ImportResult> => {
  const readFileText = dependencies.readFileText ?? ((targetFile) => targetFile.text());
  const createId = dependencies.createId ?? createImportId;
  const fetchComponents = dependencies.fetchComponents ?? fetchComponentCandidatesFromApi;
  const warnings: ImportWarning[] = [];

  let fileText: string;
  try {
    fileText = await readFileText(file);
  } catch (error) {
    return {
      success: false,
      warnings,
      error: {
        code: "file-read-failed",
        message: "Import failed.",
        detail: error instanceof Error ? error.message : "The selected file could not be read.",
      },
    };
  }

  const parseResult = parseJson(fileText);
  if (!parseResult.success) {
    return {
      success: false,
      warnings,
      error: {
        code: "invalid-json",
        message: "Import failed.",
        detail: parseResult.detail,
      },
    };
  }

  const schemaVersion = getSchemaVersion(parseResult.value);
  if (schemaVersion !== DRAFT_SCHEMA_VERSION) {
    return {
      success: false,
      warnings,
      error: {
        code: "unsupported-schema-version",
        message: "Import failed.",
        detail: `Unsupported schemaVersion. Expected ${DRAFT_SCHEMA_VERSION}.`,
      },
    };
  }

  const schemaResult = appDataSchema.safeParse(parseResult.value);
  if (!schemaResult.success) {
    return {
      success: false,
      warnings,
      error: {
        code: "schema-validation-failed",
        message: "Import failed.",
        detail: formatZodError(schemaResult.error),
      },
    };
  }

  const componentCandidates = await fetchComponentCandidates(fetchComponents, warnings);
  const mapResult = mapDraftAppDataToAppState(schemaResult.data, {
    createId,
    ...(componentCandidates ? { componentCandidates } : {}),
  });

  warnings.push(...mapResult.warnings);

  if (!mapResult.success) {
    return {
      success: false,
      warnings,
      error: {
        code: "mapper-failed",
        message: "Import failed.",
        detail: formatZodError(mapResult.error),
      },
    };
  }

  return {
    success: true,
    state: mapResult.state,
    warnings,
  };
};

export const logImportWarnings = (
  warnings: readonly ImportWarning[],
  warn: (...data: unknown[]) => void = console.warn,
) => {
  for (const warning of warnings) {
    const location = warning.path.length > 0 ? ` at ${formatPath(warning.path)}` : "";

    if (warning.code === "component-candidates-fetch-failed") {
      warn(`[Import] ${warning.message}`, warning.error);
      continue;
    }

    warn(`[Import] ${warning.code}${location}: ${warning.message}`);
  }
};

const createImportId: DraftIdFactory = (params) => {
  return `${params.kind}-${nanoid()}`;
};

const parseJson = (
  text: string,
):
  | {
      success: true;
      value: unknown;
    }
  | {
      success: false;
      detail: string;
    } => {
  try {
    return { success: true, value: JSON.parse(text) as unknown };
  } catch (error) {
    return {
      success: false,
      detail: error instanceof Error ? error.message : "The selected file is not valid JSON.",
    };
  }
};

const getSchemaVersion = (value: unknown): unknown => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return undefined;
  }

  return (value as { schemaVersion?: unknown }).schemaVersion;
};

const fetchComponentCandidates = async (
  fetchComponents: () => Promise<ComponentsWithComponentsResponse>,
  warnings: ImportWarning[],
) => {
  try {
    const components = await fetchComponents();
    return components.map((component) => ({
      gmoId: component.gmo_id,
      name: component.name,
    }));
  } catch (error) {
    warnings.push({
      code: "component-candidates-fetch-failed",
      path: [],
      message: "Component candidates could not be fetched. GMO ID validation was skipped.",
      error,
    });
    return undefined;
  }
};

const fetchComponentCandidatesFromApi = async (): Promise<ComponentsWithComponentsResponse> => {
  const params: ComponentWithComponentsParams = { gmo_ids: "" };
  const url = makeApiUrl(PATH_COMPONENTS_WITH_COMPONENTS, new URLSearchParams(params));
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Component candidates request failed with HTTP ${response.status}.`);
  }

  return response.json() as Promise<ComponentsWithComponentsResponse>;
};

const formatZodError = (error: ZodError): string => {
  const firstIssue = error.issues[0];
  if (!firstIssue) {
    return "The selected file does not match the Medium Builder draft format.";
  }

  const location = firstIssue.path.length > 0 ? `${formatPath(firstIssue.path)}: ` : "";
  return `${location}${firstIssue.message}`;
};

const formatPath = (path: readonly unknown[]) => path.map(String).join(".");
