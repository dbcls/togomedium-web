import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const listOrganismByKeywordUrl = makeApiUrl("gmdb_list_organisms_by_keyword");
export const PATH_LIST_ORGANISMS_BY_KEYWORD = "/gmdb_list_organisms_by_keyword";

const listOrganismByKeywordResponseSchema = createListApiResponseSchema(
  z.object({
    tax_id: listApiLinkSchema,
    label: z.string(),
  }),
);
export type ListOrganismByKeywordResponse = z.infer<typeof listOrganismByKeywordResponseSchema>;

const listOrganismByKeywordParamsSchema = createListApiParamsSchema({
  keyword: z.string(),
});
export type ListOrganismByKeywordParams = z.infer<typeof listOrganismByKeywordParamsSchema>;

export const listOrganismByKeywordDoc: RouteConfig = {
  path: PATH_LIST_ORGANISMS_BY_KEYWORD,
  method: "get",
  summary: "List organisms by keyword",
  description: "List organisms with the given keyword",
  tags: [tags.list],
  request: {
    params: listOrganismByKeywordParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listOrganismByKeywordResponseSchema,
        },
      },
    },
  },
};
