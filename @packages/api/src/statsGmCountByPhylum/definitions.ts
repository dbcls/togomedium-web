import { makeApiUrl } from "%core/network/makeApiUrl";
import { RouteConfig } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

const statsGmCountByPhylumItemSchema = z.object({
  phylum: z.string(),
  gms: z.string(),
});

const statsGmCountByPhylumResponseSchema = z.object({
  contents: z.array(statsGmCountByPhylumItemSchema),
  total: z.number(),
  offset: z.number(),
  limit: z.number(),
  columns: z.array(
    z.object({
      key: z.string(),
      label: z.string(),
    }),
  ),
});

const statsGmCountByPhylumParamsSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
});

export type StatsGmCountByPhylumResponse = z.infer<typeof statsGmCountByPhylumResponseSchema>;
export type StatsGmCountByPhylumParams = z.infer<typeof statsGmCountByPhylumParamsSchema>;

/**
 * @deprecated
 */
export const statsGmCountByPhylum = makeApiUrl("gmdb_stat_phylum_gm");
export const PATH_STATS_GM_COUNT_BY_PHYLUM = "gmdb_stat_phylum_gm";

export const statsGmCountByPhylumDoc: RouteConfig = {
  path: PATH_STATS_GM_COUNT_BY_PHYLUM,
  method: "get",
  summary: PATH_STATS_GM_COUNT_BY_PHYLUM,
  description: "Statistics number of growth media by phylum",
  tags: [],
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
