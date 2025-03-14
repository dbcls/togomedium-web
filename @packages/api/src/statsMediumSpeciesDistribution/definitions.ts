import { makeApiUrl } from "%core/network/makeApiUrl";

export type StatsMediumSpeciesDistributionResponse = {
  bin: string;
  frequency: number;
}[];
export type StatsMediumSpeciesDistributionParams = {};

export const statsMediumSpeciesDistributionURL = makeApiUrl("gmdb_stat_media_tax_histgram");
