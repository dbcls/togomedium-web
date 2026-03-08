import { makeApiUrl } from "%core/network/makeApiUrl";
import { z } from "zod";
export const componentDetailURL = makeApiUrl("gmdb_component_by_gmoid");

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

export type ComponentDetailResponse = z.infer<
  typeof componentDetailResponseSchema
>;
export type ComponentDetailParams = z.infer<typeof componentDetailParamsSchema>;
