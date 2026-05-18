import {
  createInitialFeedbackState,
  feedbackReducer,
} from "%stanza/stanzas/gmdb-medium-builder/state/feedback";
import { documentReducer } from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import { componentRowModelReducer } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/ComponentRowModelSlice";
import { solutionBlockModelReducer } from "%stanza/stanzas/gmdb-medium-builder/state/slices/entities/SolutionBlockModelSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const createThunkTestStore = () => {
  return configureStore({
    reducer: {
      entities: combineReducers({
        componentRows: componentRowModelReducer,
        solutionBlocks: solutionBlockModelReducer,
      }),
      document: documentReducer,
      feedback: feedbackReducer,
    },
    preloadedState: {
      entities: {
        componentRows: {
          ids: ["component-row-1", "component-row-2", "component-row-3"],
          entities: {
            "component-row-1": {
              id: "component-row-1",
              gmoId: "GMO_000001",
              component: "Glucose",
              volume: 10,
              unit: "g",
              note: "primary",
            },
            "component-row-2": {
              id: "component-row-2",
              gmoId: "GMO_000002",
              component: "NaCl",
              volume: 5,
              unit: "mg",
              note: "secondary",
            },
            "component-row-3": {
              id: "component-row-3",
              gmoId: "",
              component: "Agar",
              volume: 15,
              unit: "g",
              note: "other block",
            },
          },
        },
        solutionBlocks: {
          ids: ["solution-1", "solution-2"],
          entities: {
            "solution-1": {
              id: "solution-1",
              title: "Medium A",
              description: "desc A",
              components: ["component-row-1", "component-row-2"],
            },
            "solution-2": {
              id: "solution-2",
              title: "Medium B",
              description: "desc B",
              components: ["component-row-3"],
            },
          },
        },
      },
      document: {
        title: "Test medium",
        description: "Test medium description",
        solutions: ["solution-1", "solution-2"],
      },
      feedback: createInitialFeedbackState(),
    },
  });
};
