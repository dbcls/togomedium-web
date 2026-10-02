import { expect, it } from "vitest";
import { getDocs } from "../openAPI";
import { searchComponentsFacetsParamsSchema } from "../searchComponentsFacets/definitions";
import {
  PATH_SEARCH_COMPONENTS_LIST,
  searchComponentsListParamsSchema,
  searchComponentsListResponseSchema,
} from "./definitions";

it("separates paging and sorting from facet input and response", () => {
  expect(searchComponentsListParamsSchema.parse({})).toMatchObject({
    sort: "medium_count",
    order: "desc",
    limit: "20",
    offset: "0",
  });
  for (const order of ["asc", "desc"])
    expect(searchComponentsListParamsSchema.parse({ sort: "medium_count", order })).toMatchObject({
      sort: "medium_count",
      order,
    });
  expect(searchComponentsListParamsSchema.safeParse({ sort: "invalid" }).success).toBe(false);
  const page = { contents: [], total: "0", limit: "20", offset: "0" };
  expect(searchComponentsListResponseSchema.parse(page)).toEqual(page);
  expect(
    searchComponentsListResponseSchema.safeParse({ ...page, facets: { roles: [], properties: [] } })
      .success,
  ).toBe(false);
  for (const key of ["sort", "order", "limit", "offset"])
    expect(searchComponentsFacetsParamsSchema.safeParse({ [key]: "name" }).success).toBe(false);
  expect(getDocs().paths?.[PATH_SEARCH_COMPONENTS_LIST]).toBeUndefined();
});
