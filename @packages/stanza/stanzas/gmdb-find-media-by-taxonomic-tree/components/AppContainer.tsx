import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import { MediaByTaxonParams, MediaByTaxonResponse } from "%stanza/api/media_by_taxon/types";
import { API_MEDIA_BY_TAXON } from "%stanza/api/paths";
import { MediaPane } from "%stanza/components/media-finder/MediaPane";
import { AppWrapper } from "%stanza/components/styled/AppWrapper";
import { QueryPane } from "%stanza/components/styled/QueryPane";
import { SubPane } from "%stanza/components/styled/SubPane";
import { TaxonomicTreeSection } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TaxonomicTreeSection";
import { useSelectedTaxonState } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/selectedTaxon";
import { useFoundMediaMutators } from "%stanza/state/media-finder/foundMedia";
import { useIsMediaLoadingMutators } from "%stanza/state/media-finder/isMediaLoading";
import {
  useMediaPaginationMutators,
  useMediaPaginationState,
} from "%stanza/state/media-finder/mediaPagination";
import { useQueryDataMutators } from "%stanza/state/media-finder/queryData";
import { getData } from "%stanza/utils/getData";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

export const AppContainer: FC<Props> = ({ dispatchEvent }) => {
  useMediaLoadFromTaxon();
  return (
    <AppWrapper>
      <QueryPane>
        <TaxonomicTreeSection />
      </QueryPane>
      <SubPane>
        <MediaPane dispatchEvent={dispatchEvent} />
      </SubPane>
    </AppWrapper>
  );
};
const SHOW_COUNT = 10;
const useMediaLoadFromTaxon = () => {
  const page = useMediaPaginationState();
  const selectedTaxon = useSelectedTaxonState();
  const { setQueryData } = useQueryDataMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  const { setIsMediaLoading } = useIsMediaLoadingMutators();
  const { reset } = useMediaPaginationMutators();
  const nullResponse = { total: 0, contents: [], offset: 0, limit: 0 };
  const query = useQuery({
    queryKey: [selectedTaxon, { page }],
    queryFn: async () => {
      const tax_ids = selectedTaxon;
      if (tax_ids.length === 0) return nullResponse;
      //
      const response = await getData<MediaByTaxonResponse, MediaByTaxonParams>(API_MEDIA_BY_TAXON, {
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
