import { tags } from "%api/consts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const metaSchema = z.object({
  gm: z.string(),
  name: z.string(),
  src_url: z.string(),
  ph: z.string(),
  original_media_id: z.string().optional(),
});

const recipeItemSchema = z.object({
  paragraph_index: z.number(),
});

const componentSchema = z.object({
  component_name: z.string(),
  volume: z.number().optional(),
  unit: z.string().optional(),
  gmo: z.string().optional(),
  gmo_id: z.string().optional(),
  label: z.string().optional(),
  conc_value: z.number().optional(),
  conc_unit: z.string().optional(),
  reference_media_id: z.string().optional(),
});

const componentTableSchema = recipeItemSchema.and(
  z.object({
    subcomponent_name: z.string(),
    items: z.array(componentSchema),
  }),
);

const componentCommentSchema = recipeItemSchema.and(
  z.object({
    comment: z.string(),
  }),
);

const mediumDetailResponseSchema = z.object({
  meta: metaSchema,
  components: z.array(componentTableSchema),
  comments: z.array(componentCommentSchema),
});

const mediumDetailParamsSchema = z.object({
  gm_id: z.string(),
});

export type MediumDetailResponse = z.infer<typeof mediumDetailResponseSchema>;
export type MediumDetailParams = z.infer<typeof mediumDetailParamsSchema>;
/**
 * @deprecated
 */
export const mediumDetailURL = makeApiUrl("gmdb_medium_by_gmid");
export const PATH_MEDIUM_DETAIL = "gmdb_medium_by_gmid";

export const mediumDetailDoc: RouteConfig = {
  path: PATH_MEDIUM_DETAIL,
  method: "get",
  summary: PATH_MEDIUM_DETAIL,
  description: "Get medium detail by GM ID",
  tags: [tags.stanza],
  request: {
    params: mediumDetailParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: mediumDetailResponseSchema,
        },
      },
    },
  },
};
