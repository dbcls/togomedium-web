import { tags } from "%api/consts";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const gtdbTaxonChildrenResponseSchema = z.object({
  items: z.array(
    z.object({
      tax_id: z.string(),
      name: z.string(),
      rank: z.string(),
    }),
  ),
});
const gtdbTaxonChildrenParamsSchema = z.object({
  tax_id: z.string(),
});

export type GtdbTaxonChildrenResponse = z.infer<typeof gtdbTaxonChildrenResponseSchema>;
export type GtdbTaxonChildrenParams = z.infer<typeof gtdbTaxonChildrenParamsSchema>;

export const PATH_GTDB_TAXON_CHILDREN = "/gmdb_gtdb_taxonomy_children";

export const gtdbTaxonChildrenDoc: RouteConfig = {
  path: PATH_GTDB_TAXON_CHILDREN,
  method: "get",
  summary: "GTDB taxon children",
  description:
    "Returns the direct children of the given taxonomy ID. Mostly used at 'Find media by taxonomic tree' page.",
  tags: [tags.mediaFinder, tags.gtdb],
  request: {
    params: gtdbTaxonChildrenParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: gtdbTaxonChildrenResponseSchema,
        },
      },
    },
  },
};
