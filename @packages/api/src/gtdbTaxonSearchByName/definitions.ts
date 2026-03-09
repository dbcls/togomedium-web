import { tags } from "%api/consts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const gtdbTaxonSearchByNameResponseSchema = z.array(
  z.object({
    tax_id: z.string(),
    name: z.string(),
    rank: z.string(),
  }),
);
const gtdbTaxonSearchByNameParamsSchema = z.object({
  q: z.string(),
  max: z.number().int(),
});

export type GtdbTaxonSearchByNameResponse = z.infer<typeof gtdbTaxonSearchByNameResponseSchema>;
export type GtdbTaxonSearchByNameParams = z.infer<typeof gtdbTaxonSearchByNameParamsSchema>;

export const gtdbTaxonSearchByNameUrl = makeApiUrl("gmdb_gtdb_taxonomy_search_by_name");
export const PATH_GTDB_TAXON_SEARCH_BY_NAME = "/gmdb_gtdb_taxonomy_search_by_name";

export const gtdbTaxonSearchByNameDoc: RouteConfig = {
  path: PATH_GTDB_TAXON_SEARCH_BY_NAME,
  method: "get",
  summary: "GTDB taxon search by name",
  description:
    "Searches for a taxonomy by its name, which is particularly useful for incremental searching.",
  tags: [tags.stanza, tags.gtdb],
  request: {
    params: gtdbTaxonSearchByNameParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: gtdbTaxonSearchByNameResponseSchema,
        },
      },
    },
  },
};
