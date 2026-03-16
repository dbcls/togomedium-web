import { deleteComponentRowThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/deleteComponentRowThunk";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { describe, expect, it } from "vitest";

describe("deleteComponentRowThunk", () => {
  it("removes the component row from both entities and the target solution block", () => {
    const store = createThunkTestStore();

    store.dispatch(deleteComponentRowThunk("solution-1", "component-row-1"));

    const state = store.getState();

    expect(state.entities.solutionBlocks.entities["solution-1"]?.components).toEqual([
      "component-row-2",
    ]);
    expect(state.entities.componentRows.entities["component-row-1"]).toBeUndefined();
  });

  it("does nothing when the target solution block has only one component row", () => {
    const store = createThunkTestStore();
    const previousState = store.getState();

    store.dispatch(deleteComponentRowThunk("solution-2", "component-row-3"));

    expect(store.getState()).toEqual(previousState);
  });
});
