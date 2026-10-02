import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  searchComponentsParamsSchema,
  searchComponentsResponseSchema,
} from "../searchComponents/definitions";

export const PATH_SEARCH_COMPONENTS_FACETS = "/gmdb_search_components_facets";
export const searchComponentsFacetsParamsSchema = searchComponentsParamsSchema.pick({
  name: true,
  role_id: true,
  property_id: true,
});
export const searchComponentsFacetsResponseSchema = searchComponentsResponseSchema.shape.facets;
export type SearchComponentsFacetsParams = z.infer<typeof searchComponentsFacetsParamsSchema>;
export type SearchComponentsFacetsResponse = z.infer<typeof searchComponentsFacetsResponseSchema>;

// SPARQList repository registration accepted by the user; OpenAPI registration authorized.
export const searchComponentsFacetsDoc: RouteConfig = {
  path: PATH_SEARCH_COMPONENTS_FACETS,
  method: "get",
  summary: "Search component facets",
  description:
    "Return all Role and Property options with conditional counts. Role counts apply name and Property and include descendant Roles; Property counts apply name and inclusive Role. Each facet excludes its own selected condition. No pagination or sort parameters.",
  tags: ["Components"],
  request: { query: searchComponentsFacetsParamsSchema },
  responses: {
    200: {
      description: "Role and Property options including zero counts",
      content: { "application/json": { schema: searchComponentsFacetsResponseSchema } },
    },
  },
};
