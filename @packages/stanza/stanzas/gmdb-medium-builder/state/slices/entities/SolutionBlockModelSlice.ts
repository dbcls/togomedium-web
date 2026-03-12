import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export type SolutionBlockModel = {
  id: string;
  title: string;
  description: string;
  components: string[];
};
const adapter = createEntityAdapter<SolutionBlockModel, string>({
  selectId: (solutionBlockModel) => solutionBlockModel.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const slice = createSlice({
  name: "entities/solutionBlock",
  initialState: adapter.getInitialState(),
  reducers: {
    addSolutionBlock: adapter.addOne,
    removeSolutionBlock: adapter.removeOne,
    updateSolutionBlock: adapter.updateOne,
    setSolutionBlocks: adapter.setAll,
  },
});

export const SolutionBlockModelActions = slice.actions;
export const solutionBlockModelReducer = slice.reducer;
