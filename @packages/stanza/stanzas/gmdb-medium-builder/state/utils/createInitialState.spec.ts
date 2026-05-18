import { createInitialState } from "%stanza/stanzas/gmdb-medium-builder/state/utils/createInitialState";
import { describe, expect, it } from "vitest";

describe("createInitialState", () => {
  it("creates blank state with nullable amount fields and provenance fields", () => {
    const state = createInitialState();
    const componentRowId = state.entities.componentRows.ids[0];
    const componentRow = state.entities.componentRows.entities[componentRowId];

    expect(state.document.provenance).toEqual({
      importSourceGmId: "",
      originalMediaId: "",
      sourceUrl: "",
    });
    expect(componentRow).toMatchObject({
      volume: null,
      concentrationValue: null,
      concentrationUnit: "",
    });
  });
});
