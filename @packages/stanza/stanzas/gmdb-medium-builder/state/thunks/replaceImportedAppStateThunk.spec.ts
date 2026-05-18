import { replaceImportedAppStateThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/replaceImportedAppStateThunk";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { describe, expect, it } from "vitest";

describe("replaceImportedAppStateThunk", () => {
  it("replaces document, solution blocks, and component rows with imported state", () => {
    const store = createThunkTestStore();

    store.dispatch(
      replaceImportedAppStateThunk({
        document: {
          title: "Imported medium",
          description: "Imported description",
          solutions: ["imported-solution-1"],
        },
        entities: {
          solutionBlocks: {
            ids: ["imported-solution-1"],
            entities: {
              "imported-solution-1": {
                id: "imported-solution-1",
                title: "Imported solution",
                description: "Imported solution description",
                components: ["imported-component-1"],
              },
            },
          },
          componentRows: {
            ids: ["imported-component-1"],
            entities: {
              "imported-component-1": {
                id: "imported-component-1",
                gmoId: "GMO_999999",
                component: "Imported component",
                volume: 20,
                unit: "mL",
                note: "imported",
              },
            },
          },
        },
      }),
    );

    const state = store.getState();

    expect(state.document).toEqual({
      title: "Imported medium",
      description: "Imported description",
      solutions: ["imported-solution-1"],
    });
    expect(state.entities.solutionBlocks.ids).toEqual(["imported-solution-1"]);
    expect(state.entities.componentRows.ids).toEqual(["imported-component-1"]);
    expect(state.entities.solutionBlocks.entities["solution-1"]).toBeUndefined();
    expect(state.entities.solutionBlocks.entities["solution-2"]).toBeUndefined();
    expect(state.entities.componentRows.entities["component-row-1"]).toBeUndefined();
    expect(state.entities.componentRows.entities["component-row-2"]).toBeUndefined();
    expect(state.entities.componentRows.entities["component-row-3"]).toBeUndefined();
    expect(state.entities.solutionBlocks.entities["imported-solution-1"]?.components).toEqual([
      "imported-component-1",
    ]);
  });

  it("replaces document solutions with an empty imported solution list", () => {
    const store = createThunkTestStore();

    store.dispatch(
      replaceImportedAppStateThunk({
        document: {
          title: "Empty medium",
          description: "",
          solutions: [],
        },
        entities: {
          solutionBlocks: {
            ids: [],
            entities: {},
          },
          componentRows: {
            ids: [],
            entities: {},
          },
        },
      }),
    );

    const state = store.getState();

    expect(state.document.solutions).toEqual([]);
    expect(state.entities.solutionBlocks.ids).toEqual([]);
    expect(state.entities.solutionBlocks.entities).toEqual({});
    expect(state.entities.componentRows.ids).toEqual([]);
    expect(state.entities.componentRows.entities).toEqual({});
  });

  it("keeps an imported solution with an empty component list", () => {
    const store = createThunkTestStore();

    store.dispatch(
      replaceImportedAppStateThunk({
        document: {
          title: "Componentless medium",
          description: "",
          solutions: ["imported-solution-1"],
        },
        entities: {
          solutionBlocks: {
            ids: ["imported-solution-1"],
            entities: {
              "imported-solution-1": {
                id: "imported-solution-1",
                title: "No components",
                description: "",
                components: [],
              },
            },
          },
          componentRows: {
            ids: [],
            entities: {},
          },
        },
      }),
    );

    const state = store.getState();

    expect(state.document.solutions).toEqual(["imported-solution-1"]);
    expect(state.entities.solutionBlocks.entities["imported-solution-1"]?.components).toEqual([]);
    expect(state.entities.componentRows.ids).toEqual([]);
    expect(state.entities.componentRows.entities).toEqual({});
  });
});
