import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
  ListApiLink,
  ListApiParams,
  ListApiResponse,
} from "%api/ListApi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export type ListMediaOfGtdbTaxonsResponse = ListApiResponse<{
  name: string;
  original_media_id: string;
  media_id: ListApiLink;
}>;

export type ListMediaOfGtdbTaxonsParams = ListApiParams<{
  /**
   * GTDB taxonomy ID
   */
  tax_id: string;
}>;

export const PATH_LIST_MEDIA_OF_GTDB_TAXONS = "/gmdb_media_by_gtdb_taxon";

const listMediaOfGtdbTaxonsResponseSchema = createListApiResponseSchema(
  z.object({
    name: z.string(),
    original_media_id: z.string(),
    media_id: listApiLinkSchema,
  }),
);

const listMediaOfGtdbTaxonsParamsSchema = createListApiParamsSchema({
  tax_id: z.string(),
});

export const listMediaOfGtdbTaxonsDoc: RouteConfig = {
  path: PATH_LIST_MEDIA_OF_GTDB_TAXONS,
  method: "get",
  summary: "List media of GTDB taxons",
  description: "Search for media associated with a GTDB taxon and return a list",
  tags: [tags.list, tags.gtdb],
  request: {
    params: listMediaOfGtdbTaxonsParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listMediaOfGtdbTaxonsResponseSchema,
        },
      },
    },
  },
};
