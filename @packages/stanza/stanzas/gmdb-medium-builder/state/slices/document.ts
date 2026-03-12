import { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

type DocumentModel = {
  solutions: string[];
};

const initialState: DocumentModel = {
  solutions: [],
};

const slice = createSlice({
  name: "document",
  initialState,
  reducers: {
    addSolution: (state, action: PayloadAction<string>) => {
      state.solutions.push(action.payload);
    },
    removeSolution: () => {},
  },
});

export const documentReducer = slice.reducer;
export const DocumentActions = slice.actions;

const documentState = (state: AppState) => state.document;
export const DocumentSelectors = {
  selectSolutions: createSelector(documentState, (document) => document.solutions),
};
