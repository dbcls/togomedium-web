import type { MediumDetailResponse } from "%api/mediumDetail/definitions";

type MediumDetailTable = MediumDetailResponse["components"][number];
type MediumDetailComponent = MediumDetailTable["items"][number];

export type ReferenceMediumLoader = (gmId: string) => Promise<MediumDetailResponse>;

export type ReferenceExpansionErrorCode = "reference-fetch-failed" | "reference-table-missing";

export type ReferenceExpansionError = {
  code: ReferenceExpansionErrorCode;
  message: string;
  detail: string;
  referenceMediaId: string;
  tableName: string;
  cause?: unknown;
};

export type ReferenceExpansionResult =
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
  const loadedReferences = new Map<string, MediumDetailResponse>();

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

    appendedTables.push(table);
  }

  return {
    success: true,
    response: {
      ...response,
      components: [...response.components, ...appendedTables],
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

const normalizeReferenceTableName = (value: string): string => {
  return value
    .replace(/ \(.*\)/, "")
    .replace(/\*/g, "")
    .trim();
};
