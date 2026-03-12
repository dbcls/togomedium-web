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
    addComponentRow: adapter.addOne,
    removeComponentRow: adapter.removeOne,
    updateComponentRow: adapter.updateOne,
    setComponentRows: adapter.setAll,
  },
});

export const ComponentRowModelActions = slice.actions;
export const componentRowModelReducer = slice.reducer;
