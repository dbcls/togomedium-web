import { describe, expect, it } from "vitest";
import { findBranchFromTrunk } from "./findBranchFromTrunk";
import { makeRawComponent } from "./testing";
import { makeComponentTree } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/functions/makeComponentBranch";
import { ComponentTrunk } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/types";

describe("findBranchFromTrunk", () => {
  it("should find branch", () => {
    const result = findBranchFromTrunk("2", tree);
    if (!result) return;
    expect(result.id).toBe("2");
    expect(result.level).toBe(0);
  });

  it("should find nested branch", () => {
    const result = findBranchFromTrunk("1-2-1", tree);
    if (!result) return;
    expect(result.id).toBe("1-2-1");
    expect(result.level).toBe(2);
  });
});

const tree: ComponentTrunk = makeComponentTree([
  makeRawComponent("1"),
  makeRawComponent("2"),
  makeRawComponent("3"),
  makeRawComponent("1-1", "1"),
  makeRawComponent("1-2", "1"),
  makeRawComponent("3-1", "3"),
  makeRawComponent("1-1-1", "1-1"),
  makeRawComponent("1-1-2", "1-1"),
  makeRawComponent("1-2-1", "1-2"),
  makeRawComponent("1-1-1-1", "1-1-1"),
]);
