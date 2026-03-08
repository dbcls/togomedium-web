import { makeApiUrl } from "%core/network/makeApiUrl";
import { z } from "zod";

const componentWithComponentsItemSchema = z.object({
  gmo_id: z.string(),
  name: z.string(),
  japanese_name: z.string(),
});

const componentsWithComponentsResponseSchema = z.array(
  componentWithComponentsItemSchema,
);

const componentWithComponentsParamsSchema = z.object({
  gmo_ids: z.string().optional(),
});

export type ComponentWithComponentsParams = z.infer<
  typeof componentWithComponentsParamsSchema
>;
export type ComponentsWithComponentsResponse = z.infer<
  typeof componentsWithComponentsResponseSchema
>;
export const componentsWithComponentsURL = makeApiUrl("gmdb_components_with_components");
