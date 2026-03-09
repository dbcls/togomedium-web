import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const statsCountMediaByCultivableStrainCountResponseSchema = z.object({
  num_cultivatable_strains: z.number().int(),
  num_media: z.number().int(),
});
const statsCountMediaByCultivableStrainCountParamsSchema = z.object({
  threshold: z.number().int().optional(),
});

export type StatsCountMediaByCultivableStrainCountResponse = z.infer<
  typeof statsCountMediaByCultivableStrainCountResponseSchema
>;
export type StatsCountMediaByCultivableStrainCountParams = z.infer<
  typeof statsCountMediaByCultivableStrainCountParamsSchema
>;

export const statsCountMediaByCultivableStrainCountUrl = makeApiUrl(
  "gmdb_stat_count_media_by_cultivable_strain_count",
);
export const PATH_STATS_COUNT_MEDIA_BY_CULTIVABLE_STRAIN_COUNT =
  "/gmdb_stat_count_media_by_cultivable_strain_count";

export const statsCountMediaByCultivableStrainCountDoc: RouteConfig = {
  path: PATH_STATS_COUNT_MEDIA_BY_CULTIVABLE_STRAIN_COUNT,
  method: "get",
  summary: "Stats count media by cultivable strain count",
  description: "",
  tags: [],
  request: {
    params: statsCountMediaByCultivableStrainCountParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: statsCountMediaByCultivableStrainCountResponseSchema,
        },
      },
    },
  },
};
