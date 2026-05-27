import {
  type MediumDetailParams,
  type MediumDetailResponse,
  PATH_MEDIUM_DETAIL,
} from "%api/mediumDetail/definitions";
import { getData } from "%core/network/getData";
import { makeApiUrl } from "%core/network/makeApiUrl";
import type { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { mapMediumDetailResponseToAppState } from "%stanza/stanzas/gmdb-medium-builder/utils/mediumDetailImportMapper";
import { expandReferenceMediumTables } from "%stanza/stanzas/gmdb-medium-builder/utils/mediumDetailReferenceExpansion";

type ImportedAppState = Pick<AppState, "document" | "entities">;

type MediumDetailLoader = (
  gmId: string,
  abortController?: AbortController,
) => Promise<MediumDetailResponse>;

type MediumDetailImportWorkflowOptions = {
  loadMediumDetail?: MediumDetailLoader;
  abortController?: AbortController;
};

type MediumDetailImportWorkflowResult =
  | {
      success: true;
      state: ImportedAppState;
    }
  | {
      success: false;
      error: {
        message: string;
        detail: string;
        cause?: unknown;
      };
    };

export const importMediumDetailByGmId = async (
  gmId: string,
  options: MediumDetailImportWorkflowOptions = {},
): Promise<MediumDetailImportWorkflowResult> => {
  const loadMediumDetail = options.loadMediumDetail ?? loadMediumDetailFromApi;

  const mainMediumResult = await loadMainMedium(gmId, loadMediumDetail, options.abortController);

  if (!mainMediumResult.success) {
    return mainMediumResult;
  }

  const expansionResult = await expandReferenceMediumTables(mainMediumResult.response, (refGmId) =>
    loadMediumDetail(refGmId, options.abortController),
  );

  if (!expansionResult.success) {
    return {
      success: false,
      error: expansionResult.error,
    };
  }

  return {
    success: true,
    state: mapMediumDetailResponseToAppState(expansionResult.response),
  };
};

const loadMainMedium = async (
  gmId: string,
  loadMediumDetail: MediumDetailLoader,
  abortController?: AbortController,
): Promise<
  | {
      success: true;
      response: MediumDetailResponse;
    }
  | {
      success: false;
      error: {
        message: string;
        detail: string;
        cause?: unknown;
      };
    }
> => {
  try {
    return {
      success: true,
      response: await loadMediumDetail(gmId, abortController),
    };
  } catch (cause) {
    return {
      success: false,
      error: {
        message: "Import failed.",
        detail: `Medium ${gmId} could not be fetched.`,
        cause,
      },
    };
  }
};

const loadMediumDetailFromApi: MediumDetailLoader = async (gmId, abortController) => {
  const response = await getData<MediumDetailResponse, MediumDetailParams>(
    makeApiUrl(PATH_MEDIUM_DETAIL),
    { gm_id: gmId },
    abortController,
  );

  if (!response.body) {
    throw new Error(response.message ?? `Medium detail request failed with ${response.status}.`);
  }

  return response.body;
};
