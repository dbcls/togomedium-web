import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const taxonAncestorsItemSchema = z.object({
  tax_id: z.string(),
  name: z.string(),
  rank: z.string(),
});

const taxonAncestorsResponseSchema = z.array(taxonAncestorsItemSchema);

const taxonAncestorsParamsSchema = z.object({
  tax_id: z.string(),
});

export type TaxonAncestorsResponse = z.infer<typeof taxonAncestorsResponseSchema>;
export type TaxonAncestorsParams = z.infer<typeof taxonAncestorsParamsSchema>;

/**
 * @deprecated
 */
export const taxonAncestorsURL = makeApiUrl("gmdb_taxonomy_ancestors");
export const gtdbTaxonAncestorsURL = makeApiUrl("gmdb_taxonomy_gtdb_ancestors");
export const PATH_TAXON_ANCESTORS = "gmdb_taxonomy_ancestors";

export const taxonAncestorsDoc: RouteConfig = {
  path: PATH_TAXON_ANCESTORS,
  method: "get",
  summary: PATH_TAXON_ANCESTORS,
  description: "Get taxon ancestors by taxon ID",
  tags: [],
  request: {
    params: taxonAncestorsParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: taxonAncestorsResponseSchema,
        },
      },
    },
  },
};
