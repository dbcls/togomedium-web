import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const PATH_LIST_STRAINS = "/list_strains";

const listStrainsResponseSchema = createListApiResponseSchema(
  z.object({
    strain_id: listApiLinkSchema,
    name: z.string(),
    other_ids: z.string(),
    taxonomy: listApiLinkSchema,
  }),
);
export type ListStrainsResponse = z.infer<typeof listStrainsResponseSchema>;

const listStrainsParamsSchema = createListApiParamsSchema({});
export type ListStrainsParams = z.infer<typeof listStrainsParamsSchema>;

export const listStrainsDoc: RouteConfig = {
  path: PATH_LIST_STRAINS,
  method: "get",
  summary: "List strains",
  description: "List all strains",
  tags: [tags.list],
  request: {
    params: listStrainsParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listStrainsResponseSchema,
        },
      },
    },
  },
};
