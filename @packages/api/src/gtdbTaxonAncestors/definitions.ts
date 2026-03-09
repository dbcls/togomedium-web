import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const gtdbTaxonAncestorsResponseSchema = z.array(
  z.object({
    tax_id: z.string(),
    name: z.string(),
    rank: z.string(),
  }),
);
const gtdbTaxonAncestorsParamsSchema = z.object({
  tax_id: z.string(),
});

export type GtdbTaxonAncestorsResponse = z.infer<typeof gtdbTaxonAncestorsResponseSchema>;
export type GtdbTaxonAncestorsParams = z.infer<typeof gtdbTaxonAncestorsParamsSchema>;

export const gtdbTaxonAncestorsUrl = makeApiUrl("gmdb_gtdb_taxonomy_ancestors");
export const PATH_GTDB_TAXON_ANCESTORS = "/gmdb_gtdb_taxonomy_ancestors";

export const gtdbTaxonAncestorsDoc: RouteConfig = {
  path: PATH_GTDB_TAXON_ANCESTORS,
  method: "get",
  summary: "GTDB taxon ancestors",
  description:
    "Retrieve the ancestors of a taxonomy, useful for visualizing the taxon's hierarchical tree structure",
  tags: [],
  request: {
    params: gtdbTaxonAncestorsParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: gtdbTaxonAncestorsResponseSchema,
        },
      },
    },
  },
};
