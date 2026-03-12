import { createSlice } from "@reduxjs/toolkit";

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
    addSolution: () => {},
    removeSolution: () => {},
  },
});

export const documentReducer = slice.reducer;
export const DocumentActions = slice.actions;
