import { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DocumentModel = {
  title: string;
  description: string;
  solutions: string[];
};

const initialState: DocumentModel = {
  title: "",
  description: "",
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
  selectSolutions: createSelector(documentState, (document) => document.solutions),
};
