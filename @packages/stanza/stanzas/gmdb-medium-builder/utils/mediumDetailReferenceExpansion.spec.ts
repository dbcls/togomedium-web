import type { MediumDetailResponse } from "%api/mediumDetail/definitions";
import {
  mediumDetailImportFixture,
  referencedMediumDetailImportFixture,
} from "%stanza/stanzas/gmdb-medium-builder/utils/fixtures/mediumDetailImport";
import { cloneMediumDetailResponse } from "%stanza/stanzas/gmdb-medium-builder/utils/fixtures/mediumDetailImportTestHelpers";
import { mapMediumDetailResponseToAppState } from "%stanza/stanzas/gmdb-medium-builder/utils/mediumDetailImportMapper";
import { expandReferenceMediumTables } from "%stanza/stanzas/gmdb-medium-builder/utils/mediumDetailReferenceExpansion";
import { describe, expect, it, vi } from "vitest";

type ReferenceMediumLoader = (gmId: string) => Promise<MediumDetailResponse>;

describe("expandReferenceMediumTables", () => {
  it("appends the matching reference table after main medium tables", async () => {
    const result = await expandReferenceMediumTables(
      mediumDetailImportFixture,
      createReferenceLoader(),
    );

    expect(result.success).toBe(true);

    if (!result.success) {
      return;
    }

    expect(result.response.components.map((table) => table.subcomponent_name)).toEqual([
      "Main solution",
      "Trace elements",
      "Trace element solution",
    ]);

    const mappedState = mapMediumDetailResponseToAppState(result.response, {
      createId: (params) => {
        if (params.kind === "solution") {
          return `imported-solution-${params.tableIndex + 1}`;
        }

        return `imported-component-${params.tableIndex + 1}-${params.componentIndex + 1}`;
      },
    });

    expect(mappedState.document.solutions).toEqual([
      "imported-solution-1",
      "imported-solution-2",
      "imported-solution-3",
    ]);
    expect(mappedState.entities.solutionBlocks.entities["imported-solution-3"]).toMatchObject({
      title: "Trace element solution",
      components: ["imported-component-3-1", "imported-component-3-2"],
    });
    expect(mappedState.entities.componentRows.entities["imported-component-3-2"]).toMatchObject({
      component: "ZnSO4",
      volume: 0.1,
      unit: "g/L",
    });
  });

  it("deduplicates repeated references to the same medium table", async () => {
    const responseWithDuplicateReference = cloneMediumDetailResponse(mediumDetailImportFixture);
    responseWithDuplicateReference.components[0].items.push({
      component_name: "Trace element solution",
      label: "Trace solution duplicate",
      volume: 2,
      unit: "mL/L",
      gmo_id: "GMO_000003",
      reference_media_id: "GM_000999",
    });
    const loadReferenceMedium = createReferenceLoader();

    const result = await expandReferenceMediumTables(
      responseWithDuplicateReference,
      loadReferenceMedium,
    );

    expect(result.success).toBe(true);

    if (!result.success) {
      return;
    }

    expect(loadReferenceMedium).toHaveBeenCalledTimes(1);
    expect(result.response.components.map((table) => table.subcomponent_name)).toEqual([
      "Main solution",
      "Trace elements",
      "Trace element solution",
    ]);
  });

  it("returns an import failure result when the reference medium cannot be fetched", async () => {
    const loadReferenceMedium = vi.fn<ReferenceMediumLoader>();
    loadReferenceMedium.mockRejectedValue(new Error("Network unavailable."));

    const result = await expandReferenceMediumTables(
      mediumDetailImportFixture,
      loadReferenceMedium,
    );

    expect(result).toMatchObject({
      success: false,
      error: {
        code: "reference-fetch-failed",
        message: "Import failed.",
        detail: "Reference medium GM_000999 could not be fetched.",
        referenceMediaId: "GM_000999",
        tableName: "Trace element solution",
      },
    });
  });

  it("returns an import failure result when the reference table is missing", async () => {
    const referenceWithoutTargetTable = cloneMediumDetailResponse(
      referencedMediumDetailImportFixture,
    );
    referenceWithoutTargetTable.components = referenceWithoutTargetTable.components.filter(
      (table) => table.subcomponent_name !== "Trace element solution",
    );

    const result = await expandReferenceMediumTables(
      mediumDetailImportFixture,
      createReferenceLoader(referenceWithoutTargetTable),
    );

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

  it("does not import main or referenced medium comments into the mapped state", async () => {
    const result = await expandReferenceMediumTables(
      mediumDetailImportFixture,
      createReferenceLoader(),
    );

    expect(result.success).toBe(true);

    if (!result.success) {
      return;
    }

    const mappedState = mapMediumDetailResponseToAppState(result.response);
    const serializedState = JSON.stringify(mappedState);

    expect(serializedState).not.toContain("Keep this comment out of the builder state in v1.");
    expect(serializedState).not.toContain("Referenced medium comments should not be imported.");
  });
});

const createReferenceLoader = (
  response: MediumDetailResponse = referencedMediumDetailImportFixture,
) => {
  return vi.fn(async (gmId: string) => {
    if (gmId !== "GM_000999") {
      throw new Error(`Unexpected reference medium ${gmId}.`);
    }

    return response;
  });
};
