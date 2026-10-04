import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  searchComponentsParamsSchema,
  searchComponentsResponseSchema,
} from "../searchComponents/definitions";
import { componentClassificationFilterSchema } from "../searchComponentsList/classification";

export const PATH_SEARCH_COMPONENTS_FACETS = "/gmdb_search_components_facets";
export const searchComponentsFacetsParamsSchema = searchComponentsParamsSchema
  .pick({
    name: true,
    role_id: true,
    property_id: true,
  })
  .extend({
    role_id: componentClassificationFilterSchema,
    property_id: componentClassificationFilterSchema,
  });
export const searchComponentsFacetsResponseSchema =
  searchComponentsResponseSchema.shape.facets.extend({
    role_none_count: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
    property_none_count: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
  });
export type SearchComponentsFacetsParams = z.infer<typeof searchComponentsFacetsParamsSchema>;
export type SearchComponentsFacetsResponse = z.infer<typeof searchComponentsFacetsResponseSchema>;

// SPARQList repository registration accepted by the user; OpenAPI registration authorized.
export const searchComponentsFacetsDoc: RouteConfig = {
  path: PATH_SEARCH_COMPONENTS_FACETS,
  method: "get",
  summary: "Search component facets",
  description:
    "Return all Role and Property options plus role_none_count/property_none_count for components without assignments. Search all-language names or GMO IDs by case-insensitive substring. Role counts apply search and Property and include descendant Roles; Property counts apply search and inclusive Role. Empty classification means Any; none requires no assignment of the RDF predicate, regardless of classification labels. Each facet including its none count excludes its own selected condition. Zero counts remain. No pagination or sort parameters.",
  tags: ["Components"],
  request: { query: searchComponentsFacetsParamsSchema },
  responses: {
    200: {
      description: "Role and Property options including zero counts",
      content: { "application/json": { schema: searchComponentsFacetsResponseSchema } },
    },
  },
};
