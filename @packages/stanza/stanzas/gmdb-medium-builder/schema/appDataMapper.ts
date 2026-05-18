import {
  appDataSchema,
  DRAFT_SCHEMA_VERSION,
} from "%stanza/stanzas/gmdb-medium-builder/schema/appData";
import type { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { createInitialFeedbackState } from "%stanza/stanzas/gmdb-medium-builder/state/feedback";
import { createBlankDocumentProvenance } from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import type { ComponentRowModel } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import type { SolutionBlockModel } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";
import type { ZodError } from "zod";
import type { z } from "zod";

type DraftAppData = z.infer<typeof appDataSchema>;

type ComponentCandidate = {
  gmoId: string;
  name: string;
};

type DraftIdFactoryParams =
  | {
      kind: "solution";
      solutionIndex: number;
    }
  | {
      kind: "component";
      solutionIndex: number;
      componentIndex: number;
    };

type DraftIdFactory = (params: DraftIdFactoryParams) => string;

type DraftMapperWarningCode =
  | "null-normalized"
  | "gmo-id-validation-skipped"
  | "invalid-gmo-id"
  | "component-name-normalized";

type DraftMapperWarning = {
  code: DraftMapperWarningCode;
  path: (string | number)[];
  message: string;
};

type DraftImportOptions = {
  createId: DraftIdFactory;
  componentCandidates?: readonly ComponentCandidate[];
};

type DraftImportResult =
  | {
      success: true;
      state: AppState;
      draft: DraftAppData;
      warnings: DraftMapperWarning[];
    }
  | {
      success: false;
      error: ZodError;
      warnings: DraftMapperWarning[];
    };

export const mapAppStateToDraftAppData = (state: AppState): DraftAppData => {
  return {
    schemaVersion: DRAFT_SCHEMA_VERSION,
    title: state.document.title,
    description: state.document.description,
    provenance: mapDocumentProvenanceToDraft(state.document.provenance),
    solutions: state.document.solutions.flatMap((solutionId) => {
      const solution = state.entities.solutionBlocks.entities[solutionId];
      if (!solution) {
        return [];
      }

      return [
        {
          title: solution.title,
          description: solution.description,
          components: solution.components.flatMap((componentId) => {
            const component = state.entities.componentRows.entities[componentId];
            if (!component) {
              return [];
            }

            return [
              {
                gmoId: component.gmoId,
                component: component.component,
                volume: component.volume,
                unit: component.unit,
                concentrationValue: component.concentrationValue ?? null,
                concentrationUnit: component.concentrationUnit ?? "",
                note: component.note,
              },
            ];
          }),
        },
      ];
    }),
  };
};

export const mapDraftAppDataToAppState = (
  input: unknown,
  options: DraftImportOptions,
): DraftImportResult => {
  const parseResult = appDataSchema.safeParse(input);
  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error,
      warnings: [],
    };
  }

  const warnings: DraftMapperWarning[] = [];
  const draft = parseResult.data;
  const componentCandidateByGmoId = createComponentCandidateMap(options.componentCandidates);

  if (!componentCandidateByGmoId && hasAnyGmoId(draft)) {
    warnings.push({
      code: "gmo-id-validation-skipped",
      path: ["solutions"],
      message: "GMO ID validation was skipped because component candidates were not provided.",
    });
  }

  const solutionIds: string[] = [];
  const solutionBlockEntities: Record<string, SolutionBlockModel> = {};
  const componentRowIds: string[] = [];
  const componentRowEntities: Record<string, ComponentRowModel> = {};

  draft.solutions.forEach((solution, solutionIndex) => {
    const solutionId = options.createId({ kind: "solution", solutionIndex });
    const componentIds: string[] = [];

    solution.components.forEach((component, componentIndex) => {
      const componentId = options.createId({
        kind: "component",
        solutionIndex,
        componentIndex,
      });
      const normalizedGmoComponent = normalizeGmoComponent({
        gmoId: normalizeString(
          component.gmoId,
          ["solutions", solutionIndex, "components", componentIndex, "gmoId"],
          warnings,
        ),
        component: normalizeString(
          component.component,
          ["solutions", solutionIndex, "components", componentIndex, "component"],
          warnings,
        ),
        componentCandidateByGmoId,
        path: ["solutions", solutionIndex, "components", componentIndex],
        warnings,
      });

      componentIds.push(componentId);
      componentRowIds.push(componentId);
      componentRowEntities[componentId] = {
        id: componentId,
        gmoId: normalizedGmoComponent.gmoId,
        component: normalizedGmoComponent.component,
        volume: normalizeNumber(component.volume, [
          "solutions",
          solutionIndex,
          "components",
          componentIndex,
          "volume",
        ]),
        unit: normalizeString(
          component.unit,
          ["solutions", solutionIndex, "components", componentIndex, "unit"],
          warnings,
        ),
        concentrationValue: normalizeNumber(component.concentrationValue, [
          "solutions",
          solutionIndex,
          "components",
          componentIndex,
          "concentrationValue",
        ]),
        concentrationUnit: normalizeString(
          component.concentrationUnit,
          ["solutions", solutionIndex, "components", componentIndex, "concentrationUnit"],
          warnings,
        ),
        note: normalizeString(
          component.note,
          ["solutions", solutionIndex, "components", componentIndex, "note"],
          warnings,
        ),
      };
    });

    solutionIds.push(solutionId);
    solutionBlockEntities[solutionId] = {
      id: solutionId,
      title: normalizeString(solution.title, ["solutions", solutionIndex, "title"], warnings),
      description: normalizeString(
        solution.description,
        ["solutions", solutionIndex, "description"],
        warnings,
      ),
      components: componentIds,
    };
  });

  return {
    success: true,
    draft,
    warnings,
    state: {
      entities: {
        componentRows: {
          ids: componentRowIds,
          entities: componentRowEntities,
        },
        solutionBlocks: {
          ids: solutionIds,
          entities: solutionBlockEntities,
        },
      },
      document: {
        title: normalizeString(draft.title, ["title"], warnings),
        description: normalizeString(draft.description, ["description"], warnings),
        provenance: {
          importSourceGmId: normalizeString(
            draft.provenance.importSourceGmId,
            ["provenance", "importSourceGmId"],
            warnings,
          ),
          originalMediaId: normalizeString(
            draft.provenance.originalMediaId,
            ["provenance", "originalMediaId"],
            warnings,
          ),
          sourceUrl: normalizeString(
            draft.provenance.sourceUrl,
            ["provenance", "sourceUrl"],
            warnings,
          ),
        },
        solutions: solutionIds,
      },
      feedback: createInitialFeedbackState(),
    },
  };
};

const normalizeString = (
  value: string | null,
  path: (string | number)[],
  warnings: DraftMapperWarning[],
): string => {
  if (value !== null) {
    return value;
  }

  warnings.push({
    code: "null-normalized",
    path,
    message: `Null at ${formatPath(path)} was normalized to an empty string.`,
  });
  return "";
};

const normalizeNumber = (value: number | null, _path: (string | number)[]): number | null => value;

const mapDocumentProvenanceToDraft = (provenance: AppState["document"]["provenance"]) => {
  if (!provenance) {
    return {
      importSourceGmId: null,
      originalMediaId: null,
      sourceUrl: null,
    };
  }

  const normalizedProvenance = createBlankDocumentProvenance(provenance);
  return {
    importSourceGmId: normalizedProvenance.importSourceGmId,
    originalMediaId: normalizedProvenance.originalMediaId,
    sourceUrl: normalizedProvenance.sourceUrl,
  };
};

const normalizeGmoComponent = ({
  gmoId,
  component,
  componentCandidateByGmoId,
  path,
  warnings,
}: {
  gmoId: string;
  component: string;
  componentCandidateByGmoId: Map<string, ComponentCandidate> | undefined;
  path: (string | number)[];
  warnings: DraftMapperWarning[];
}): Pick<ComponentRowModel, "gmoId" | "component"> => {
  if (!componentCandidateByGmoId || gmoId === "") {
    return { gmoId, component };
  }

  const candidate = componentCandidateByGmoId.get(gmoId);
  if (!candidate) {
    warnings.push({
      code: "invalid-gmo-id",
      path: [...path, "gmoId"],
      message: `Unknown GMO ID ${gmoId} was normalized to an empty string.`,
    });
    return { gmoId: "", component };
  }

  if (component !== candidate.name) {
    warnings.push({
      code: "component-name-normalized",
      path: [...path, "component"],
      message: `Component name for ${gmoId} was normalized to ${candidate.name}.`,
    });
    return { gmoId, component: candidate.name };
  }

  return { gmoId, component };
};

const createComponentCandidateMap = (
  componentCandidates: readonly ComponentCandidate[] | undefined,
) => {
  if (!componentCandidates) {
    return undefined;
  }

  const componentCandidateByGmoId = new Map<string, ComponentCandidate>();
  for (const candidate of componentCandidates) {
    if (candidate.gmoId !== "" && !componentCandidateByGmoId.has(candidate.gmoId)) {
      componentCandidateByGmoId.set(candidate.gmoId, candidate);
    }
  }
  return componentCandidateByGmoId;
};

const hasAnyGmoId = (draft: DraftAppData): boolean => {
  return draft.solutions.some((solution) =>
    solution.components.some((component) => component.gmoId !== null && component.gmoId !== ""),
  );
};

const formatPath = (path: (string | number)[]) => path.map(String).join(".");
