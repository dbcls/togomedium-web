import type { MediumDetailResponse } from "%api/mediumDetail/definitions";

type MediumDetailTable = MediumDetailResponse["components"][number];
type MediumDetailComponent = MediumDetailTable["items"][number];
type MediumDetailComment = MediumDetailResponse["comments"][number];

type ReferenceMediumLoader = (gmId: string) => Promise<MediumDetailResponse>;

type ReferenceExpansionErrorCode = "reference-fetch-failed" | "reference-table-missing";

type ReferenceExpansionError = {
  code: ReferenceExpansionErrorCode;
  message: string;
  detail: string;
  referenceMediaId: string;
  tableName: string;
  cause?: unknown;
};

type ReferenceExpansionResult =
  | {
      success: true;
      response: MediumDetailResponse;
    }
  | {
      success: false;
      error: ReferenceExpansionError;
    };

type ReferenceRequest = {
  referenceMediaId: string;
  tableName: string;
};

export const expandReferenceMediumTables = async (
  response: MediumDetailResponse,
  loadReferenceMedium: ReferenceMediumLoader,
): Promise<ReferenceExpansionResult> => {
  const requests = collectReferenceRequests(response);
  const appendedTables: MediumDetailTable[] = [];
  const appendedComments: MediumDetailComment[] = [];
  const loadedReferences = new Map<string, MediumDetailResponse>();
  let nextParagraphIndex = getNextParagraphIndex(response);

  for (const request of requests) {
    const referenceResponse = await getReferenceResponse(
      request,
      loadReferenceMedium,
      loadedReferences,
    );

    if (!referenceResponse.success) {
      return referenceResponse;
    }

    const table = findReferencedTable(referenceResponse.response, request.tableName);

    if (!table) {
      return {
        success: false,
        error: {
          code: "reference-table-missing",
          message: "Import failed.",
          detail: `Reference medium ${request.referenceMediaId} does not include table "${request.tableName}".`,
          referenceMediaId: request.referenceMediaId,
          tableName: request.tableName,
        },
      };
    }

    const reindexed = createReindexedReferencedRecipeItems(
      referenceResponse.response,
      table,
      nextParagraphIndex,
    );
    nextParagraphIndex = reindexed.nextParagraphIndex;
    appendedTables.push(reindexed.table);
    appendedComments.push(...reindexed.comments);
  }

  return {
    success: true,
    response: {
      ...response,
      components: [...response.components, ...appendedTables],
      comments: [...response.comments, ...appendedComments],
    },
  };
};

const collectReferenceRequests = (response: MediumDetailResponse): ReferenceRequest[] => {
  const requests: ReferenceRequest[] = [];
  const seen = new Set<string>();

  response.components.forEach((table) => {
    table.items.forEach((component) => {
      const request = createReferenceRequest(component);

      if (!request) {
        return;
      }

      const key = createReferenceRequestKey(request);

      if (seen.has(key)) {
        return;
      }

      seen.add(key);
      requests.push(request);
    });
  });

  return requests;
};

const createReferenceRequest = (component: MediumDetailComponent): ReferenceRequest | null => {
  const referenceMediaId = component.reference_media_id?.trim();

  if (!referenceMediaId) {
    return null;
  }

  return {
    referenceMediaId,
    tableName: normalizeReferenceTableName(component.component_name),
  };
};

const createReferenceRequestKey = (request: ReferenceRequest): string => {
  return `${request.referenceMediaId}\u0000${request.tableName}`;
};

const getReferenceResponse = async (
  request: ReferenceRequest,
  loadReferenceMedium: ReferenceMediumLoader,
  loadedReferences: Map<string, MediumDetailResponse>,
): Promise<
  | {
      success: true;
      response: MediumDetailResponse;
    }
  | {
      success: false;
      error: ReferenceExpansionError;
    }
> => {
  const cached = loadedReferences.get(request.referenceMediaId);

  if (cached) {
    return {
      success: true,
      response: cached,
    };
  }

  try {
    const response = await loadReferenceMedium(request.referenceMediaId);
    loadedReferences.set(request.referenceMediaId, response);

    return {
      success: true,
      response,
    };
  } catch (cause) {
    return {
      success: false,
      error: {
        code: "reference-fetch-failed",
        message: "Import failed.",
        detail: `Reference medium ${request.referenceMediaId} could not be fetched.`,
        referenceMediaId: request.referenceMediaId,
        tableName: request.tableName,
        cause,
      },
    };
  }
};

const findReferencedTable = (
  response: MediumDetailResponse,
  tableName: string,
): MediumDetailTable | undefined => {
  return response.components.find(
    (table) => normalizeReferenceTableName(table.subcomponent_name) === tableName,
  );
};

const createReindexedReferencedRecipeItems = (
  response: MediumDetailResponse,
  table: MediumDetailTable,
  startParagraphIndex: number,
): {
  table: MediumDetailTable;
  comments: MediumDetailComment[];
  nextParagraphIndex: number;
} => {
  const comments = findCommentsForTable(response, table);
  const reindexedTable = {
    ...table,
    paragraph_index: startParagraphIndex,
  };
  const reindexedComments = comments.map((comment, index) => ({
    ...comment,
    paragraph_index: startParagraphIndex + index + 1,
  }));

  return {
    table: reindexedTable,
    comments: reindexedComments,
    nextParagraphIndex: startParagraphIndex + reindexedComments.length + 1,
  };
};

const findCommentsForTable = (
  response: MediumDetailResponse,
  table: MediumDetailTable,
): MediumDetailComment[] => {
  const nextTable = response.components
    .filter((candidate) => candidate.paragraph_index > table.paragraph_index)
    .sort((a, b) => a.paragraph_index - b.paragraph_index)[0];

  return response.comments.filter((comment) => {
    return (
      comment.paragraph_index > table.paragraph_index &&
      (!nextTable || comment.paragraph_index < nextTable.paragraph_index)
    );
  });
};

const getNextParagraphIndex = (response: MediumDetailResponse): number => {
  const maxParagraphIndex = [...response.components, ...response.comments].reduce(
    (max, item) => Math.max(max, item.paragraph_index),
    0,
  );

  return maxParagraphIndex + 1;
};

const normalizeReferenceTableName = (value: string): string => {
  return value
    .replace(/ \(.*\)/, "")
    .replace(/\*/g, "")
    .trim();
};
