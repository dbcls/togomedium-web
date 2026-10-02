import { expect, it } from "vitest";
import { getDocs } from "../openAPI";
import { PATH_SEARCH_COMPONENTS2, searchComponents2ParamsSchema } from "./definitions";

it("keeps page-local search on name/id and defaults to name ascending", () => {
  expect(searchComponents2ParamsSchema.parse({})).toMatchObject({
    sort: "name",
    order: "asc",
    limit: "20",
    offset: "0",
  });
  for (const sort of ["name", "id"]) {
    for (const order of ["asc", "desc"])
      expect(searchComponents2ParamsSchema.safeParse({ sort, order }).success).toBe(true);
  }
  expect(searchComponents2ParamsSchema.safeParse({ sort: "medium_count" }).success).toBe(false);
  expect(PATH_SEARCH_COMPONENTS2).toBe("/gmdb_search_components2");
  expect(getDocs().paths?.[PATH_SEARCH_COMPONENTS2]).toBeUndefined();
});
