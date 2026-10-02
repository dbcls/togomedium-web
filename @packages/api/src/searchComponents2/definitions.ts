import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  searchComponentsDoc,
  searchComponentsParamsSchema,
  searchComponentsResponseSchema,
} from "../searchComponents/definitions";

export const PATH_SEARCH_COMPONENTS2 = "/gmdb_search_components2";

export const searchComponents2ParamsSchema = searchComponentsParamsSchema.extend({
  sort: z.enum(["name", "id"]).default("name"),
  order: z.enum(["asc", "desc"]).default("asc"),
});
export const searchComponents2ResponseSchema = searchComponentsResponseSchema;
export type SearchComponents2Params = z.infer<typeof searchComponents2ParamsSchema>;
export type SearchComponents2Response = z.infer<typeof searchComponents2ResponseSchema>;

// Comparison API, local only; keep out of the public OpenAPI registry.
export const searchComponents2Doc: RouteConfig = {
  ...searchComponentsDoc,
  path: PATH_SEARCH_COMPONENTS2,
  summary: "Search components with page-local medium counts",
  description: `${searchComponentsDoc.description} Sort by name or GMO ID only; select the page before counting medium usages. Sorting by medium_count is not supported.`,
  request: { query: searchComponents2ParamsSchema },
};
