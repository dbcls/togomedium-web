import { makeApiUrl } from "%core/network/makeApiUrl";
import { z } from "zod";

const taxonSchema = z.object({
  id: z.string(),
  label: z.string(),
});

const lineageSchema = z.object({
  superkingdom: taxonSchema.nullable(),
  phylum: taxonSchema.nullable(),
  class: taxonSchema.nullable(),
  order: taxonSchema.nullable(),
  family: taxonSchema.nullable(),
  genus: taxonSchema.nullable(),
  species: taxonSchema.nullable(),
  strain: taxonSchema.nullable(),
});

const mediaStrainsAlignmentItemSchema = z.object({
  gm_id: z.string(),
  label: z.string(),
  organisms: z.array(lineageSchema),
});

const mediaStrainsAlignmentResponseSchema = z.array(mediaStrainsAlignmentItemSchema);

const mediaStrainsAlignmentParamsSchema = z.object({
  gm_ids: z.string(),
});

export type MediaStrainsAlignmentResponse = z.infer<typeof mediaStrainsAlignmentResponseSchema>;
export type MediaStrainsAlignmentParams = z.infer<typeof mediaStrainsAlignmentParamsSchema>;
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

export type Taxon = z.infer<typeof taxonSchema>;
export type Lineage = z.infer<typeof lineageSchema>;
export type Medium = MediaStrainsAlignmentResponse[0];
