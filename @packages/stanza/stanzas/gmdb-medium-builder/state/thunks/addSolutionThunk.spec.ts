import { addSolutionThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/addSolutionThunk";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { describe, expect, it } from "vitest";

describe("addSolutionThunk", () => {
  it("adds a new solution block and a blank component row", () => {
    const store = createThunkTestStore();

    store.dispatch(addSolutionThunk());

    const state = store.getState();
    const addedSolutionId = state.document.solutions[2];

    expect(state.document.solutions).toHaveLength(3);
    expect(addedSolutionId).toBeDefined();
    expect(addedSolutionId).not.toBe("solution-1");
    expect(addedSolutionId).not.toBe("solution-2");

    const addedSolution = state.entities.solutionBlocks.entities[addedSolutionId];
    const addedComponentRowId = addedSolution?.components[0];

    expect(addedSolution).toEqual({
      id: addedSolutionId,
      title: "",
      description: "",
      components: addedSolution?.components,
    });
    expect(addedSolution?.components).toHaveLength(1);
    expect(addedComponentRowId).toBeDefined();
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
});
