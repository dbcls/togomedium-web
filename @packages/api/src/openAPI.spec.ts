import { describe, expect, it } from "vitest";
import { getDocs } from "./openAPI";

describe("OpenAPI document generation", () => {
  it("generates the API document with the medium detail response schema", () => {
    const document = getDocs();

    expect(document.openapi).toBe("3.1.0");
    expect(document.info.title).toBe("TogoMedium API");
    expect(document.paths?.["/gmdb_medium_by_gmid"]?.get?.responses?.["200"]).toMatchObject({
      description: "Success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: expect.arrayContaining(["meta", "components", "comments"]),
          },
        },
      },
    });
    expect(() => JSON.stringify(document)).not.toThrow();
  });
});
