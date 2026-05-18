import { createInitialFeedbackState } from "%stanza/stanzas/gmdb-medium-builder/state/feedback";
import { mediumDetailImportFixture } from "%stanza/stanzas/gmdb-medium-builder/utils/fixtures/mediumDetailImport";
import { mapMediumDetailResponseToAppState } from "%stanza/stanzas/gmdb-medium-builder/utils/mediumDetailImportMapper";
import { describe, expect, it } from "vitest";

type MediumDetailCreateId = NonNullable<
  NonNullable<Parameters<typeof mapMediumDetailResponseToAppState>[1]>["createId"]
>;

const createId: MediumDetailCreateId = (params) => {
  if (params.kind === "solution") {
    return `imported-solution-${params.tableIndex + 1}`;
  }

  return `imported-component-${params.tableIndex + 1}-${params.componentIndex + 1}`;
};

describe("mapMediumDetailResponseToAppState", () => {
  it("maps medium detail meta and component tables into builder document and solution blocks", () => {
    const state = mapMediumDetailResponseToAppState(mediumDetailImportFixture, { createId });

    expect(state.document).toEqual({
      title: "Imported NBRC medium",
      description: [
        "GM ID: GM_000001",
        "Original medium ID: NBRC 123",
        "pH: 7.2",
        "Source URL: https://example.org/medium/GM_000001",
      ].join("\n"),
      solutions: ["imported-solution-1", "imported-solution-2"],
    });
    expect(state.entities.solutionBlocks).toEqual({
      ids: ["imported-solution-1", "imported-solution-2"],
      entities: {
        "imported-solution-1": {
          id: "imported-solution-1",
          title: "Main solution",
          description: "",
          components: ["imported-component-1-1", "imported-component-1-2"],
        },
        "imported-solution-2": {
          id: "imported-solution-2",
          title: "Trace elements",
          description: "",
          components: ["imported-component-2-1"],
        },
      },
    });
    expect(state.feedback).toEqual(createInitialFeedbackState());
  });

  it("maps component rows with GMO ID, volume, unit, and label-first display names", () => {
    const state = mapMediumDetailResponseToAppState(mediumDetailImportFixture, { createId });

    expect(state.entities.componentRows).toMatchObject({
      ids: ["imported-component-1-1", "imported-component-1-2", "imported-component-2-1"],
      entities: {
        "imported-component-1-1": {
          id: "imported-component-1-1",
          gmoId: "GMO_000001",
          component: "Glucose",
          volume: 10,
          unit: "g/L",
        },
        "imported-component-1-2": {
          id: "imported-component-1-2",
          gmoId: "GMO_000002",
          component: "Yeast extract",
          volume: 2,
          unit: "g/L",
        },
      },
    });
  });

  it("keeps source component name, concentration, and reference medium ID in row notes", () => {
    const state = mapMediumDetailResponseToAppState(mediumDetailImportFixture, { createId });

    expect(state.entities.componentRows.entities["imported-component-1-1"]?.note).toBe(
      ["Component name: D-Glucose", "Concentration: 55.5 mM"].join("\n"),
    );
    expect(state.entities.componentRows.entities["imported-component-1-2"]?.note).toBe("");
    expect(state.entities.componentRows.entities["imported-component-2-1"]).toMatchObject({
      component: "Trace solution",
      note: ["Component name: Trace element solution", "Reference medium ID: GM_000999"].join("\n"),
    });
  });

  it("does not import comments into builder document, solutions, or component notes", () => {
    const state = mapMediumDetailResponseToAppState(mediumDetailImportFixture, { createId });
    const serializedState = JSON.stringify(state);

    expect(serializedState).not.toContain("Keep this comment out of the builder state in v1.");
    expect(state.document.description).not.toContain("Keep this comment out");
  });
});
