import {
  type ComponentsWithComponentsResponse,
  type ComponentWithComponentsParams,
  PATH_COMPONENTS_WITH_COMPONENTS,
} from "%api/componentsWithComponents/definitions";
import { makeApiUrl } from "%core/network/makeApiUrl";
import {
  appDataSchema,
  GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION,
} from "%stanza/stanzas/gmdb-medium-builder/schema/appData";
import {
  mapDraftAppDataToAppState,
  type GmdbMediumBuilderDraftIdFactory,
  type GmdbMediumBuilderDraftMapperWarning,
} from "%stanza/stanzas/gmdb-medium-builder/schema/appDataMapper";
import type { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { nanoid } from "nanoid";
import type { ZodError } from "zod";

export type MediumBuilderImportErrorCode =
  | "file-read-failed"
  | "invalid-json"
  | "unsupported-schema-version"
  | "schema-validation-failed"
  | "mapper-failed";

export type MediumBuilderImportError = {
  code: MediumBuilderImportErrorCode;
  message: string;
  detail?: string;
};

export type MediumBuilderImportWarning =
  | GmdbMediumBuilderDraftMapperWarning
  | {
      code: "component-candidates-fetch-failed";
      path: [];
      message: string;
      error: unknown;
    };

export type MediumBuilderImportResult =
  | {
      success: true;
      state: AppState;
      warnings: MediumBuilderImportWarning[];
    }
  | {
      success: false;
      error: MediumBuilderImportError;
      warnings: MediumBuilderImportWarning[];
    };

export type MediumBuilderImportDependencies = {
  readFileText?: (file: File) => Promise<string>;
  fetchComponents?: () => Promise<ComponentsWithComponentsResponse>;
  createId?: GmdbMediumBuilderDraftIdFactory;
};

export const importMediumBuilderDraftJson = async (
  file: File,
  dependencies: MediumBuilderImportDependencies = {},
): Promise<MediumBuilderImportResult> => {
  const readFileText = dependencies.readFileText ?? ((targetFile) => targetFile.text());
  const createId = dependencies.createId ?? createMediumBuilderImportId;
  const fetchComponents = dependencies.fetchComponents ?? fetchMediumBuilderComponentCandidates;
  const warnings: MediumBuilderImportWarning[] = [];

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
  if (schemaVersion !== GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION) {
    return {
      success: false,
      warnings,
      error: {
        code: "unsupported-schema-version",
        message: "Import failed.",
        detail: `Unsupported schemaVersion. Expected ${GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION}.`,
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

export const logMediumBuilderImportWarnings = (
  warnings: readonly MediumBuilderImportWarning[],
  warn: (...data: unknown[]) => void = console.warn,
) => {
  for (const warning of warnings) {
    const location = warning.path.length > 0 ? ` at ${formatPath(warning.path)}` : "";

    if (warning.code === "component-candidates-fetch-failed") {
      warn(`[MediumBuilderImport] ${warning.message}`, warning.error);
      continue;
    }

    warn(`[MediumBuilderImport] ${warning.code}${location}: ${warning.message}`);
  }
};

const createMediumBuilderImportId: GmdbMediumBuilderDraftIdFactory = (params) => {
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
  warnings: MediumBuilderImportWarning[],
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

const fetchMediumBuilderComponentCandidates =
  async (): Promise<ComponentsWithComponentsResponse> => {
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
