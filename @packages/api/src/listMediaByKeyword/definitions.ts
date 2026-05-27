import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const PATH_LIST_MEDIA_BY_KEYWORD = "/gmdb_list_media_by_keyword";

const listMediaByKeywordResponseSchema = createListApiResponseSchema(
  z.object({
    media_id: listApiLinkSchema,
    original_media_id: z.string(),
    media_name: z.string(),
  }),
);
export type ListMediaByKeywordResponse = z.infer<typeof listMediaByKeywordResponseSchema>;

const listMediaByKeywordParamsSchema = createListApiParamsSchema({
  keyword: z.string(),
});
export type ListMediaByKeywordParams = z.infer<typeof listMediaByKeywordParamsSchema>;

export const listMediaByKeywordDoc: RouteConfig = {
  path: PATH_LIST_MEDIA_BY_KEYWORD,
  method: "get",
  summary: "List media by keyword",
  description: "List growth media with the given keyword",
  tags: [tags.list],
  request: {
    params: listMediaByKeywordParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listMediaByKeywordResponseSchema,
        },
      },
    },
  },
};
