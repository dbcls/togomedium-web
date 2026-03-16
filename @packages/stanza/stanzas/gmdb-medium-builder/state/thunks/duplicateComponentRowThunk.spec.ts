import { duplicateComponentRowThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/duplicateComponentRowThunk";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { describe, expect, it } from "vitest";

describe("duplicateComponentRowThunk", () => {
  it("duplicates the component row right after the source row", () => {
    const store = createThunkTestStore();

    store.dispatch(duplicateComponentRowThunk("solution-1", "component-row-1"));

    const state = store.getState();
    const solutionBlock = state.entities.solutionBlocks.entities["solution-1"];

    expect(solutionBlock).toBeDefined();
    expect(solutionBlock?.components).toHaveLength(3);
    expect(solutionBlock?.components[0]).toBe("component-row-1");
    expect(solutionBlock?.components[2]).toBe("component-row-2");

    const duplicatedComponentRowId = solutionBlock?.components[1];
    expect(duplicatedComponentRowId).toBeDefined();
    expect(duplicatedComponentRowId).not.toBe("component-row-1");

    const duplicatedComponentRow = duplicatedComponentRowId
      ? state.entities.componentRows.entities[duplicatedComponentRowId]
      : undefined;

    expect(duplicatedComponentRow).toEqual({
      id: duplicatedComponentRowId,
      component: "Glucose",
      volume: 10,
      unit: "g",
      note: "primary",
    });
  });

  it("does nothing when the component row is not included in the solution block", () => {
    const store = createThunkTestStore();
    const previousState = store.getState();

    store.dispatch(duplicateComponentRowThunk("solution-1", "missing-component-row"));

    expect(store.getState()).toEqual(previousState);
  });
});
