import { OpenAPIRegistry, OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import { describe, expect, it } from "vitest";
import { getDocs } from "../openAPI";
import {
  PATH_SEARCH_COMPONENTS,
  searchComponentsDoc,
  searchComponentsParamsSchema,
  searchComponentsResponseSchema,
} from "./definitions";

describe("component search contract", () => {
  it("defaults to the Web's initial search and accepts literal names", () => {
    expect(searchComponentsParamsSchema.parse({})).toEqual({
      name: "",
      role_id: "",
      property_id: "",
      sort: "medium_count",
      order: "desc",
      limit: "20",
      offset: "0",
    });
    expect(searchComponentsParamsSchema.parse({ name: 'a,"b"\\c\n{{role_id}}' }).name).toBe(
      'a,"b"\\c\n{{role_id}}',
    );
    for (const params of [
      { limit: "-1" },
      { offset: "01" },
      { role_id: "wrong" },
      { sort: "unknown" },
      { limit: "9007199254740992" },
      { other: "value" },
    ]) {
      expect(searchComponentsParamsSchema.safeParse(params).success).toBe(false);
    }
  });

  it("retains zero-count facets on empty pages and rejects malformed counts", () => {
    const empty = {
      contents: [],
      total: "0",
      limit: "20",
      offset: "0",
      facets: {
        roles: [{ gmo_id: "GMO_000042", label_en: "Nutrient source", parent: null, count: 0 }],
        properties: [{ gmo_id: "GMO_000050", label_en: "Complex component", count: 0 }],
      },
    };
    expect(searchComponentsResponseSchema.parse(empty)).toEqual(empty);
    for (const count of [-1, 0.5, "0", Number.MAX_SAFE_INTEGER + 1]) {
      expect(
        searchComponentsResponseSchema.safeParse({
          ...empty,
          facets: {
            ...empty.facets,
            properties: [{ ...empty.facets.properties[0], count }],
          },
        }).success,
      ).toBe(false);
    }
    expect(searchComponentsResponseSchema.safeParse({ ...empty, facets: undefined }).success).toBe(
      false,
    );
  });

  it("generates a query-parameter OpenAPI definition without publishing it", () => {
    expect(getDocs().paths?.[PATH_SEARCH_COMPONENTS]).toBeUndefined();
    const registry = new OpenAPIRegistry();
    registry.registerPath(searchComponentsDoc);
    const doc = new OpenApiGeneratorV31(registry.definitions).generateDocument({
      openapi: "3.1.0",
      info: { title: "Search contract", version: "1" },
    });
    const operation = doc.paths?.[PATH_SEARCH_COMPONENTS]?.get;
    expect(operation?.parameters).toHaveLength(7);
    expect(operation?.parameters).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: "name", in: "query" })]),
    );
    expect(() => JSON.stringify(doc)).not.toThrow();
  });
});
