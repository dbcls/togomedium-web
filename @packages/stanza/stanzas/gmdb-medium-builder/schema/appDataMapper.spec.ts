import { GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION } from "%stanza/stanzas/gmdb-medium-builder/schema/appData";
import {
  mapAppStateToDraftAppData,
  mapDraftAppDataToAppState,
} from "%stanza/stanzas/gmdb-medium-builder/schema/appDataMapper";
import type { GmdbMediumBuilderDraftIdFactory } from "%stanza/stanzas/gmdb-medium-builder/schema/appDataMapper";
import type { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { createInitialFeedbackState } from "%stanza/stanzas/gmdb-medium-builder/state/feedback";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { describe, expect, it } from "vitest";

const createId: GmdbMediumBuilderDraftIdFactory = (params) => {
  if (params.kind === "solution") {
    return `imported-solution-${params.solutionIndex + 1}`;
  }

  return `imported-component-${params.solutionIndex + 1}-${params.componentIndex + 1}`;
};

const createBaseDraft = () => ({
  schemaVersion: GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION,
  title: "Imported medium",
  description: "Imported description",
  solutions: [
    {
      title: "Imported solution",
      description: "Imported solution description",
      components: [
        {
          gmoId: "GMO_000001",
          component: "Glucose",
          volume: 10,
          unit: "g",
          note: "primary",
        },
      ],
    },
  ],
});

describe("mapAppStateToDraftAppData", () => {
  it("exports state values in document display order without entity ids", () => {
    const state = createThunkTestStore().getState();
    const reorderedState: AppState = {
      ...state,
      entities: {
        ...state.entities,
        solutionBlocks: {
          ...state.entities.solutionBlocks,
          entities: {
            ...state.entities.solutionBlocks.entities,
            "solution-1": {
              ...state.entities.solutionBlocks.entities["solution-1"]!,
              components: ["component-row-2", "component-row-1"],
            },
          },
        },
      },
      document: {
        ...state.document,
        solutions: ["solution-2", "solution-1"],
      },
    };

    expect(mapAppStateToDraftAppData(reorderedState)).toEqual({
      schemaVersion: GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION,
      title: "Test medium",
      description: "Test medium description",
      solutions: [
        {
          title: "Medium B",
          description: "desc B",
          components: [
            {
              gmoId: "",
              component: "Agar",
              volume: 15,
              unit: "g",
              note: "other block",
            },
          ],
        },
        {
          title: "Medium A",
          description: "desc A",
          components: [
            {
              gmoId: "GMO_000002",
              component: "NaCl",
              volume: 5,
              unit: "mg",
              note: "secondary",
            },
            {
              gmoId: "GMO_000001",
              component: "Glucose",
              volume: 10,
              unit: "g",
              note: "primary",
            },
          ],
        },
      ],
    });
  });
});

describe("mapDraftAppDataToAppState", () => {
  it("imports draft JSON into new state ids and ignores JSON ids", () => {
    const draft = {
      ...createBaseDraft(),
      id: "json-document-id",
      solutions: [
        {
          id: "json-solution-id",
          ...createBaseDraft().solutions[0],
          components: [
            {
              id: "json-component-id",
              ...createBaseDraft().solutions[0].components[0],
            },
          ],
        },
      ],
    };

    const result = mapDraftAppDataToAppState(draft, {
      createId,
      componentCandidates: [{ gmoId: "GMO_000001", name: "Glucose" }],
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }
    expect(result.state.document.solutions).toEqual(["imported-solution-1"]);
    expect(result.state.entities.solutionBlocks.ids).toEqual(["imported-solution-1"]);
    expect(
      result.state.entities.solutionBlocks.entities["imported-solution-1"]?.components,
    ).toEqual(["imported-component-1-1"]);
    expect(result.state.entities.componentRows.ids).toEqual(["imported-component-1-1"]);
    expect(result.state.entities.componentRows.entities["imported-component-1-1"]).toMatchObject({
      id: "imported-component-1-1",
      gmoId: "GMO_000001",
      component: "Glucose",
    });
  });

  it("rejects schemaVersion mismatch", () => {
    const result = mapDraftAppDataToAppState(
      {
        ...createBaseDraft(),
        schemaVersion: "2026-05-17",
      },
      { createId },
    );

    expect(result.success).toBe(false);
  });

  it("normalizes null values to state values and preserves empty arrays", () => {
    const result = mapDraftAppDataToAppState(
      {
        schemaVersion: GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION,
        title: null,
        description: null,
        solutions: [
          {
            title: null,
            description: null,
            components: [],
          },
          {
            title: "Solution with null component fields",
            description: null,
            components: [
              {
                gmoId: null,
                component: null,
                volume: null,
                unit: null,
                note: null,
              },
            ],
          },
        ],
      },
      { createId, componentCandidates: [] },
    );

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }
    expect(result.state).toEqual({
      entities: {
        componentRows: {
          ids: ["imported-component-2-1"],
          entities: {
            "imported-component-2-1": {
              id: "imported-component-2-1",
              gmoId: "",
              component: "",
              volume: 0,
              unit: "",
              note: "",
            },
          },
        },
        solutionBlocks: {
          ids: ["imported-solution-1", "imported-solution-2"],
          entities: {
            "imported-solution-1": {
              id: "imported-solution-1",
              title: "",
              description: "",
              components: [],
            },
            "imported-solution-2": {
              id: "imported-solution-2",
              title: "Solution with null component fields",
              description: "",
              components: ["imported-component-2-1"],
            },
          },
        },
      },
      document: {
        title: "",
        description: "",
        solutions: ["imported-solution-1", "imported-solution-2"],
      },
      feedback: createInitialFeedbackState(),
    });
    expect(result.warnings.map((warning) => warning.code)).toEqual(
      Array.from({ length: 10 }, () => "null-normalized"),
    );
  });

  it("normalizes invalid GMO IDs when component candidates are provided", () => {
    const result = mapDraftAppDataToAppState(
      {
        ...createBaseDraft(),
        solutions: [
          {
            ...createBaseDraft().solutions[0],
            components: [
              {
                ...createBaseDraft().solutions[0].components[0],
                gmoId: "GMO_UNKNOWN",
                component: "Mystery component",
              },
            ],
          },
        ],
      },
      { createId, componentCandidates: [{ gmoId: "GMO_000001", name: "Glucose" }] },
    );

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }
    expect(result.state.entities.componentRows.entities["imported-component-1-1"]).toMatchObject({
      gmoId: "",
      component: "Mystery component",
    });
    expect(result.warnings).toEqual([
      {
        code: "invalid-gmo-id",
        path: ["solutions", 0, "components", 0, "gmoId"],
        message: "Unknown GMO ID GMO_UNKNOWN was normalized to an empty string.",
      },
    ]);
  });

  it("uses candidate name when valid GMO ID and component name differ", () => {
    const result = mapDraftAppDataToAppState(
      {
        ...createBaseDraft(),
        solutions: [
          {
            ...createBaseDraft().solutions[0],
            components: [
              {
                ...createBaseDraft().solutions[0].components[0],
                gmoId: "GMO_000001",
                component: "Wrong name",
              },
            ],
          },
        ],
      },
      { createId, componentCandidates: [{ gmoId: "GMO_000001", name: "Glucose" }] },
    );

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }
    expect(result.state.entities.componentRows.entities["imported-component-1-1"]).toMatchObject({
      gmoId: "GMO_000001",
      component: "Glucose",
    });
    expect(result.warnings).toEqual([
      {
        code: "component-name-normalized",
        path: ["solutions", 0, "components", 0, "component"],
        message: "Component name for GMO_000001 was normalized to Glucose.",
      },
    ]);
  });

  it("skips GMO ID validation when component candidates are not provided", () => {
    const result = mapDraftAppDataToAppState(
      {
        ...createBaseDraft(),
        solutions: [
          {
            ...createBaseDraft().solutions[0],
            components: [
              {
                ...createBaseDraft().solutions[0].components[0],
                gmoId: "GMO_UNKNOWN",
                component: "Mystery component",
              },
            ],
          },
        ],
      },
      { createId },
    );

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }
    expect(result.state.entities.componentRows.entities["imported-component-1-1"]).toMatchObject({
      gmoId: "GMO_UNKNOWN",
      component: "Mystery component",
    });
    expect(result.warnings).toEqual([
      {
        code: "gmo-id-validation-skipped",
        path: ["solutions"],
        message: "GMO ID validation was skipped because component candidates were not provided.",
      },
    ]);
  });
});
