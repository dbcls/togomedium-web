import { describe, expect, it } from "vitest";
import { componentRoleOptions } from "./componentListOptions";

describe("componentRoleOptions", () => {
  it("orders ancestors before children and keeps zero-count and orphaned roles", () => {
    const options = componentRoleOptions(
      [
        { gmo_id: "GMO_000002", label_en: "Carbon source", parent: "GMO_000001", count: 0 },
        { gmo_id: "GMO_000003", label_en: "Orphan", parent: "GMO_999999", count: 2 },
        { gmo_id: "GMO_000001", label_en: "Nutrient source", parent: null, count: 5 },
      ],
      true,
    );
    expect(options).toEqual([
      { id: "GMO_000001", label: "Nutrient source", depth: 0, count: 5 },
      { id: "GMO_000002", label: "Carbon source", depth: 1, count: 0 },
      { id: "GMO_000003", label: "Orphan", depth: 0, count: 2 },
    ]);
  });
  it("terminates cyclic ancestry, preserves label fallback and withholds stale counts", () => {
    const options = componentRoleOptions(
      [
        { gmo_id: "GMO_000001", label_en: "", parent: "GMO_000002", count: 4 },
        { gmo_id: "GMO_000002", label_en: "Role", parent: "GMO_000001", count: 2 },
      ],
      false,
    );
    expect(options).toEqual([
      { id: "GMO_000001", label: "GMO_000001", depth: 0, count: undefined },
      { id: "GMO_000002", label: "Role", depth: 1, count: undefined },
    ]);
  });
});
