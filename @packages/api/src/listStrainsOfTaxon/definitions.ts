import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const PATH_LIST_STRAINS_OF_TAXON = "/gmdb_strain_list_by_taxid";

const listStrainsOfTaxonResponseSchema = createListApiResponseSchema(
  z.object({
    id: listApiLinkSchema,
    name: z.string(),
    other_ids: z.string(),
  }),
);
export type ListStrainsOfTaxonResponse = z.infer<typeof listStrainsOfTaxonResponseSchema>;

const listStrainsOfTaxonParamsSchema = createListApiParamsSchema({
  tax_id: z.string(),
});
export type ListStrainsOfTaxonParams = z.infer<typeof listStrainsOfTaxonParamsSchema>;

export const listStrainsOfTaxonDoc: RouteConfig = {
  path: PATH_LIST_STRAINS_OF_TAXON,
  method: "get",
  summary: "List strains of taxon",
  description: "List organisms with the given tax IDs",
  tags: [tags.list],
  request: {
    params: listStrainsOfTaxonParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listStrainsOfTaxonResponseSchema,
        },
      },
    },
  },
};
