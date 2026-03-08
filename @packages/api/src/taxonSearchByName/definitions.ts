import { makeApiUrl } from "%core/network/makeApiUrl";
import { z } from "zod";

const taxonSearchByNameItemSchema = z.object({
  tax_id: z.string(),
  name: z.string(),
  rank: z.string(),
});

const taxonSearchByNameResponseSchema = z.array(taxonSearchByNameItemSchema);

const taxonSearchByNameParamsSchema = z.object({
  q: z.string().min(4),
  max: z.number(),
});

export type TaxonSearchByNameResponse = z.infer<typeof taxonSearchByNameResponseSchema>;
export type TaxonSearchByNameParams = z.infer<typeof taxonSearchByNameParamsSchema>;
export const taxonSearchByNameURL = makeApiUrl("gmdb_taxonomy_search_by_name");
export const gtdbTaxonSearchByNameUrl = makeApiUrl("gmdb_taxonomy_gtdb_search_by_name");
