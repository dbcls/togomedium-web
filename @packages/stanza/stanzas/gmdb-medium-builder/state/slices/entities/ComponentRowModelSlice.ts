import { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

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
    removeComponentRows: (state, action) => adapter.removeMany(state, action),
    updateComponentRow: (state, action) => adapter.updateOne(state, action),
  },
});

export const ComponentRowModelActions = slice.actions;
export const componentRowModelReducer = slice.reducer;

const selectors = adapter.getSelectors<AppState>((state) => state.entities.componentRows);
export const ComponentRowSelectors = selectors;

export const createBlankComponentRow = (
  params: Partial<ComponentRowModel> = {},
): ComponentRowModel => {
  const id = params.id ?? nanoid();
  return {
    id,
    component: params.component ?? "",
    volume: params.volume ?? 0,
    unit: params.unit ?? "",
    note: params.note ?? "",
  };
};
