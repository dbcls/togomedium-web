import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const listMediaByCultivableCountResponseSchema = createListApiResponseSchema(
  z.object({
    media_id: listApiLinkSchema,
    original_media_id: z.string(),
    media_name: z.string(),
  }),
);
const listMediaByCultivableCountParamsSchema = createListApiParamsSchema({
  cultivable_count: z.number().int().optional(),
});

export type ListMediaByCultivableCountResponse = z.infer<
  typeof listMediaByCultivableCountResponseSchema
>;
export type ListMediaByCultivableCountParams = z.infer<
  typeof listMediaByCultivableCountParamsSchema
>;

export const PATH_LIST_MEDIA_BY_CULTIVABLE_COUNT = "/gmdb_list_media_by_cultivable_strain_count";

export const listMediaByCultivableCountDoc: RouteConfig = {
  path: PATH_LIST_MEDIA_BY_CULTIVABLE_COUNT,
  method: "get",
  summary: "List media by cultivable count",
  description: "List media by cultivable count",
  tags: [tags.list],
  request: {
    params: listMediaByCultivableCountParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listMediaByCultivableCountResponseSchema,
        },
      },
    },
  },
};
