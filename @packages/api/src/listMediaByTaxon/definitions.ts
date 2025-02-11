import { ListApiParams, ListApiResponse } from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";

export type ListMediaByTaxonResponse = ListApiResponse<{
  gm_id: string;
  name: string;
}>;

export type ListMediaByTaxonParams = ListApiParams<{
  /**
   * comma-separated list of taxon ids
   */
  tax_ids: string;
}>;

export const listMediaByTaxonURL = makeApiUrl("gmdb_media_by_taxon");
