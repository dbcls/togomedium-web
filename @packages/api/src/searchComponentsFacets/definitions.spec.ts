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
    roles: [{ gmo_id: "GMO_000042", label_en: "Nutrient source", parent: null, count: 0 }],
    properties: [],
  };
  expect(searchComponentsFacetsResponseSchema.parse(response)).toEqual(response);
  expect(
    searchComponentsFacetsResponseSchema.safeParse({ ...response, contents: [] }).success,
  ).toBe(false);
  expect(getDocs().paths?.[PATH_SEARCH_COMPONENTS_FACETS]).toBeUndefined();
});
