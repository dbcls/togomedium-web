import { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DocumentModel = {
  title: string;
  description: string;
  provenance?: DocumentProvenanceModel;
  solutions: string[];
};

export type DocumentProvenanceModel = {
  importSourceGmId: string;
  originalMediaId: string;
  sourceUrl: string;
};

export const createBlankDocumentProvenance = (
  params: Partial<DocumentProvenanceModel> = {},
): DocumentProvenanceModel => {
  return {
    importSourceGmId: params.importSourceGmId ?? "",
    originalMediaId: params.originalMediaId ?? "",
    sourceUrl: params.sourceUrl ?? "",
  };
};

const initialState: DocumentModel = {
  title: "",
  description: "",
  provenance: createBlankDocumentProvenance(),
  solutions: [],
};

const slice = createSlice({
  name: "document",
  initialState,
  reducers: {
    addSolution: (state, action: PayloadAction<string>) => {
      state.solutions.push(action.payload);
    },
    removeSolution: (state, action: PayloadAction<string>) => {
      state.solutions = state.solutions.filter((id) => id !== action.payload);
    },
    setSolutions: (state, action: PayloadAction<string[]>) => {
      state.solutions = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setProvenance: (state, action: PayloadAction<Partial<DocumentProvenanceModel>>) => {
      state.provenance = createBlankDocumentProvenance({
        ...state.provenance,
        ...action.payload,
      });
    },
    replaceDocument: (_state, action: PayloadAction<DocumentModel>) => {
      return action.payload;
    },
  },
});

export const documentReducer = slice.reducer;
export const DocumentActions = slice.actions;

const documentState = (state: AppState) => state.document;
export const DocumentSelectors = {
  selectTitle: createSelector(documentState, (document) => document.title),
  selectDescription: createSelector(documentState, (document) => document.description),
  selectProvenance: createSelector(
    documentState,
    (document) => document.provenance ?? createBlankDocumentProvenance(),
  ),
  selectSolutions: createSelector(documentState, (document) => document.solutions),
};
