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
    removeSolution: (state, action: PayloadAction<string>) => {
      state.solutions = state.solutions.filter((id) => id !== action.payload);
    },
    setSolutions: (state, action: PayloadAction<string[]>) => {
      state.solutions = action.payload;
    },
  },
});

export const documentReducer = slice.reducer;
export const DocumentActions = slice.actions;

const documentState = (state: AppState) => state.document;
export const DocumentSelectors = {
  selectSolutions: createSelector(documentState, (document) => document.solutions),
};
