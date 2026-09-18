import { describe, expect, it } from "vitest";
import { readOptionalStringParameter, readStringParameter } from "./parameters";

describe("Stanza string parameters", () => {
  it.each(["M1", "", " M1, M2 ", "false"])("preserves the string %j", (value) => {
    expect(readStringParameter(value, "gm_ids")).toBe(value);
    expect(readOptionalStringParameter(value, "gm_ids")).toBe(value);
  });

  it("keeps omitted optional values undefined so callers can apply defaults", () => {
    expect(readOptionalStringParameter(undefined, "source_gm_id")).toBeUndefined();
    expect(readOptionalStringParameter(undefined, "limit") ?? "20").toBe("20");
    expect(readOptionalStringParameter("", "limit") ?? "20").toBe("");
  });

  it("rejects an omitted required parameter with its name", () => {
    expect(() => readStringParameter(undefined, "gm_id")).toThrow(
      'Stanza parameter "gm_id" must be a string.',
    );
  });

  it.each([null, 0, false, [], {}, new Date(0)])("rejects nonstring input %j", (value) => {
    expect(() => readStringParameter(value, "gm_id")).toThrow(TypeError);
    expect(() => readOptionalStringParameter(value, "gm_id")).toThrow(TypeError);
  });
});
