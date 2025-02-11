import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { nullListResponse } from "%api/ListApi";
import {
  ListMediaByAttributesParams,
  ListMediaByAttributesResponse,
  listMediaByAttributesURL,
} from "%api/listMediaByAttributes/definitions";
import { getData } from "%core/network/getData";
import { useSelectedAttributesState } from "%stanza/stanzas/gmdb-find-media-by-components/states/selectedAttributes";
import { useFoundMediaMutators } from "%stanza/state/media-finder/foundMedia";
import { useIsMediaLoadingMutators } from "%stanza/state/media-finder/isMediaLoading";
import {
  useMediaPaginationMutators,
  useMediaPaginationState,
} from "%stanza/state/media-finder/mediaPagination";
import { useQueryDataMutators } from "%stanza/state/media-finder/queryData";

const SHOW_COUNT = 10;
export const useMediaLoadFromComponents = () => {
  const page = useMediaPaginationState();
  const selectedAttributes = useSelectedAttributesState();
  const { setFoundMedia } = useFoundMediaMutators();
  const { setQueryData } = useQueryDataMutators();
  const { setIsMediaLoading } = useIsMediaLoadingMutators();
  const { reset } = useMediaPaginationMutators();
  const query = useQuery({
    queryKey: [selectedAttributes, { page }],
    queryFn: async () => {
      const gmo_ids = selectedAttributes.gmo_ids.join(",");
      if (gmo_ids.length === 0) return nullListResponse;
      //
      const response = await getData<ListMediaByAttributesResponse, ListMediaByAttributesParams>(
        listMediaByAttributesURL,
        {
          gmo_ids,
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
    setQueryData({ gmo_ids: selectedAttributes.gmo_ids });
  }, [selectedAttributes, setQueryData]);
  useEffect(() => {
    query.data ? setFoundMedia(query.data) : "";
  }, [query.data, setFoundMedia]);
  useEffect(() => {
    setIsMediaLoading(query.isLoading || query.isPlaceholderData);
  }, [query.isLoading, query.isPlaceholderData, setIsMediaLoading]);
  useEffect(() => {
    reset();
  }, [reset, selectedAttributes]);
};
