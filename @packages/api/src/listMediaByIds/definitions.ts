import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const PATH_LIST_MEDIA_BY_IDS = "/gmdb_list_media_by_gmids";

const listMediaByIdsResponseSchema = createListApiResponseSchema(
  z.object({
    media_id: listApiLinkSchema,
    original_media_id: z.string(),
    media_name: z.string(),
  }),
);
export type ListMediaByIdsResponse = z.infer<typeof listMediaByIdsResponseSchema>;

const listMediaByIdsParamsSchema = createListApiParamsSchema({
  gm_ids: z.string(),
});
export type ListMediaByIdsParams = z.infer<typeof listMediaByIdsParamsSchema>;

export const listMediaByIdsDoc: RouteConfig = {
  path: PATH_LIST_MEDIA_BY_IDS,
  method: "get",
  summary: "List media by GMIDs",
  description: "List growth media with the given GMIDs",
  tags: [tags.list],
  request: {
    params: listMediaByIdsParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listMediaByIdsResponseSchema,
        },
      },
    },
  },
};
