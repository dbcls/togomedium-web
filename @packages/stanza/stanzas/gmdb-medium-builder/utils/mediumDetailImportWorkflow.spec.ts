import { referencedMediumDetailImportFixture } from "%stanza/stanzas/gmdb-medium-builder/utils/fixtures/mediumDetailImport";
import {
  createMediumDetailFixtureLoader,
  cloneMediumDetailResponse,
} from "%stanza/stanzas/gmdb-medium-builder/utils/fixtures/mediumDetailImportTestHelpers";
import { importMediumDetailByGmId } from "%stanza/stanzas/gmdb-medium-builder/utils/mediumDetailImportWorkflow";
import { describe, expect, it, vi } from "vitest";

describe("importMediumDetailByGmId", () => {
  it("imports a medium detail response and referenced tables through fixture loaders", async () => {
    const loadMediumDetail = vi.fn(createMediumDetailFixtureLoader());

    const result = await importMediumDetailByGmId("GM_000001", { loadMediumDetail });

    expect(result.success).toBe(true);
    expect(loadMediumDetail).toHaveBeenCalledTimes(2);
    expect(loadMediumDetail).toHaveBeenNthCalledWith(1, "GM_000001", undefined);
    expect(loadMediumDetail).toHaveBeenNthCalledWith(2, "GM_000999", undefined);

    if (!result.success) {
      return;
    }

    expect(result.state.document).toMatchObject({
      title: "Imported NBRC medium",
      solutions: expect.arrayContaining([
        expect.stringMatching(/^solution-/),
        expect.stringMatching(/^solution-/),
        expect.stringMatching(/^solution-/),
      ]),
    });
    expect(Object.values(result.state.entities.solutionBlocks.entities)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Trace element solution",
        }),
      ]),
    );
    expect(Object.values(result.state.entities.componentRows.entities)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          component: "ZnSO4",
          volume: 0.1,
          unit: "g/L",
        }),
      ]),
    );
  });

  it("returns an import failure without calling the real API when the main fixture is missing", async () => {
    const loadMediumDetail = vi.fn(createMediumDetailFixtureLoader({ GM_000001: undefined }));

    const result = await importMediumDetailByGmId("GM_000001", { loadMediumDetail });

    expect(result).toMatchObject({
      success: false,
      error: {
        message: "Import failed.",
        detail: "Medium GM_000001 could not be fetched.",
      },
    });
    expect(loadMediumDetail).toHaveBeenCalledTimes(1);
  });

  it("returns a fixture-based reference error when the referenced table is missing", async () => {
    const referenceWithoutTargetTable = cloneMediumDetailResponse(
      referencedMediumDetailImportFixture,
    );
    referenceWithoutTargetTable.components = referenceWithoutTargetTable.components.filter(
      (table) => table.subcomponent_name !== "Trace element solution",
    );
    const loadMediumDetail = vi.fn(
      createMediumDetailFixtureLoader({
        GM_000999: referenceWithoutTargetTable,
      }),
    );

    const result = await importMediumDetailByGmId("GM_000001", { loadMediumDetail });

    expect(result).toEqual({
      success: false,
      error: {
        code: "reference-table-missing",
        message: "Import failed.",
        detail: 'Reference medium GM_000999 does not include table "Trace element solution".',
        referenceMediaId: "GM_000999",
        tableName: "Trace element solution",
      },
    });
  });
});
