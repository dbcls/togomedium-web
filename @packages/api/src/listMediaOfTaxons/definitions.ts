import { ListApiParams, ListApiResponse } from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";

export type ListMediaOfTaxonsResponse = ListApiResponse<{
  gm_id: string;
  name: string;
}>;

export type ListMediaOfTaxonsParams = ListApiParams<{
  /**
   * comma-separated list of taxon ids
   */
  tax_ids: string;
}>;

export const listMediaOfTaxonsURL = makeApiUrl("gmdb_media_by_taxon");
export const listMediaOfGtdbTaxonsURL = makeApiUrl("gmdb_media_by_gtdb_taxon");
