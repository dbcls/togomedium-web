import { z } from "zod";

export const COMPONENT_CLASSIFICATION_NONE = "none";
export const componentClassificationFilterSchema = z
  .union([
    z.string().regex(/^GMO_[0-9]{6}$/),
    z.literal(""),
    z.literal(COMPONENT_CLASSIFICATION_NONE),
  ])
  .default("");
export type ComponentClassificationFilter = z.infer<typeof componentClassificationFilterSchema>;
