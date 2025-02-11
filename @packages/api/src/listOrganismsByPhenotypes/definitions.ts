import { ListApiParams, ListApiResponse } from "%api/ListApi";
import { makeApiUrl } from "%core/network/makeApiUrl";

export type ListOrganismsByPhenotypesResponse = ListApiResponse<{
  tax_id: string;
  name: string;
}>;
export type ListOrganismsByPhenotypesParams = ListApiParams<{
  growth_temp?: string;
  growth_ph?: string;
  growth_salinity?: string;
  MPO_10002?: string;
  MPO_07001?: string;
  MPO_02000?: string;
  MPO_01001?: string;
  MPO_03006?: string;
  MPO_04053?: string;
}>;

export const listOrganismsByPhenotypesURL = makeApiUrl("gmdb_organisms_by_phenotypes");
