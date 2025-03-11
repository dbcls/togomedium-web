import { makeApiUrl } from "%core/network/makeApiUrl";

export type TaxonChildrenResponse = { tax_id: string; name: string; rank: string }[];

export type TaxonChildrenParams = {
  tax_id: string;
};

export const taxonChildrenURL = makeApiUrl("gmdb_taxonomy_children");
export const gtdbTaxonChildrenURL = makeApiUrl("gmdb_taxonomy_gtdb_children");
