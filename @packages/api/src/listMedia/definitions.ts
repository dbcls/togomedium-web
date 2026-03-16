import { tags } from "%api/consts";
import {
  createListApiParamsSchema,
  createListApiResponseSchema,
  listApiLinkSchema,
  ListApiLink,
  ListApiParams,
  ListApiResponse,
} from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export type ListMediaResponse = ListApiResponse<{
  media_id: ListApiLink;
  original_media_id: string;
  label: string;
}>;
export type ListMediaParams = ListApiParams<unknown>;
export const listMediaURL = makeApiUrl("list_media");
export const PATH_LIST_MEDIA = "/list_media";

const listMediaResponseSchema = createListApiResponseSchema(
  z.object({
    media_id: listApiLinkSchema,
    original_media_id: z.string(),
    // NOTE: TypeSpec uses `media_name`; this API currently returns `label` per TS usage.
    label: z.string(),
  }),
);

const listMediaParamsSchema = createListApiParamsSchema({});

export const listMediaDoc: RouteConfig = {
  path: PATH_LIST_MEDIA,
  method: "get",
  summary: "List media",
  description: "List all growth media",
  tags: [tags.list],
  request: {
    params: listMediaParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: listMediaResponseSchema,
        },
      },
    },
  },
};
