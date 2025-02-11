import { makeApiUrl } from "%core/network/makeApiUrl";

export type TaxonomyChildrenResponse = { tax_id: string; name: string; rank: string }[];

export type TaxonomyChildrenParams = {
  tax_id: string;
};

export const taxonomyChildrenURL = makeApiUrl("gmdb_taxonomy_children");
