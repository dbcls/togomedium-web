import { makeApiUrl } from "%core/network/makeApiUrl";
import { z } from "zod";

const strainDetailOtherStrainSchema = z.object({
  other_strain_id: z.string(),
  other_strain_link: z.string(),
});

const strainDetailStrainSchema = z.object({
  strain_id: z.string(),
  strain_name: z.string(),
  other_strain_id_list: z.array(strainDetailOtherStrainSchema),
});

const strainDetailLineageItemSchema = z.object({
  uri: z.string(),
  taxid: z.number(),
  label: z.string(),
  rank: z.string(),
});

const strainDetailTaxonomySchema = z.object({
  scientific_name: z.string(),
  taxid: z.number(),
  rank: z.string(),
  authority_name: z.string(),
  lineage: z.array(strainDetailLineageItemSchema),
});

const strainDetailResponseSchema = z.object({
  strain: strainDetailStrainSchema,
  taxonomy: strainDetailTaxonomySchema,
});

const strainDetailParamsSchema = z.object({
  strain_id: z.string(),
});

export type StrainDetailResponse = z.infer<typeof strainDetailResponseSchema>;
export type StrainDetailParams = z.infer<typeof strainDetailParamsSchema>;
export const strainDetailURL = makeApiUrl("gmdb_strain_by_strainid");
