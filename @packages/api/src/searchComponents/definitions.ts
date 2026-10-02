import type { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

export const PATH_SEARCH_COMPONENTS = "/gmdb_search_components";

const gmoIdSchema = z.string().regex(/^GMO_[0-9]{6}$/);
const nonnegativeIntegerStringSchema = z
  .string()
  .regex(/^(?:0|[1-9][0-9]*)$/)
  .refine((value) => Number.isSafeInteger(Number(value)), "Expected a safe integer string");
const countSchema = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
const classificationSchema = z.strictObject({ gmo_id: gmoIdSchema, label_en: z.string() });
const roleSchema = classificationSchema.extend({ parent: gmoIdSchema.nullable() });

export const searchComponentsParamsSchema = z.strictObject({
  name: z.string().default(""),
  role_id: z.union([gmoIdSchema, z.literal("")]).default(""),
  property_id: z.union([gmoIdSchema, z.literal("")]).default(""),
  sort: z.enum(["name", "id", "medium_count"]).default("medium_count"),
  order: z.enum(["asc", "desc"]).default("desc"),
  limit: nonnegativeIntegerStringSchema.default("20"),
  offset: nonnegativeIntegerStringSchema.default("0"),
});

export const searchComponentsResponseSchema = z.strictObject({
  contents: z.array(
    z.strictObject({
      id: gmoIdSchema,
      name: z.string(),
      aliases: z.array(z.string()),
      matched_names: z.array(z.string()),
      medium_count: countSchema,
      properties: z.array(classificationSchema),
      roles: z.array(roleSchema),
    }),
  ),
  total: nonnegativeIntegerStringSchema,
  limit: nonnegativeIntegerStringSchema,
  offset: nonnegativeIntegerStringSchema,
  facets: z.strictObject({
    roles: z.array(roleSchema.extend({ count: countSchema })),
    properties: z.array(classificationSchema.extend({ count: countSchema })),
  }),
});

export type SearchComponentsParams = z.infer<typeof searchComponentsParamsSchema>;
export type SearchComponentsResponse = z.infer<typeof searchComponentsResponseSchema>;

// Prepared contract only; register in openAPI.ts after publication is verified.
export const searchComponentsDoc: RouteConfig = {
  path: PATH_SEARCH_COMPONENTS,
  method: "get",
  summary: "Search components",
  description:
    "Search preferred and alternative names (case-insensitive substring), intersect with an inclusive Role and a directly assigned Property, and return paginated components with disjunctive facet counts. Role counts apply name and Property; Property counts apply name and inclusive Role. Counts do not depend on pagination or sort. medium_count counts distinct media with direct recipe entries.",
  tags: ["Components"],
  request: { query: searchComponentsParamsSchema },
  responses: {
    200: {
      description: "Matching components and all filter options with conditional counts",
      content: { "application/json": { schema: searchComponentsResponseSchema } },
    },
  },
};
