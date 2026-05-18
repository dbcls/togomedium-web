import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const listComponentsUrl = makeApiUrl("list_components");
export const PATH_LIST_COMPONENTS = "/list_components";

const listComponentsResponseSchema = createListApiResponseSchema(
  z.object({
    gmo_id: listApiLinkSchema,
    name: z.string(),
  }),
);
export type ListComponentsResponse = z.infer<typeof listComponentsResponseSchema>;

const listComponentsParamsSchema = createListApiParamsSchema({});
export type ListComponentsParams = z.infer<typeof listComponentsParamsSchema>;

export const listComponentsDoc: RouteConfig = {
  path: PATH_LIST_COMPONENTS,
  method: "get",
  summary: "List components",
  description: "List all components",
  tags: [tags.list],
  request: {
    params: listComponentsParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listComponentsResponseSchema,
        },
      },
    },
  },
};
