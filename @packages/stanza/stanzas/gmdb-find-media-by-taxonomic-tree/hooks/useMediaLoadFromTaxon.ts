import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { nullListResponse } from "%api/ListApi";
import {
  ListMediaOfTaxonsParams,
  ListMediaOfTaxonsResponse,
  listMediaOfTaxonsURL,
} from "%api/listMediaOfTaxons/definitions";
import { getData } from "%core/network/getData";
import { useSelectedTaxonState } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/selectedTaxon";
import { useFoundMediaMutators } from "%stanza/state/media-finder/foundMedia";
import { useIsMediaLoadingMutators } from "%stanza/state/media-finder/isMediaLoading";
import {
  useMediaPaginationMutators,
  useMediaPaginationState,
} from "%stanza/state/media-finder/mediaPagination";
import { useQueryDataMutators } from "%stanza/state/media-finder/queryData";

const SHOW_COUNT = 10;
export const useMediaLoadFromTaxon = () => {
  const page = useMediaPaginationState();
  const selectedTaxon = useSelectedTaxonState();
  const { setQueryData } = useQueryDataMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  const { setIsMediaLoading } = useIsMediaLoadingMutators();
  const { reset } = useMediaPaginationMutators();
  const query = useQuery({
    queryKey: ["media_of_taxon", selectedTaxon.sort(), { page }],
    queryFn: async () => {
      const tax_ids = selectedTaxon.sort().join(",");
      if (tax_ids.length === 0) return nullListResponse;
      //
      const response = await getData<ListMediaOfTaxonsResponse, ListMediaOfTaxonsParams>(
        listMediaOfTaxonsURL,
        {
          tax_ids,
          limit: SHOW_COUNT,
          offset: (page - 1) * SHOW_COUNT,
        }
      );
      if (!response.body) throw new Error("No data");
      return response.body;
    },
    staleTime: Infinity,
    placeholderData: (previousData) => previousData,
  });
  useEffect(() => {
    setQueryData({ tax_ids: selectedTaxon });
  }, [selectedTaxon]);
  useEffect(() => {
    query.data && setFoundMedia(query.data);
  }, [query.data, setFoundMedia]);
  useEffect(() => {
    setIsMediaLoading(query.isLoading || query.isPlaceholderData);
  }, [query.isLoading, query.isPlaceholderData, setIsMediaLoading]);
  useEffect(() => {
    reset();
  }, [selectedTaxon, reset]);
};
