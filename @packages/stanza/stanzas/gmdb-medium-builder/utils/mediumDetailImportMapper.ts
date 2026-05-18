import type { MediumDetailResponse } from "%api/mediumDetail/definitions";
import type { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { createInitialFeedbackState } from "%stanza/stanzas/gmdb-medium-builder/state/feedback";
import type { ComponentRowModel } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import type { SolutionBlockModel } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";
import { nanoid } from "nanoid";

type MediumDetailTable = MediumDetailResponse["components"][number];
type MediumDetailComponent = MediumDetailTable["items"][number];

type MediumDetailIdFactoryParams =
  | {
      kind: "solution";
      tableIndex: number;
    }
  | {
      kind: "component";
      tableIndex: number;
      componentIndex: number;
    };

export type MediumDetailIdFactory = (params: MediumDetailIdFactoryParams) => string;

type MediumDetailImportOptions = {
  createId?: MediumDetailIdFactory;
};

export const mapMediumDetailResponseToAppState = (
  response: MediumDetailResponse,
  options: MediumDetailImportOptions = {},
): AppState => {
  const createId = options.createId ?? createMediumDetailImportId;
  const solutionIds: string[] = [];
  const solutionBlockEntities: Record<string, SolutionBlockModel> = {};
  const componentRowIds: string[] = [];
  const componentRowEntities: Record<string, ComponentRowModel> = {};

  response.components.forEach((table, tableIndex) => {
    const solutionId = createId({ kind: "solution", tableIndex });
    const componentIds: string[] = [];

    table.items.forEach((component, componentIndex) => {
      const componentId = createId({
        kind: "component",
        tableIndex,
        componentIndex,
      });

      componentIds.push(componentId);
      componentRowIds.push(componentId);
      componentRowEntities[componentId] = mapComponentToRow(component, componentId);
    });

    solutionIds.push(solutionId);
    solutionBlockEntities[solutionId] = mapTableToSolutionBlock(table, solutionId, componentIds);
  });

  return {
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
      title: response.meta.name,
      description: createDocumentDescription(response.meta),
      solutions: solutionIds,
    },
    feedback: createInitialFeedbackState(),
  };
};

const createMediumDetailImportId: MediumDetailIdFactory = (params) => {
  return `${params.kind}-${nanoid()}`;
};

const mapTableToSolutionBlock = (
  table: MediumDetailTable,
  id: string,
  components: string[],
): SolutionBlockModel => {
  return {
    id,
    title: table.subcomponent_name,
    description: "",
    components,
  };
};

const mapComponentToRow = (component: MediumDetailComponent, id: string): ComponentRowModel => {
  const displayComponent = getComponentDisplayName(component);

  return {
    id,
    gmoId: component.gmo_id ?? "",
    component: displayComponent,
    volume: component.volume ?? 0,
    unit: component.unit ?? "",
    note: createComponentNote(component, displayComponent),
  };
};

const getComponentDisplayName = (component: MediumDetailComponent): string => {
  if (component.label && component.label.trim() !== "") {
    return component.label;
  }

  return component.component_name;
};

const createComponentNote = (
  component: MediumDetailComponent,
  displayComponent: string,
): string => {
  const notes: string[] = [];

  if (component.component_name !== displayComponent) {
    notes.push(`Component name: ${component.component_name}`);
  }

  if (component.conc_value !== undefined || component.conc_unit !== undefined) {
    notes.push(`Concentration: ${formatConcentration(component)}`);
  }

  if (component.reference_media_id && component.reference_media_id !== "") {
    notes.push(`Reference medium ID: ${component.reference_media_id}`);
  }

  return notes.join("\n");
};

const formatConcentration = (component: MediumDetailComponent): string => {
  return [component.conc_value?.toString() ?? "", component.conc_unit ?? ""]
    .filter((value) => value !== "")
    .join(" ");
};

const createDocumentDescription = (meta: MediumDetailResponse["meta"]): string => {
  const descriptionLines = [
    `GM ID: ${meta.gm}`,
    meta.original_media_id ? `Original medium ID: ${meta.original_media_id}` : "",
    meta.ph ? `pH: ${meta.ph}` : "",
    meta.src_url ? `Source URL: ${meta.src_url}` : "",
  ];

  return descriptionLines.filter((line) => line !== "").join("\n");
};
