import { makeApiUrl } from "%core/network/makeApiUrl";

export type StatsCountCulturableSpeciesResponse = {
  bin: string;
  frequency: number;
}[];
export type StatsCountCulturableSpeciesParams = {};

export const statsCountCulturableSpeciesURL = makeApiUrl("gmdb_stat_media_tax_histgram");
