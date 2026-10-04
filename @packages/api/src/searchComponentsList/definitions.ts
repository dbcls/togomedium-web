import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { searchComponentsParamsSchema } from "../searchComponents/definitions";
import {
  searchComponents2ParamsSchema,
  searchComponents2ResponseSchema,
} from "../searchComponents2/definitions";
import { componentClassificationFilterSchema } from "./classification";

export const PATH_SEARCH_COMPONENTS_LIST = "/gmdb_search_components_list";
export const searchComponentsListParamsSchema = searchComponents2ParamsSchema.extend({
  role_id: componentClassificationFilterSchema,
  property_id: componentClassificationFilterSchema,
  sort: searchComponentsParamsSchema.shape.sort,
  order: searchComponentsParamsSchema.shape.order,
});
export const searchComponentsListResponseSchema = searchComponents2ResponseSchema.omit({
  facets: true,
});
export type SearchComponentsListParams = z.infer<typeof searchComponentsListParamsSchema>;
export type SearchComponentsListResponse = z.infer<typeof searchComponentsListResponseSchema>;

// SPARQList repository registration accepted by the user; OpenAPI registration authorized.
export const searchComponentsListDoc: RouteConfig = {
  path: PATH_SEARCH_COMPONENTS_LIST,
  method: "get",
  summary: "Search component list",
  description:
    "Search all-language preferred/alternative names or GMO IDs by case-insensitive substring. aliases contains English alternative labels in stable lexical order. Intersect inclusive Role and direct Property; empty classification means Any and none means no assignment of that RDF predicate. Name or GMO ID sorting counts direct medium usages after selecting a page; medium_count sorting counts all matching components before sorting and pagination. Return contents, total and pagination only; no facet aggregation runs.",
  tags: ["Components"],
  request: { query: searchComponentsListParamsSchema },
  responses: {
    200: {
      description: "Component page and total count",
      content: { "application/json": { schema: searchComponentsListResponseSchema } },
    },
  },
};
