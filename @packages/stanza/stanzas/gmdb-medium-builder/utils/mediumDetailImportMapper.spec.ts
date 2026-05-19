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
      description: "pH: 7.2",
      provenance: {
        importSourceGmId: "GM_000001",
        originalMediaId: "NBRC 123",
        sourceUrl: "https://example.org/medium/GM_000001",
      },
      solutions: ["imported-solution-1", "imported-solution-2"],
    });
    expect(state.entities.solutionBlocks).toEqual({
      ids: ["imported-solution-1", "imported-solution-2"],
      entities: {
        "imported-solution-1": {
          id: "imported-solution-1",
          title: "Main solution",
          description: "Autoclave main solution separately.",
          components: ["imported-component-1-1", "imported-component-1-2"],
        },
        "imported-solution-2": {
          id: "imported-solution-2",
          title: "Trace elements",
          description: "Add trace elements after sterilization.",
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
          concentrationValue: 55.5,
          concentrationUnit: "mM",
          note: "",
        },
        "imported-component-1-2": {
          id: "imported-component-1-2",
          gmoId: "GMO_000002",
          component: "Yeast extract",
          volume: 2,
          unit: "g/L",
          concentrationValue: null,
          concentrationUnit: "",
          note: "",
        },
      },
    });
  });

  it("decodes HTML entities in imported component labels and fallback component names", () => {
    const fixture = structuredClone(mediumDetailImportFixture);
    fixture.components[0].items[0].label = "Bacto &trade; Yeast extract";
    fixture.components[0].items[1].label = "";
    fixture.components[0].items[1].component_name = "Bacto &reg; Peptone";

    const state = mapMediumDetailResponseToAppState(fixture, { createId });

    expect(state.entities.componentRows.entities["imported-component-1-1"]?.component).toBe(
      "Bacto \u2122 Yeast extract",
    );
    expect(state.entities.componentRows.entities["imported-component-1-2"]?.component).toBe(
      "Bacto \u00ae Peptone",
    );
  });

  it("does not persist source component name, original label, or reference medium ID", () => {
    const state = mapMediumDetailResponseToAppState(mediumDetailImportFixture, { createId });
    const serializedState = JSON.stringify(state);

    expect(state.entities.componentRows.entities["imported-component-1-1"]?.note).toBe("");
    expect(state.entities.componentRows.entities["imported-component-1-2"]?.note).toBe("");
    expect(state.entities.componentRows.entities["imported-component-2-1"]).toMatchObject({
      component: "Trace solution",
      note: "",
    });
    expect(serializedState).not.toContain("D-Glucose");
    expect(serializedState).not.toContain("Trace element solution");
    expect(serializedState).not.toContain("GM_000999");
  });

  it("imports comments as solution notes instead of document or component notes", () => {
    const state = mapMediumDetailResponseToAppState(mediumDetailImportFixture, { createId });

    expect(state.document.description).not.toContain("Autoclave main solution");
    expect(state.entities.componentRows.entities["imported-component-1-1"]?.note).not.toContain(
      "Autoclave main solution",
    );
    expect(state.entities.solutionBlocks.entities["imported-solution-1"]?.description).toBe(
      "Autoclave main solution separately.",
    );
    expect(state.entities.solutionBlocks.entities["imported-solution-2"]?.description).toBe(
      "Add trace elements after sterilization.",
    );
  });
});
