import { tags } from "%api/consts";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const componentWithComponentsItemSchema = z.object({
  gmo_id: z.string(),
  name: z.string(),
  japanese_name: z.string(),
});

const componentsWithComponentsResponseSchema = z.array(componentWithComponentsItemSchema);

const componentWithComponentsParamsSchema = z.object({
  gmo_ids: z.string().optional(),
});

export type ComponentWithComponentsParams = z.infer<typeof componentWithComponentsParamsSchema>;
export type ComponentsWithComponentsResponse = z.infer<
  typeof componentsWithComponentsResponseSchema
>;
export const PATH_COMPONENTS_WITH_COMPONENTS = "/gmdb_components_with_components";

export const componentsWithComponentsDoc: RouteConfig = {
  path: PATH_COMPONENTS_WITH_COMPONENTS,
  method: "get",
  summary: PATH_COMPONENTS_WITH_COMPONENTS,
  description: "Get components with components by GMDB IDs",
  tags: [tags.mediaFinder],
  request: {
    params: componentWithComponentsParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: componentsWithComponentsResponseSchema,
        },
      },
    },
  },
};
