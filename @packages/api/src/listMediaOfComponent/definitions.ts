import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
} from "%api/ListApi";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const PATH_LIST_MEDIA_OF_COMPONENT = "/gmdb_media_by_gmoid";

const listMediaOfComponentResponseSchema = createListApiResponseSchema(
  z.object({
    // NOTE: TypeSpec defines `media_id: string` but documents it as a link object.
    media_id: listApiLinkSchema,
    original_media_id: z.string(),
    media_name: z.string(),
  }),
);
export type ListMediaOfComponentResponse = z.infer<typeof listMediaOfComponentResponseSchema>;

const listMediaOfComponentParamsSchema = createListApiParamsSchema({
  gmo_id: z.string(),
});
export type ListMediaOfComponentParams = z.infer<typeof listMediaOfComponentParamsSchema>;

export const listMediaOfComponentDoc: RouteConfig = {
  path: PATH_LIST_MEDIA_OF_COMPONENT,
  method: "get",
  summary: "List media of component",
  description: "Get growth media by a component's GMO ID",
  tags: [tags.list],
  request: {
    params: listMediaOfComponentParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listMediaOfComponentResponseSchema,
        },
      },
    },
  },
};
