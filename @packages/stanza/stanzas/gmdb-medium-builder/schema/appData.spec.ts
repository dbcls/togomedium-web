import {
  appDataSchema,
  DRAFT_SCHEMA_VERSION,
} from "%stanza/stanzas/gmdb-medium-builder/schema/appData";
import { describe, expect, it } from "vitest";

const createValidDraft = () => ({
  schemaVersion: DRAFT_SCHEMA_VERSION,
  title: "GM12878 medium",
  description: null,
  provenance: {
    importSourceGmId: "GM_000001",
    originalMediaId: "NBRC 123",
    sourceUrl: "https://example.org/medium/GM_000001",
  },
  solutions: [
    {
      title: null,
      description: "Basal solution",
      components: [
        {
          gmoId: null,
          component: "NaCl",
          volume: 1.5,
          unit: "g/L",
          concentrationValue: 25,
          concentrationUnit: "mM",
          note: null,
        },
      ],
    },
  ],
});

describe("appDataSchema", () => {
  it("parses a draft with the supported schema version", () => {
    const draft = createValidDraft();

    expect(appDataSchema.parse(draft)).toEqual(draft);
  });

  it("rejects a draft without schemaVersion", () => {
    const { schemaVersion: _schemaVersion, ...draftWithoutSchemaVersion } = createValidDraft();

    expect(appDataSchema.safeParse(draftWithoutSchemaVersion).success).toBe(false);
  });

  it("rejects an unsupported schemaVersion", () => {
    const draft = {
      ...createValidDraft(),
      schemaVersion: "2026-05-17",
    };

    expect(appDataSchema.safeParse(draft).success).toBe(false);
  });

  it("rejects a draft with missing required fields", () => {
    const draft: unknown = {
      ...createValidDraft(),
      solutions: [
        {
          ...createValidDraft().solutions[0],
          components: [
            {
              gmoId: null,
              component: "NaCl",
              volume: 1.5,
              note: null,
              concentrationValue: 25,
              concentrationUnit: "mM",
            },
          ],
        },
      ],
    };

    expect(appDataSchema.safeParse(draft).success).toBe(false);
  });

  it("strips unknown fields from parsed output", () => {
    const draft = {
      ...createValidDraft(),
      unknownTopLevel: true,
      solutions: [
        {
          ...createValidDraft().solutions[0],
          unknownSolutionField: true,
          components: [
            {
              ...createValidDraft().solutions[0].components[0],
              unknownComponentField: true,
            },
          ],
        },
      ],
    };

    expect(appDataSchema.parse(draft)).toEqual(createValidDraft());
  });

  it("keeps nullable fields nullable", () => {
    const draft = {
      schemaVersion: DRAFT_SCHEMA_VERSION,
      title: null,
      description: null,
      provenance: {
        importSourceGmId: null,
        originalMediaId: null,
        sourceUrl: null,
      },
      solutions: [
        {
          title: null,
          description: null,
          components: [
            {
              gmoId: null,
              component: null,
              volume: null,
              unit: null,
              concentrationValue: null,
              concentrationUnit: null,
              note: null,
            },
          ],
        },
      ],
    };

    expect(appDataSchema.parse(draft)).toEqual(draft);
  });

  it("keeps zero distinct from null for nullable number fields", () => {
    const draft = {
      ...createValidDraft(),
      solutions: [
        {
          ...createValidDraft().solutions[0],
          components: [
            {
              ...createValidDraft().solutions[0].components[0],
              volume: 0,
              concentrationValue: 0,
            },
            {
              ...createValidDraft().solutions[0].components[0],
              volume: null,
              concentrationValue: null,
            },
          ],
        },
      ],
    };

    expect(appDataSchema.parse(draft)).toEqual(draft);
  });

  it("accepts arbitrary nullable unit strings", () => {
    const draft = {
      ...createValidDraft(),
      solutions: [
        {
          ...createValidDraft().solutions[0],
          components: [
            {
              ...createValidDraft().solutions[0].components[0],
              unit: "custom plating spoon",
              concentrationUnit: "custom molarity",
            },
            {
              ...createValidDraft().solutions[0].components[0],
              unit: null,
              concentrationUnit: null,
            },
          ],
        },
      ],
    };

    expect(appDataSchema.parse(draft)).toEqual(draft);
  });

  it("rejects non-finite volume values", () => {
    const draft = createValidDraft();

    draft.solutions[0].components[0].volume = Infinity;

    expect(appDataSchema.safeParse(draft).success).toBe(false);
  });

  it("rejects non-finite concentration values", () => {
    const draft = createValidDraft();

    draft.solutions[0].components[0].concentrationValue = Infinity;

    expect(appDataSchema.safeParse(draft).success).toBe(false);
  });
});
