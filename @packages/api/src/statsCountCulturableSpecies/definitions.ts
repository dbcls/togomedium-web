import { tags } from "%api/consts";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const statsCountCulturableSpeciesItemSchema = z.object({
  bin: z.string(),
  frequency: z.number(),
});

const statsCountCulturableSpeciesResponseSchema = z.array(statsCountCulturableSpeciesItemSchema);

const statsCountCulturableSpeciesParamsSchema = z.object({});

export type StatsCountCulturableSpeciesResponse = z.infer<
  typeof statsCountCulturableSpeciesResponseSchema
>;
export type StatsCountCulturableSpeciesParams = z.infer<
  typeof statsCountCulturableSpeciesParamsSchema
>;

export const PATH_STATS_COUNT_CULTURABLE_SPECIES = "/gmdb_stat_media_tax_histgram";

export const statsCountCulturableSpeciesDoc: RouteConfig = {
  path: PATH_STATS_COUNT_CULTURABLE_SPECIES,
  method: "get",
  summary: PATH_STATS_COUNT_CULTURABLE_SPECIES,
  description: "Statistics count of culturable species",
  tags: [tags.stats],
  request: {
    params: statsCountCulturableSpeciesParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: statsCountCulturableSpeciesResponseSchema,
        },
      },
    },
  },
};
