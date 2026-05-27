import { tags } from "%api/consts";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const deprecatedAllComponentsResponseSchema = z.object({
  items: z.array(
    z.object({
      gmo_id: z.string(),
      name: z.string(),
    }),
  ),
});
const deprecatedAllComponentsParamsSchema = z.object({});

export type DeprecatedAllComponentsResponse = z.infer<typeof deprecatedAllComponentsResponseSchema>;
export type DeprecatedAllComponentsParams = z.infer<typeof deprecatedAllComponentsParamsSchema>;

export const PATH_DEPRECATED_ALL_COMPONENTS = "/gmdb_all_components";

export const deprecatedAllComponentsDoc: RouteConfig = {
  path: PATH_DEPRECATED_ALL_COMPONENTS,
  method: "get",
  summary: "Deprecated all components",
  description:
    "Deprecated, in favor of `components_with_components`. This endpoint returns a list of all components in the GMDB.",
  tags: [tags.deprecated],
  request: {
    params: deprecatedAllComponentsParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: deprecatedAllComponentsResponseSchema,
        },
      },
    },
  },
};
