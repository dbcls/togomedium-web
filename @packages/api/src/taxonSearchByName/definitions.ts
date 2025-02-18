import { makeApiUrl } from "%core/network/makeApiUrl";

export type TaxonSearchByNameResponse = { tax_id: string; name: string; rank: string }[];
export type TaxonSearchByNameParams = {
  /**
   * @minLength 4
   */
  q: string;
  max: number;
};
export const taxonSearchByNameURL = makeApiUrl("gmdb_taxonomy_search_by_name");
