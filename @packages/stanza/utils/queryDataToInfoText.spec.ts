import { describe, expect, it, test } from "vitest";
import { QueryData } from "../state/media-finder/queryData";
import { queryDataToInfoText } from "./queryDataToInfoText";

describe("queryDataToInfoText", () => {
  it("should return null when data is empty", () => {
    const result = queryDataToInfoText({});
    expect(result).toBe("");
  });
  it("should work", () => {
    const data: QueryData = {
      "tax-id": ["abc", "cdf", "aaa"],
    };
    const result = queryDataToInfoText(data);
    expect(result).toBe("tax-id:abc, cdf, aaa");
  });
  it("should work", () => {
    const data: QueryData = {
      "tax-id": ["abc", "cdf", "aaa"],
      "gmo-id": "aa",
      "pid-500": null,
    };
    const result = queryDataToInfoText(data);
    expect(result).toBe("tax-id:abc, cdf, aaa / gmo-id:aa / pid-500");
  });
});
