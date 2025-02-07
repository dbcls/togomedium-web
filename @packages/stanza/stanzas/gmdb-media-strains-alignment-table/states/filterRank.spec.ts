import { __TEST__ } from "./filterRank";
import { lineageRanks } from "../functions/types";
const { findCurrentFilterRank, makeDefaultStatus } = __TEST__;
import { describe, expect, it, test } from "vitest";

describe("findCurrentFilterRank", () => {
  it("should return 'strain' when default", () => {
    const defaultStatus = makeDefaultStatus();
    const result = findCurrentFilterRank(defaultStatus);
    expect(result).toBe("strain");
  });
  it("should return 'species' when only `strain` is active", () => {
    const defaultStatus = makeDefaultStatus();
    defaultStatus.strain = true;
    const result = findCurrentFilterRank(defaultStatus);
    expect(result).toBe("species");
  });
  it("should return 'strain' when only `species` is active", () => {
    const defaultStatus = makeDefaultStatus();
    defaultStatus.species = true;
    const result = findCurrentFilterRank(defaultStatus);
    expect(result).toBe("strain");
  });
  it("should return 'genus' when 'strain,species' are active", () => {
    const defaultStatus = makeDefaultStatus();
    defaultStatus.strain = true;
    defaultStatus.species = true;
    const result = findCurrentFilterRank(defaultStatus);
    expect(result).toBe("genus");
  });
  it("should return 'superkingdom' when all folding are active", () => {
    const defaultStatus = makeDefaultStatus();
    lineageRanks.forEach((key) => {
      defaultStatus[key] = true;
    });
    const result = findCurrentFilterRank(defaultStatus);
    expect(result).toBe("superkingdom");
  });
});
