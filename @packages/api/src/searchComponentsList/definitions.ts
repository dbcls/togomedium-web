import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  searchComponents2ParamsSchema,
  searchComponents2ResponseSchema,
} from "../searchComponents2/definitions";

export const PATH_SEARCH_COMPONENTS_LIST = "/gmdb_search_components_list";
export const searchComponentsListParamsSchema = searchComponents2ParamsSchema;
export const searchComponentsListResponseSchema = searchComponents2ResponseSchema.omit({
  facets: true,
});
export type SearchComponentsListParams = z.infer<typeof searchComponentsListParamsSchema>;
export type SearchComponentsListResponse = z.infer<typeof searchComponentsListResponseSchema>;

// Local registration only; production publication and OpenAPI registration are pending.
export const searchComponentsListDoc: RouteConfig = {
  path: PATH_SEARCH_COMPONENTS_LIST,
  method: "get",
  summary: "Search component list",
  description:
    "Search component names, inclusive Role and direct Property, select a page ordered by name or GMO ID, then count direct medium usages for that page. Return contents, total and pagination only; no facet aggregation runs.",
  tags: ["Components"],
  request: { query: searchComponentsListParamsSchema },
  responses: {
    200: {
      description: "Component page and total count",
      content: { "application/json": { schema: searchComponentsListResponseSchema } },
    },
  },
};
