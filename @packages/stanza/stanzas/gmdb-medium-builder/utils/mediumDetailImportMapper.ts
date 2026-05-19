import type { MediumDetailResponse } from "%api/mediumDetail/definitions";
import type { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { createInitialFeedbackState } from "%stanza/stanzas/gmdb-medium-builder/state/feedback";
import { createBlankDocumentProvenance } from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import type { ComponentRowModel } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import type { SolutionBlockModel } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";
import { formatComponentLabel } from "%stanza/stanzas/gmdb-medium-builder/utils/formatComponentLabel";
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

type MediumDetailIdFactory = (params: MediumDetailIdFactoryParams) => string;

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
  const commentMap = createSolutionCommentMap(response);

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
    solutionBlockEntities[solutionId] = mapTableToSolutionBlock(
      table,
      solutionId,
      componentIds,
      commentMap.get(table.paragraph_index) ?? "",
    );
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
      provenance: createBlankDocumentProvenance({
        importSourceGmId: response.meta.gm,
        originalMediaId: response.meta.original_media_id ?? "",
        sourceUrl: response.meta.src_url,
      }),
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
  description: string,
): SolutionBlockModel => {
  return {
    id,
    title: table.subcomponent_name,
    description,
    components,
  };
};

const mapComponentToRow = (component: MediumDetailComponent, id: string): ComponentRowModel => {
  const displayComponent = getComponentDisplayName(component);

  return {
    id,
    gmoId: component.gmo_id ?? "",
    component: displayComponent,
    volume: component.volume ?? null,
    unit: component.unit ?? "",
    concentrationValue: component.conc_value ?? null,
    concentrationUnit: component.conc_unit ?? "",
    note: "",
  };
};

const getComponentDisplayName = (component: MediumDetailComponent): string => {
  if (component.label && component.label.trim() !== "") {
    return formatComponentLabel(component.label);
  }

  return formatComponentLabel(component.component_name);
};

const createDocumentDescription = (meta: MediumDetailResponse["meta"]): string => {
  const descriptionLines = [meta.ph ? `pH: ${meta.ph}` : ""];

  return descriptionLines.filter((line) => line !== "").join("\n");
};

const createSolutionCommentMap = (response: MediumDetailResponse): Map<number, string> => {
  const sortedTables = [...response.components].sort(
    (a, b) => a.paragraph_index - b.paragraph_index,
  );
  const commentsByTableParagraphIndex = new Map<number, string[]>();

  response.comments.forEach((comment) => {
    const table = findPreviousTable(sortedTables, comment.paragraph_index);

    if (!table || comment.comment === "") {
      return;
    }

    const comments = commentsByTableParagraphIndex.get(table.paragraph_index) ?? [];
    comments.push(comment.comment);
    commentsByTableParagraphIndex.set(table.paragraph_index, comments);
  });

  return new Map(
    [...commentsByTableParagraphIndex.entries()].map(([paragraphIndex, comments]) => [
      paragraphIndex,
      comments.join("\n"),
    ]),
  );
};

const findPreviousTable = (
  tables: MediumDetailTable[],
  paragraphIndex: number,
): MediumDetailTable | undefined => {
  let previousTable: MediumDetailTable | undefined;

  tables.forEach((table) => {
    if (table.paragraph_index < paragraphIndex) {
      previousTable = table;
    }
  });

  return previousTable;
};
