import { tags } from "%api/consts";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

/**
 * @deprecated
 */
export const componentDetailURL = makeApiUrl("gmdb_component_by_gmoid");
export const PATH_COMPONENT_DETAIL = "gmdb_component_by_gtdb_gmoid";

const componentClassSchema = z.object({
  gmo_id: z.string(),
  uri: z.string(),
  label_en: z.string(),
});

export const componentDetailResponseSchema = z.object({
  pref_label: z.string(),
  id: z.string(),
  label_ja: z.string(),
  alt_labels_en: z.array(z.string()),
  alt_labels_ja: z.array(z.string()),
  super_classes: z.array(componentClassSchema),
  sub_classes: z.array(componentClassSchema),
  properties: z.array(componentClassSchema),
  roles: z.array(componentClassSchema),
  links: z.array(z.string()),
});

const componentDetailParamsSchema = z.object({
  gmo_id: z.string(),
});

export type ComponentDetailResponse = z.infer<typeof componentDetailResponseSchema>;
export type ComponentDetailParams = z.infer<typeof componentDetailParamsSchema>;

export const componentDetailDoc: RouteConfig = {
  path: PATH_COMPONENT_DETAIL,
  method: "get",
  summary: PATH_COMPONENT_DETAIL,
  description: "Get component detail by GMDB ID",
  tags: [tags.stanza],
  request: {
    params: componentDetailParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: componentDetailResponseSchema,
        },
      },
    },
  },
};
