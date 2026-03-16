import { moveSolutionThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/moveSolutionThunk";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { describe, expect, it } from "vitest";

describe("moveSolutionThunk", () => {
  it("swaps the target solution block with the previous block when moving up", () => {
    const store = createThunkTestStore();

    store.dispatch(moveSolutionThunk("solution-2", "up"));

    expect(store.getState().document.solutions).toEqual(["solution-2", "solution-1"]);
  });

  it("does nothing when the target solution block cannot move further up", () => {
    const store = createThunkTestStore();
    const previousState = store.getState();

    store.dispatch(moveSolutionThunk("solution-1", "up"));

    expect(store.getState()).toEqual(previousState);
  });
});
