import { tags } from "%api/consts";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const taxonChildrenItemSchema = z.object({
  tax_id: z.string(),
  name: z.string(),
  rank: z.string(),
});

const taxonChildrenResponseSchema = z.array(taxonChildrenItemSchema);

const taxonChildrenParamsSchema = z.object({
  tax_id: z.string(),
});

export type TaxonChildrenResponse = z.infer<typeof taxonChildrenResponseSchema>;
export type TaxonChildrenParams = z.infer<typeof taxonChildrenParamsSchema>;

export const PATH_TAXON_CHILDREN = "/gmdb_taxonomy_children";

export const taxonChildrenDoc: RouteConfig = {
  path: PATH_TAXON_CHILDREN,
  method: "get",
  summary: PATH_TAXON_CHILDREN,
  description: "Get taxon children by taxon ID",
  tags: [tags.mediaFinder],
  request: {
    params: taxonChildrenParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: taxonChildrenResponseSchema,
        },
      },
    },
  },
};
