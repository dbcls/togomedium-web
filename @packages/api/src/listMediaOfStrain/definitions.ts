import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const PATH_LIST_MEDIA_OF_STRAIN = "/gmdb_media_by_strainid";

const listMediaOfStrainResponseSchema = createListApiResponseSchema(
  z.object({
    media_id: listApiLinkSchema,
    name: z.string(),
    original_media_id: z.string(),
  }),
);
export type ListMediaOfStrainResponse = z.infer<typeof listMediaOfStrainResponseSchema>;

const listMediaOfStrainParamsSchema = createListApiParamsSchema({
  strain_id: z.string(),
});
export type ListMediaOfStrainParams = z.infer<typeof listMediaOfStrainParamsSchema>;

export const listMediaOfStrainDoc: RouteConfig = {
  path: PATH_LIST_MEDIA_OF_STRAIN,
  method: "get",
  summary: "List media of strain",
  description: "Search for media associated with a strain and return a list",
  tags: [tags.list],
  request: {
    params: listMediaOfStrainParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listMediaOfStrainResponseSchema,
        },
      },
    },
  },
};
