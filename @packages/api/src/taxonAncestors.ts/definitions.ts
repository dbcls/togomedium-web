import { makeApiUrl } from "%core/network/makeApiUrl";
import { z } from "zod";

const taxonAncestorsItemSchema = z.object({
  tax_id: z.string(),
  name: z.string(),
  rank: z.string(),
});

const taxonAncestorsResponseSchema = z.array(taxonAncestorsItemSchema);

const taxonAncestorsParamsSchema = z.object({
  tax_id: z.string(),
});

export type TaxonAncestorsResponse = z.infer<typeof taxonAncestorsResponseSchema>;
export type TaxonAncestorsParams = z.infer<typeof taxonAncestorsParamsSchema>;

export const taxonAncestorsURL = makeApiUrl("gmdb_taxonomy_ancestors");
export const gtdbTaxonAncestorsURL = makeApiUrl("gmdb_taxonomy_gtdb_ancestors");
