import { documentReducer } from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import { componentRowModelReducer } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import { solutionBlockModelReducer } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";
import { createInitialState } from "%stanza/stanzas/gmdb-medium-builder/state/utils/createInitialState";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const appStore = configureStore({
  reducer: {
    entities: combineReducers({
      componentRows: componentRowModelReducer,
      solutionBlocks: solutionBlockModelReducer,
    }),
    document: documentReducer,
  },
  preloadedState: createInitialState(),
});

export type AppState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
