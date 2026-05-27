import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const PATH_LIST_SIMILAR_MEDIA = "/gmdb_list_similar_media_by_gmid";

const listSimilarMediaResponseSchema = createListApiResponseSchema(
  z.object({
    gm_id: listApiLinkSchema,
    name: z.string(),
    score: z.number(),
  }),
);
export type ListSimilarMediaResponse = z.infer<typeof listSimilarMediaResponseSchema>;

const listSimilarMediaParamsSchema = createListApiParamsSchema({
  gm_id: z.string(),
});
export type ListSimilarMediaParams = z.infer<typeof listSimilarMediaParamsSchema>;

export const listSimilarMediaDoc: RouteConfig = {
  path: PATH_LIST_SIMILAR_MEDIA,
  method: "get",
  summary: "List similar media by GM ID",
  description: "Get similar growth media by GM ID",
  tags: [tags.list],
  request: {
    params: listSimilarMediaParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listSimilarMediaResponseSchema,
        },
      },
    },
  },
};
