import { ListApiParams, ListApiResponse } from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";

export type ListMediaOfTaxonResponse = ListApiResponse<{
  gm_id: string;
  name: string;
}>;

export type ListMediaOfTaxonParams = ListApiParams<{
  /**
   * comma-separated list of taxon ids
   */
  tax_id: string;
}>;

export const listMediaOfTaxonURL = makeApiUrl("gmdb_media_by_taxid");
