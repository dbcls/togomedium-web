import { makeApiUrl } from "%core/network/makeApiUrl";

export type TaxonomySearchByNameResponse = { tax_id: string; name: string; rank: string }[];
export type TaxonomySearchByNameParams = {
  /**
   * @minLength 4
   */
  q: string;
  max: number;
};
export const taxonomySearchByNameURL = makeApiUrl("gmdb_taxonomy_search_by_name");
