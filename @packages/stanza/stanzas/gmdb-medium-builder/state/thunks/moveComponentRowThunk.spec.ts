import { moveComponentRowThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/moveComponentRowThunk";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { describe, expect, it } from "vitest";

describe("moveComponentRowThunk", () => {
  it("swaps the target component row with the previous row when moving up", () => {
    const store = createThunkTestStore();

    store.dispatch(moveComponentRowThunk("solution-1", "component-row-2", "up"));

    expect(store.getState().entities.solutionBlocks.entities["solution-1"]?.components).toEqual([
      "component-row-2",
      "component-row-1",
    ]);
  });

  it("does nothing when the target component row cannot move further down", () => {
    const store = createThunkTestStore();
    const previousState = store.getState();

    store.dispatch(moveComponentRowThunk("solution-1", "component-row-2", "down"));

    expect(store.getState()).toEqual(previousState);
  });
});
