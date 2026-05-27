import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  ListApiParams,
  ListApiResponse,
} from "%api/ListApi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export type ListMediaOfTaxonResponse = ListApiResponse<{
  gm_id: string;
  name: string;
}>;

export type ListMediaOfTaxonParams = ListApiParams<{
  /**
   * comma-separated list of taxon ids
   */
  tax_id: string;
}>;

export const PATH_LIST_MEDIA_OF_TAXON = "/gmdb_media_by_taxid";

const listMediaOfTaxonResponseSchema = createListApiResponseSchema(
  z.object({
    gm_id: z.string(),
    name: z.string(),
    // NOTE: TypeSpec documents `media_id` and `original_media_id` instead of `gm_id`.
  }),
);

const listMediaOfTaxonParamsSchema = createListApiParamsSchema({
  tax_id: z.string(),
});

export const listMediaOfTaxonDoc: RouteConfig = {
  path: PATH_LIST_MEDIA_OF_TAXON,
  method: "get",
  summary: "List media of taxon",
  description: "Search for media associated with a taxon and return a list",
  tags: [tags.list],
  request: {
    params: listMediaOfTaxonParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listMediaOfTaxonResponseSchema,
        },
      },
    },
  },
};
