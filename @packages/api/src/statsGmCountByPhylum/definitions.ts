import { tags } from "%api/consts";
import { createListApiParamsSchema, createListApiResponseSchema } from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const statsGmCountByPhylumItemSchema = z.object({
  phylum: z.string(),
  gms: z.string(),
});

const statsGmCountByPhylumResponseSchema = createListApiResponseSchema(
  statsGmCountByPhylumItemSchema,
);

const statsGmCountByPhylumParamsSchema = createListApiParamsSchema({});

export type StatsGmCountByPhylumResponse = z.infer<typeof statsGmCountByPhylumResponseSchema>;
export type StatsGmCountByPhylumParams = z.infer<typeof statsGmCountByPhylumParamsSchema>;

/**
 * @deprecated
 */
export const statsGmCountByPhylum = makeApiUrl("gmdb_stat_phylum_gm");
export const PATH_STATS_GM_COUNT_BY_PHYLUM = "/gmdb_stat_phylum_gm";

export const statsGmCountByPhylumDoc: RouteConfig = {
  path: PATH_STATS_GM_COUNT_BY_PHYLUM,
  method: "get",
  summary: "Stats growth media count by phylum",
  description: "Statistics number of growth media by phylum",
  tags: [tags.list, tags.stats],
  request: {
    params: statsGmCountByPhylumParamsSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: statsGmCountByPhylumResponseSchema,
        },
      },
    },
  },
};
