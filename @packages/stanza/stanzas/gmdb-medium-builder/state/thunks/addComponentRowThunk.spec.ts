import { addComponentRowThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/addComponentRowThunk";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { describe, expect, it } from "vitest";

describe("addComponentRowThunk", () => {
  it("adds a new component row to the end of the target solution block", () => {
    const store = createThunkTestStore();

    store.dispatch(addComponentRowThunk("solution-1"));

    const state = store.getState();
    const solutionBlock = state.entities.solutionBlocks.entities["solution-1"];
    const addedComponentRowId = solutionBlock?.components[2];

    expect(solutionBlock?.components).toHaveLength(3);
    expect(solutionBlock?.components[0]).toBe("component-row-1");
    expect(solutionBlock?.components[1]).toBe("component-row-2");
    expect(addedComponentRowId).toBeDefined();
    expect(addedComponentRowId).not.toBe("component-row-1");
    expect(addedComponentRowId).not.toBe("component-row-2");
    expect(
      addedComponentRowId ? state.entities.componentRows.entities[addedComponentRowId] : undefined,
    ).toEqual({
      id: addedComponentRowId,
      gmoId: "",
      component: "",
      volume: 0,
      unit: "",
      note: "",
    });
  });

  it("does nothing when the target solution block does not exist", () => {
    const store = createThunkTestStore();
    const previousState = store.getState();

    store.dispatch(addComponentRowThunk("missing-solution"));

    expect(store.getState()).toEqual(previousState);
  });
});
