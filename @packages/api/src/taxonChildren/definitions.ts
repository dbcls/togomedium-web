import { makeApiUrl } from "%core/network/makeApiUrl";
import { z } from "zod";

const taxonChildrenItemSchema = z.object({
  tax_id: z.string(),
  name: z.string(),
  rank: z.string(),
});

const taxonChildrenResponseSchema = z.array(taxonChildrenItemSchema);

const taxonChildrenParamsSchema = z.object({
  tax_id: z.string(),
});

export type TaxonChildrenResponse = z.infer<typeof taxonChildrenResponseSchema>;
export type TaxonChildrenParams = z.infer<typeof taxonChildrenParamsSchema>;

export const taxonChildrenURL = makeApiUrl("gmdb_taxonomy_children");
export const gtdbTaxonChildrenURL = makeApiUrl("gmdb_taxonomy_gtdb_children");
