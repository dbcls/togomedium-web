import { deleteSolutionThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/deleteSolutionThunk";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { describe, expect, it } from "vitest";

describe("deleteSolutionThunk", () => {
  it("removes the solution block and its component rows", () => {
    const store = createThunkTestStore();

    store.dispatch(deleteSolutionThunk("solution-1"));

    const state = store.getState();

    expect(state.document.solutions).toEqual(["solution-2"]);
    expect(state.entities.solutionBlocks.entities["solution-1"]).toBeUndefined();
    expect(state.entities.componentRows.entities["component-row-1"]).toBeUndefined();
    expect(state.entities.componentRows.entities["component-row-2"]).toBeUndefined();
    expect(state.entities.componentRows.entities["component-row-3"]).toBeDefined();
  });

  it("does nothing when trying to delete the last remaining solution block", () => {
    const store = createThunkTestStore();

    store.dispatch(deleteSolutionThunk("solution-1"));
    const previousState = store.getState();

    store.dispatch(deleteSolutionThunk("solution-2"));

    expect(store.getState()).toEqual(previousState);
  });
});
