import { useQuery } from "@tanstack/react-query";
import { nullListResponse } from "%api/ListApi";
import {
  ListOrganismsByPhenotypesParams,
  ListOrganismsByPhenotypesResponse,
  listOrganismsByPhenotypesURL,
} from "%api/listOrganismsByPhenotypes/definitions";
import { getData } from "%core/network/getData";
import { useOrganismPaginationState } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/organismPagination";
import { usePhenotypeQueryState } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/phenotypeQuery";

const SHOW_COUNT = 10;
export const useOrganismQuery = () => {
  const page = useOrganismPaginationState();
  const phenotypeQueryParams = usePhenotypeQueryState();
  return useQuery({
    queryKey: [phenotypeQueryParams, { page }],
    queryFn: async () => {
      if (Object.entries(phenotypeQueryParams).length === 0) return nullListResponse;
      //
      const response = await getData<
        ListOrganismsByPhenotypesResponse,
        ListOrganismsByPhenotypesParams
      >(listOrganismsByPhenotypesURL, {
        ...phenotypeQueryParams,
        limit: SHOW_COUNT,
        offset: (page - 1) * SHOW_COUNT,
      });
      if (!response.body) throw new Error("No data");
      return response.body;
    },
    staleTime: Infinity,
    placeholderData: (previousData) => previousData,
  });
};
