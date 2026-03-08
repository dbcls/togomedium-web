import { makeApiUrl } from "%core/network/makeApiUrl";
import { z } from "zod";

const lineageItemSchema = z.object({
  uri: z.string(),
  taxid: z.number(),
  label: z.string(),
  rank: z.string(),
});

const lineageSchema = z.array(lineageItemSchema);

const taxonDetailTypeMaterialSchema = z.object({
  label: z.string(),
  name: z.string().optional(),
});

const taxonDetailOtherTypeMaterialSchema = z.object({
  label: z.string(),
  name: z.string(),
});

const taxonDetailResponseSchema = z.object({
  scientific_name: z.string(),
  taxid: z.union([z.number(), z.string()]),
  rank: z.string(),
  authority_name: z.string(),
  lineage: lineageSchema,
  type_material: z.array(taxonDetailTypeMaterialSchema),
  other_type_material: z.array(taxonDetailOtherTypeMaterialSchema),
});

const taxonDetailParamsSchema = z.object({
  tax_id: z.string(),
});

export type TaxonDetailResponse = z.infer<typeof taxonDetailResponseSchema>;
export type TaxonDetailParams = z.infer<typeof taxonDetailParamsSchema>;
export const taxonDetailURL = makeApiUrl("gmdb_organism_by_taxid");
