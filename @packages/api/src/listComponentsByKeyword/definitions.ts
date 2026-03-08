import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const listComponentsByKeywordUrl = makeApiUrl("gmdb_list_components_by_keyword");
export const PATH_LIST_COMPONENTS_BY_KEYWORD = "/gmdb_list_components_by_keyword";

const listComponentsByKeywordResponseSchema = createListApiResponseSchema(
  z.object({
    gmo_id: listApiLinkSchema,
    name: z.string(),
  }),
);
export type ListComponentsByKeywordResponse = z.infer<typeof listComponentsByKeywordResponseSchema>;

const listComponentsByKeywordParamsSchema = createListApiParamsSchema({
  keyword: z.string(),
});
export type ListComponentsByKeywordParams = z.infer<typeof listComponentsByKeywordParamsSchema>;

export const listComponentsByKeywordDoc: RouteConfig = {
  path: PATH_LIST_COMPONENTS_BY_KEYWORD,
  method: "get",
  summary: "List components by keyword",
  description: "List growth media components with the given keyword",
  tags: [tags.list],
  request: {
    params: listComponentsByKeywordParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listComponentsByKeywordResponseSchema,
        },
      },
    },
  },
};
