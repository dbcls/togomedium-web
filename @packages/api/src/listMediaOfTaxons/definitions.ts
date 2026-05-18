import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
  ListApiParams,
  ListApiResponse,
} from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export type ListMediaOfTaxonsResponse = ListApiResponse<{
  gm_id: string;
  name: string;
}>;

export type ListMediaOfTaxonsParams = ListApiParams<{
  /**
   * comma-separated list of taxon ids
   */
  tax_ids: string;
}>;

export const listMediaOfTaxonsURL = makeApiUrl("gmdb_media_by_taxon");
export const listMediaOfGtdbTaxonsURL = makeApiUrl("gmdb_media_by_gtdb_taxon");
export const PATH_LIST_MEDIA_OF_TAXONS = "/gmdb_media_by_taxon";
export const PATH_LIST_MEDIA_OF_GTDB_TAXONS = "/gmdb_media_by_gtdb_taxon";

const listMediaOfTaxonsResponseSchema = createListApiResponseSchema(
  z.object({
    gm_id: z.string(),
    name: z.string(),
    // NOTE: TypeSpec documents `original_media_id` but current TS usage does not.
  }),
);

const listMediaOfTaxonsParamsSchema = createListApiParamsSchema({
  tax_ids: z.string(),
});

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

export const listMediaOfTaxonsDoc: RouteConfig = {
  path: PATH_LIST_MEDIA_OF_TAXONS,
  method: "get",
  summary: "List media of taxons",
  description: "Search for media associated with a taxon and return a list",
  tags: [tags.list],
  request: {
    params: listMediaOfTaxonsParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listMediaOfTaxonsResponseSchema,
        },
      },
    },
  },
};

export const listMediaOfGtdbTaxonsDoc: RouteConfig = {
  path: PATH_LIST_MEDIA_OF_GTDB_TAXONS,
  method: "get",
  summary: "List media of GTDB taxons",
  description: "Search for media associated with a taxon and return a list",
  tags: [tags.list],
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
