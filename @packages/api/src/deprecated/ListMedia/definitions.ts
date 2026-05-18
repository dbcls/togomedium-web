import { tags } from "%api/consts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const deprecatedListMediaResponseSchema = z.unknown();
const deprecatedListMediaParamsSchema = z.object({});

export type DeprecatedListMediaResponse = z.infer<typeof deprecatedListMediaResponseSchema>;
export type DeprecatedListMediaParams = z.infer<typeof deprecatedListMediaParamsSchema>;

/**
 * @deprecated
 */
export const deprecatedListMediaUrl = makeApiUrl("gmdb_list_media");
export const PATH_DEPRECATED_LIST_MEDIA = "/gmdb_list_media";

export const deprecatedListMediaDoc: RouteConfig = {
  path: PATH_DEPRECATED_LIST_MEDIA,
  method: "get",
  summary: "Deprecated list media",
  description: "This endpoint is deprecated. Use `/list_media` instead.",
  tags: [tags.deprecated],
  request: {
    params: deprecatedListMediaParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: deprecatedListMediaResponseSchema,
        },
      },
    },
  },
};
