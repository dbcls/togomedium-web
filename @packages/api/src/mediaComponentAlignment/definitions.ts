import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const mediaComponentAlignmentMediaSchema = z.object({
  gm_id: z.string(),
  original_media_id: z.string(),
  name: z.string(),
  components: z.array(z.string()),
  organisms: z.array(z.string()),
});

const mediaComponentAlignmentOrganismSchema = z.object({
  tax_id: z.string(),
  name: z.string(),
});

const mediaComponentAlignmentComponentSchema = z.object({
  gmo_id: z.string(),
  name: z.string(),
  parent: z.string().nullable(),
  function: z.string().nullable(),
});

const mediaComponentAlignmentTableResponseSchema = z.object({
  media: z.array(mediaComponentAlignmentMediaSchema),
  organisms: z.array(mediaComponentAlignmentOrganismSchema),
  components: z.array(mediaComponentAlignmentComponentSchema),
});

const mediaComponentAlignmentTableParamsSchema = z.object({
  gm_ids: z.string(),
});

export type MediaComponentAlignmentTableResponse = z.infer<
  typeof mediaComponentAlignmentTableResponseSchema
>;
export type MediaComponentAlignmentTableParams = z.infer<
  typeof mediaComponentAlignmentTableParamsSchema
>;
/**
 * @deprecated
 */
export const mediaComponentAlignmentTableURL = makeApiUrl("gmdb_media_alignment_by_gm_ids");
export const PATH_MEDIA_COMPONENT_ALIGNMENT_TABLE = "gmdb_media_alignment_by_gm_ids";

export const mediaComponentAlignmentTableDoc: RouteConfig = {
  path: PATH_MEDIA_COMPONENT_ALIGNMENT_TABLE,
  method: "get",
  summary: PATH_MEDIA_COMPONENT_ALIGNMENT_TABLE,
  description: "Get media-component alignment table by GM IDs",
  tags: [],
  request: {
    params: mediaComponentAlignmentTableParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: mediaComponentAlignmentTableResponseSchema,
        },
      },
    },
  },
};
