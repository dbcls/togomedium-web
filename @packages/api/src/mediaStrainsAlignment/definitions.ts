import { makeApiUrl } from "%core/network/makeApiUrl";

export type MediaStrainsAlignmentResponse = {
  gm_id: string;
  label: string;
  organisms: Lineage[];
}[];
export type MediaStrainsAlignmentParams = {
  gm_ids: string;
};
export const mediaStrainsAlignmentURL = makeApiUrl("gmdb_media_strains_alignment_by_gm_ids");

export const lineageRanks = [
  "superkingdom",
  "phylum",
  "class",
  "order",
  "family",
  "genus",
  "species",
  "strain",
] as const;
export type LineageRank = (typeof lineageRanks)[number];

export type Taxon = {
  id: string;
  label: string;
};
export type Lineage = Record<LineageRank, Taxon | null>;
export type Medium = MediaStrainsAlignmentResponse[0];
