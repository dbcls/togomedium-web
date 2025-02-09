import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import { OrganismPane } from "./OrganismPane";
import { PhenotypeSection } from "./PhenotypeSection";
import { MediaByTaxonParams, MediaByTaxonResponse } from "%stanza/api/media_by_taxon/types";
import { API_MEDIA_BY_TAXON } from "%stanza/api/paths";
import { MediaPane } from "%stanza/components/media-finder/MediaPane";
import { AppWrapper } from "%stanza/components/styled/AppWrapper";
import { QueryPane } from "%stanza/components/styled/QueryPane";
import { SubPane } from "%stanza/components/styled/SubPane";
import { useSelectedOrganismsState } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/selectedOrganisms";
import { useFoundMediaMutators } from "%stanza/state/media-finder/foundMedia";
import { useIsMediaLoadingMutators } from "%stanza/state/media-finder/isMediaLoading";
import {
  useMediaPaginationMutators,
  useMediaPaginationState,
} from "%stanza/state/media-finder/mediaPagination";
import { useQueryDataMutators } from "%stanza/state/media-finder/queryData";
import { getData } from "%stanza/utils/getData";
import { extractLabelIds } from "%stanza/utils/labelInfo";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

export const AppContainer: FC<Props> = ({ dispatchEvent }) => {
  useMediaLoadFromOrganismSelection();
  return (
    <AppWrapper>
      <QueryPane>
        <PhenotypeSection />
      </QueryPane>
      <SubPane>
        <OrganismPane />
      </SubPane>
      <SubPane>
        <MediaPane dispatchEvent={dispatchEvent} />
      </SubPane>
    </AppWrapper>
  );
};

const SHOW_COUNT = 10;
const useMediaLoadFromOrganismSelection = () => {
  const page = useMediaPaginationState();
  const selectedOrganisms = useSelectedOrganismsState();
  const { setQueryData } = useQueryDataMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  const { setIsMediaLoading } = useIsMediaLoadingMutators();
  const { reset } = useMediaPaginationMutators();
  const nullResponse = { total: 0, contents: [], offset: 0, limit: 0 };
  const query = useQuery({
    queryKey: [selectedOrganisms, { page }],
    queryFn: async () => {
      if (selectedOrganisms.length === 0) return nullResponse;
      //
      const tax_ids = extractLabelIds(selectedOrganisms);
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
