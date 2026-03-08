import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const listComponentsByIdsUrl = makeApiUrl("gmdb_list_components_by_gmoids");
export const PATH_LIST_COMPONENTS_BY_IDS = "/gmdb_list_components_by_gmoids";

const listComponentsByIdsResponseSchema = createListApiResponseSchema(
  z.object({
    gmo_id: listApiLinkSchema,
    name: z.string(),
  }),
);
export type ListComponentsByIdsResponse = z.infer<typeof listComponentsByIdsResponseSchema>;

const listComponentsByIdsParamsSchema = createListApiParamsSchema({
  gmo_ids: z.string(),
});
export type ListComponentsByIdsParams = z.infer<typeof listComponentsByIdsParamsSchema>;

export const listComponentsByIdsDoc: RouteConfig = {
  path: PATH_LIST_COMPONENTS_BY_IDS,
  method: "get",
  summary: "List components by GMO IDs",
  description: "List growth media components with the given GMO IDs",
  tags: [tags.list],
  request: {
    params: listComponentsByIdsParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listComponentsByIdsResponseSchema,
        },
      },
    },
  },
};
