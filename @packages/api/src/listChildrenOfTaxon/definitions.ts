import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

/**
 * @deprecated
 */
export const listChildrenOfTaxonUrl = makeApiUrl("gmdb_organism_under_rank_by_taxid");
export const PATH_LIST_CHILDREN_OF_TAXON = "/gmdb_organism_under_rank_by_taxid";

const listChildrenOfTaxonResponseSchema = createListApiResponseSchema(
  z.object({
    tax_id: listApiLinkSchema,
    name: z.string(),
    rank: z.string(),
    num_of_media: z.number().int(),
  }),
);
export type ListChildrenOfTaxonResponse = z.infer<typeof listChildrenOfTaxonResponseSchema>;

const listChildrenOfTaxonParamsSchema = createListApiParamsSchema({ tax_id: z.string() });
export type ListChildrenOfTaxonParams = z.infer<typeof listChildrenOfTaxonParamsSchema>;

export const listChildrenOfTaxonDoc: RouteConfig = {
  path: PATH_LIST_CHILDREN_OF_TAXON,
  method: "get",
  summary: "List children of taxon",
  description: "List children of taxon",
  tags: [tags.list],
  request: {
    params: listChildrenOfTaxonParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listChildrenOfTaxonResponseSchema,
        },
      },
    },
  },
};
