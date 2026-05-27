import { tags } from "%api/consts";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const taxonSearchByNameItemSchema = z.object({
  tax_id: z.string(),
  name: z.string(),
  rank: z.string(),
});

const taxonSearchByNameResponseSchema = z.array(taxonSearchByNameItemSchema);

const taxonSearchByNameParamsSchema = z.object({
  q: z.string().min(4),
  max: z.number(),
});

export type TaxonSearchByNameResponse = z.infer<typeof taxonSearchByNameResponseSchema>;
export type TaxonSearchByNameParams = z.infer<typeof taxonSearchByNameParamsSchema>;
export const PATH_TAXON_SEARCH_BY_NAME = "/gmdb_taxonomy_search_by_name";

export const taxonSearchByNameDoc: RouteConfig = {
  path: PATH_TAXON_SEARCH_BY_NAME,
  method: "get",
  summary: PATH_TAXON_SEARCH_BY_NAME,
  description: "Search taxon by name",
  tags: [tags.stanza],
  request: {
    params: taxonSearchByNameParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: taxonSearchByNameResponseSchema,
        },
      },
    },
  },
};
