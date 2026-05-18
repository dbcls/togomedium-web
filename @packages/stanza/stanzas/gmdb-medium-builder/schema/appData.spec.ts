import {
  appDataSchema,
  GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION,
} from "%stanza/stanzas/gmdb-medium-builder/schema/appData";
import { describe, expect, it } from "vitest";

const createValidDraft = () => ({
  schemaVersion: GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION,
  title: "GM12878 medium",
  description: null,
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
      schemaVersion: GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION,
      title: null,
      description: null,
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
              note: null,
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
});
