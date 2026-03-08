import { makeApiUrl } from "%core/network/makeApiUrl";
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

export const statsCountCulturableSpeciesURL = makeApiUrl("gmdb_stat_media_tax_histgram");
