import { z } from "zod";

// Adopted locally; not registered in the public OpenAPI document until publication.
const gmoIdSchema = z.string().regex(/^GMO_[0-9]{6}$/);
const nonnegativeIntegerStringSchema = z
  .string()
  .regex(/^(?:0|[1-9][0-9]*)$/)
  .refine(
    (value) => Number.isSafeInteger(Number(value)) && String(Number(value)) === value,
    "Expected a nonnegative safe integer string",
  );
const optionalGmoIdSchema = z.union([gmoIdSchema, z.literal("")]).default("");

export const listComponents2ParamsSchema = z.strictObject({
  role_id: optionalGmoIdSchema,
  property_id: optionalGmoIdSchema,
  sort: z.enum(["name", "id", "medium_count"]).default("name"),
  order: z.enum(["asc", "desc"]).default("asc"),
  limit: nonnegativeIntegerStringSchema.default("20"),
  offset: nonnegativeIntegerStringSchema.default("0"),
});

export const listComponents2ResponseSchema = z.strictObject({
  contents: z.array(
    z.strictObject({
      id: gmoIdSchema,
      name: z.string(),
      medium_count: z.number().int().nonnegative(),
      properties: z.array(z.strictObject({ gmo_id: gmoIdSchema, label_en: z.string() })),
      roles: z.array(
        z.strictObject({
          gmo_id: gmoIdSchema,
          label_en: z.string(),
          parent: gmoIdSchema.nullable(),
        }),
      ),
    }),
  ),
  total: nonnegativeIntegerStringSchema,
  limit: nonnegativeIntegerStringSchema,
  offset: nonnegativeIntegerStringSchema,
});

export type ListComponents2Params = z.infer<typeof listComponents2ParamsSchema>;
export type ListComponents2Response = z.infer<typeof listComponents2ResponseSchema>;
