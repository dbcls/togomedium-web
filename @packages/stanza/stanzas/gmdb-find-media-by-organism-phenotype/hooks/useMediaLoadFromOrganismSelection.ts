import { nullListResponse } from "%api/ListApi";
import {
  ListMediaOfTaxonsParams,
  ListMediaOfTaxonsResponse,
  PATH_LIST_MEDIA_OF_TAXONS,
} from "%api/listMediaOfTaxons/definitions";
import { getData } from "%core/network/getData";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { useSelectedOrganismsState } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/selectedOrganisms";
import { useFoundMediaMutators } from "%stanza/state/media-finder/foundMedia";
import { useIsMediaLoadingMutators } from "%stanza/state/media-finder/isMediaLoading";
import {
  useMediaPaginationMutators,
  useMediaPaginationState,
} from "%stanza/state/media-finder/mediaPagination";
import { useQueryDataMutators } from "%stanza/state/media-finder/queryData";
import { extractLabelIds } from "%stanza/utils/labelInfo";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const SHOW_COUNT = 10;
const apiUrl = makeApiUrl(PATH_LIST_MEDIA_OF_TAXONS);

export const useMediaLoadFromOrganismSelection = () => {
  const page = useMediaPaginationState();
  const selectedOrganisms = useSelectedOrganismsState();
  const { setQueryData } = useQueryDataMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  const { setIsMediaLoading } = useIsMediaLoadingMutators();
  const { reset } = useMediaPaginationMutators();
  const query = useQuery({
    queryKey: [selectedOrganisms, { page }],
    queryFn: async () => {
      if (selectedOrganisms.length === 0) return nullListResponse;
      //
      const tax_ids = extractLabelIds(selectedOrganisms).join(",");
      const response = await getData<ListMediaOfTaxonsResponse, ListMediaOfTaxonsParams>(apiUrl, {
        tax_ids,
        limit: SHOW_COUNT,
        offset: (page - 1) * SHOW_COUNT,
      });
      if (!response.body) throw new Error("No data");
      return response.body;
    },
    staleTime: Infinity,
    placeholderData: (previousData) => previousData,
  });
  useEffect(() => {
    setQueryData({ tax_ids: extractLabelIds(selectedOrganisms) });
  }, [selectedOrganisms]);
  useEffect(() => {
    query.data && setFoundMedia(query.data);
  }, [query.data]);
  useEffect(() => {
    setIsMediaLoading(query.isLoading || query.isPlaceholderData);
  }, [query.isLoading, query.isPlaceholderData]);
  useEffect(() => {
    reset();
  }, [selectedOrganisms]);
};
