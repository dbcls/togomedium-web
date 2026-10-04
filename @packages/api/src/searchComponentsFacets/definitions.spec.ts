import { expect, it } from "vitest";
import { getDocs } from "../openAPI";
import {
  PATH_SEARCH_COMPONENTS_FACETS,
  searchComponentsFacetsParamsSchema,
  searchComponentsFacetsResponseSchema,
} from "./definitions";

it("keeps only search filters and preserves zero-count facet options", () => {
  expect(searchComponentsFacetsParamsSchema.parse({})).toEqual({
    name: "",
    role_id: "",
    property_id: "",
  });
  const response = {
    role_none_count: 0,
    property_none_count: 1,
    roles: [{ gmo_id: "GMO_000042", label_en: "Nutrient source", parent: null, count: 0 }],
    properties: [],
  };
  expect(searchComponentsFacetsResponseSchema.parse(response)).toEqual(response);
  expect(
    searchComponentsFacetsResponseSchema.safeParse({ ...response, contents: [] }).success,
  ).toBe(false);
  const operation = getDocs().paths?.[PATH_SEARCH_COMPONENTS_FACETS]?.get;
  expect(operation?.responses?.[200]).toBeDefined();
  expect(operation?.parameters).toEqual([
    expect.objectContaining({ name: "name" }),
    expect.objectContaining({ name: "role_id" }),
    expect.objectContaining({ name: "property_id" }),
  ]);
});

it("accepts none separately from Any and validates required unassigned counts", () => {
  expect(
    searchComponentsFacetsParamsSchema.parse({ role_id: "none", property_id: "none" }),
  ).toEqual({ name: "", role_id: "none", property_id: "none" });
  expect(searchComponentsFacetsParamsSchema.safeParse({ role_id: "no-role" }).success).toBe(false);
  for (const count of [-1, 0.5, Number.MAX_SAFE_INTEGER + 1]) {
    expect(
      searchComponentsFacetsResponseSchema.safeParse({
        roles: [],
        properties: [],
        role_none_count: count,
        property_none_count: 0,
      }).success,
    ).toBe(false);
  }
  expect(
    searchComponentsFacetsResponseSchema.safeParse({ roles: [], properties: [] }).success,
  ).toBe(false);
});
