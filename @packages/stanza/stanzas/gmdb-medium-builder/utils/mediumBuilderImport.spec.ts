import { GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION } from "%stanza/stanzas/gmdb-medium-builder/schema/appData";
import type { GmdbMediumBuilderDraftIdFactory } from "%stanza/stanzas/gmdb-medium-builder/schema/appDataMapper";
import {
  importMediumBuilderDraftJson,
  logMediumBuilderImportWarnings,
} from "%stanza/stanzas/gmdb-medium-builder/utils/mediumBuilderImport";
import { afterEach, describe, expect, it, vi } from "vitest";

const createId: GmdbMediumBuilderDraftIdFactory = (params) => {
  if (params.kind === "solution") {
    return `imported-solution-${(params.solutionIndex ?? 0) + 1}`;
  }

  return `imported-component-${(params.solutionIndex ?? 0) + 1}-${(params.componentIndex ?? 0) + 1}`;
};

const createDraft = () => ({
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
          component: "Wrong name",
          volume: 10,
          unit: "g",
          note: "primary",
        },
      ],
    },
  ],
});

const createFile = (content: string) => {
  return new File([content], "medium-builder-draft.json", { type: "application/json" });
};

describe("importMediumBuilderDraftJson", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reads, parses, validates, fetches candidates, and maps a draft to app state", async () => {
    const result = await importMediumBuilderDraftJson(createFile(JSON.stringify(createDraft())), {
      createId,
      fetchComponents: async () => [
        {
          gmo_id: "GMO_000001",
          name: "Glucose",
          japanese_name: "Glucose",
        },
      ],
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }
    expect(result.state.document).toEqual({
      title: "Imported medium",
      description: "Imported description",
      solutions: ["imported-solution-1"],
    });
    expect(result.state.entities.componentRows.entities["imported-component-1-1"]).toMatchObject({
      gmoId: "GMO_000001",
      component: "Glucose",
      volume: 10,
    });
    expect(result.warnings.map((warning) => warning.code)).toEqual(["component-name-normalized"]);
  });

  it("fails before mapping when JSON cannot be parsed", async () => {
    const fetchComponents = vi.fn();
    const result = await importMediumBuilderDraftJson(createFile("{"), {
      createId,
      fetchComponents,
    });

    expect(result.success).toBe(false);
    expect(fetchComponents).not.toHaveBeenCalled();
    if (result.success) {
      return;
    }
    expect(result.error.code).toBe("invalid-json");
  });

  it("rejects unsupported schemaVersion before fetching component candidates", async () => {
    const fetchComponents = vi.fn();
    const result = await importMediumBuilderDraftJson(
      createFile(JSON.stringify({ ...createDraft(), schemaVersion: "2026-05-17" })),
      {
        createId,
        fetchComponents,
      },
    );

    expect(result.success).toBe(false);
    expect(fetchComponents).not.toHaveBeenCalled();
    if (result.success) {
      return;
    }
    expect(result.error.code).toBe("unsupported-schema-version");
  });

  it("rejects schema validation failures before replacing state", async () => {
    const fetchComponents = vi.fn();
    const result = await importMediumBuilderDraftJson(
      createFile(JSON.stringify({ ...createDraft(), solutions: "not an array" })),
      {
        createId,
        fetchComponents,
      },
    );

    expect(result.success).toBe(false);
    expect(fetchComponents).not.toHaveBeenCalled();
    if (result.success) {
      return;
    }
    expect(result.error.code).toBe("schema-validation-failed");
    expect(result.error.detail).toMatch(/solutions/u);
  });

  it("continues without GMO ID validation when component candidates cannot be fetched", async () => {
    const result = await importMediumBuilderDraftJson(createFile(JSON.stringify(createDraft())), {
      createId,
      fetchComponents: async () => {
        throw new Error("Network unavailable.");
      },
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }
    expect(result.state.entities.componentRows.entities["imported-component-1-1"]).toMatchObject({
      gmoId: "GMO_000001",
      component: "Wrong name",
    });
    expect(result.warnings.map((warning) => warning.code)).toEqual([
      "component-candidates-fetch-failed",
      "gmo-id-validation-skipped",
    ]);
  });

  it("treats non-ok component candidate responses as fetch failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("Server error.", { status: 500 })),
    );

    const result = await importMediumBuilderDraftJson(createFile(JSON.stringify(createDraft())), {
      createId,
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }
    expect(result.warnings.map((warning) => warning.code)).toEqual([
      "component-candidates-fetch-failed",
      "gmo-id-validation-skipped",
    ]);
  });
});

describe("logMediumBuilderImportWarnings", () => {
  it("writes mapper warnings and fetch warnings to console.warn", () => {
    const warn = vi.fn();

    logMediumBuilderImportWarnings(
      [
        {
          code: "component-name-normalized",
          path: ["solutions", 0, "components", 0, "component"],
          message: "Component name was normalized.",
        },
        {
          code: "component-candidates-fetch-failed",
          path: [],
          message: "Component candidates could not be fetched.",
          error: new Error("Network unavailable."),
        },
      ],
      warn,
    );

    expect(warn).toHaveBeenCalledTimes(2);
    expect(warn).toHaveBeenCalledWith(
      "[MediumBuilderImport] component-name-normalized at solutions.0.components.0.component: Component name was normalized.",
    );
    expect(warn).toHaveBeenCalledWith(
      "[MediumBuilderImport] Component candidates could not be fetched.",
      expect.any(Error),
    );
  });
});
