import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

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
    addSolutionBlock: (state, action) => adapter.addOne(state, action),
    removeSolutionBlock: (state, action) => adapter.removeOne(state, action),
    updateSolutionBlock: (state, action) => adapter.updateOne(state, action),
    setSolutionBlocks: (state, action) => adapter.setAll(state, action),
  },
});

export const SolutionBlockModelActions = slice.actions;
export const solutionBlockModelReducer = slice.reducer;

export const createBlankSolutionBlock = (): SolutionBlockModel => {
  const id = nanoid();
  return {
    id,
    title: "",
    description: "",
    components: [],
  };
};
