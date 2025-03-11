import { makeApiUrl } from "%core/network/makeApiUrl";

export type TaxonAncestorsResponse = { tax_id: string; name: string; rank: string }[];

export type TaxonAncestorsParams = {
  tax_id: string;
};

export const taxonAncestorsURL = makeApiUrl("gmdb_taxonomy_ancestors");
export const gtdbTaxonAncestorsURL = makeApiUrl("gmdb_taxonomy_gtdb_ancestors");
