import { duplicateSolutionThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/duplicateSolutionThunk";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { describe, expect, it } from "vitest";

describe("duplicateSolutionThunk", () => {
  it("duplicates the solution block right after the source block with cloned component rows", () => {
    const store = createThunkTestStore();

    store.dispatch(duplicateSolutionThunk("solution-1"));

    const state = store.getState();
    const duplicatedSolutionId = state.document.solutions[1];

    expect(state.document.solutions).toHaveLength(3);
    expect(state.document.solutions[0]).toBe("solution-1");
    expect(state.document.solutions[2]).toBe("solution-2");
    expect(duplicatedSolutionId).toBeDefined();
    expect(duplicatedSolutionId).not.toBe("solution-1");

    const duplicatedSolution = state.entities.solutionBlocks.entities[duplicatedSolutionId];
    expect(duplicatedSolution).toEqual({
      id: duplicatedSolutionId,
      title: "Medium A",
      description: "desc A",
      components: duplicatedSolution?.components,
    });
    expect(duplicatedSolution?.components).toHaveLength(2);
    expect(duplicatedSolution?.components).not.toEqual(["component-row-1", "component-row-2"]);

    const duplicatedFirstComponentId = duplicatedSolution?.components[0];
    const duplicatedSecondComponentId = duplicatedSolution?.components[1];

    expect(duplicatedFirstComponentId).toBeDefined();
    expect(duplicatedSecondComponentId).toBeDefined();
    expect(duplicatedFirstComponentId).not.toBe("component-row-1");
    expect(duplicatedSecondComponentId).not.toBe("component-row-2");

    const duplicatedFirstComponent = duplicatedFirstComponentId
      ? state.entities.componentRows.entities[duplicatedFirstComponentId]
      : undefined;
    const duplicatedSecondComponent = duplicatedSecondComponentId
      ? state.entities.componentRows.entities[duplicatedSecondComponentId]
      : undefined;

    expect(duplicatedFirstComponent).toEqual({
      id: duplicatedFirstComponentId,
      component: "Glucose",
      volume: 10,
      unit: "g",
      note: "primary",
    });
    expect(duplicatedSecondComponent).toEqual({
      id: duplicatedSecondComponentId,
      component: "NaCl",
      volume: 5,
      unit: "mg",
      note: "secondary",
    });
  });

  it("does nothing when the target solution block does not exist", () => {
    const store = createThunkTestStore();
    const previousState = store.getState();

    store.dispatch(duplicateSolutionThunk("missing-solution"));

    expect(store.getState()).toEqual(previousState);
  });
});
