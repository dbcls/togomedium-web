import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export type ComponentRowModel = {
  id: string;
  component: string;
  volume: number;
  unit: string;
  note: string;
};

const adapter = createEntityAdapter<ComponentRowModel, string>({
  selectId: (componentRowModel) => componentRowModel.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const slice = createSlice({
  name: "entities/componentRow",
  initialState: adapter.getInitialState(),
  reducers: {
    addComponentRow: (state, action) => adapter.addOne(state, action),
    removeComponentRow: (state, action) => adapter.removeOne(state, action),
    updateComponentRow: (state, action) => adapter.updateOne(state, action),
    setComponentRows: (state, action) => adapter.setAll(state, action),
  },
});

export const ComponentRowModelActions = slice.actions;
export const componentRowModelReducer = slice.reducer;
