import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  ListApiParams,
  ListApiResponse,
} from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export type ListMediaByAttributesResponse = ListApiResponse<{ gm_id: string; name: string }>;

export type ListMediaByAttributesParams = ListApiParams<{ gmo_ids: string }>;

export const listMediaByAttributesURL = makeApiUrl("gmdb_media_by_attributes");
export const PATH_LIST_MEDIA_BY_ATTRIBUTES = "/gmdb_media_by_attributes";

const listMediaByAttributesResponseSchema = createListApiResponseSchema(
  z.object({
    gm_id: z.string(),
    name: z.string(),
    // NOTE: TypeSpec also documents `original_media_id` and `exact_match`,
    // but current TS usage only includes `gm_id` and `name`.
  }),
);

const listMediaByAttributesParamsSchema = createListApiParamsSchema({
  gmo_ids: z.string(),
});

export const listMediaByAttributesDoc: RouteConfig = {
  path: PATH_LIST_MEDIA_BY_ATTRIBUTES,
  method: "get",
  summary: "List media by attributes",
  description: "Search media by attributes",
  tags: [tags.mediaFinder, tags.list],
  request: {
    params: listMediaByAttributesParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listMediaByAttributesResponseSchema,
        },
      },
    },
  },
};
