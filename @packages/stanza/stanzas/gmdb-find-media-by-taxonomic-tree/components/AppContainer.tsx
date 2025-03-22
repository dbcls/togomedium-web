import { useQueries, useQuery } from "@tanstack/react-query";
import React, { FC, useEffect, useMemo } from "react";
import { TaxonAncestorsParams, TaxonAncestorsResponse } from "%api/taxonAncestors.ts/definitions";
import { TaxonChildrenParams, TaxonChildrenResponse } from "%api/taxonChildren/definitions";
import { getData } from "%core/network/getData";
import { TaxonomyType } from "%core/types/TaxonomyType";
import { MediaPane } from "%stanza/components/media-finder/MediaPane";
import { AppWrapper } from "%stanza/components/styled/AppWrapper";
import { QueryPane } from "%stanza/components/styled/QueryPane";
import { SubPane } from "%stanza/components/styled/SubPane";
import { TaxonInput } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TaxonInput";
import { TaxonomicTreeSection } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TaxonomicTreeSection";
import { useMediaLoadFromTaxon } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/hooks/useMediaLoadFromTaxon";
import {
  useSearchResult,
  useSearchResultMutators,
} from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/searchResult";
import {
  useTaxonAncestorsApi,
  useTaxonomyTypeMutators,
  useTreeApi,
} from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/taxonomyType";
import { useTaxonTreeMutators } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/treeState";
import { LoadingCover } from "%stanza/stanzas/gmdb-meta-list/components/LoadingCover";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
  taxonomyType: TaxonomyType;
};

// const use

export const AppContainer: FC<Props> = ({ dispatchEvent, taxonomyType }) => {
  const { setApiType } = useTaxonomyTypeMutators();
  const { setSearchResult } = useSearchResultMutators();
  const { showLoading } = useTaxonSearchResult();
  useMediaLoadFromTaxon();
  useEffect(() => {
    setApiType(taxonomyType);
  }, [taxonomyType, setApiType]);

  return (
    <AppWrapper>
      <QueryPane>
        <TaxonInput onChange={setSearchResult} />
        <TaxonomicTreeSection showLoading={showLoading} />
      </QueryPane>
      <SubPane>
        <MediaPane dispatchEvent={dispatchEvent} />
      </SubPane>
    </AppWrapper>
  );
};

const useTaxonSearchResult = () => {
  const searchedTaxon = useSearchResult();
  const { margeTreeState, closeAll } = useTaxonTreeMutators();
  const { url, type } = useTaxonAncestorsApi();
  const { url: treApiUrl } = useTreeApi();
  const firstQuery = useQuery({
    queryKey: ["taxon_ancestors", type, searchedTaxon],
    queryFn: async () => {
      if (searchedTaxon === null) return [];
      const response = await getData<TaxonAncestorsResponse, TaxonAncestorsParams>(url, {
        tax_id: searchedTaxon,
      });
      if (!response.body) throw new Error("No data");
      return response.body;
    },
    placeholderData: [],
    staleTime: Infinity,
  });
  const childrenIds = useMemo(() => firstQuery.data?.map((d) => d.tax_id) ?? [], [firstQuery.data]);
  const { data, isSuccess, isLoading, isPending } = useQueries({
    queries: childrenIds.map((id) => ({
      queryKey: ["taxon_children", type, id],
      queryFn: async () => {
        const response = await getData<TaxonChildrenResponse, TaxonChildrenParams>(treApiUrl, {
          tax_id: id,
        });
        return response.body;
      },
      staleTime: Infinity,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isLoading: results.some((result) => result.isLoading),
        isError: results.some((result) => result.isError),
        isPending: results.some((result) => result.isPending),
        isSuccess: results.every((result) => result.isSuccess),
      };
    },
  });

  useEffect(() => {
    if (data.length === 0) {
      closeAll();
    }
    if (isSuccess && data.length > 0) {
      margeTreeState(
        firstQuery.data
          ?.filter((taxon) => taxon.rank.toLowerCase() !== "species")
          .map((taxon) => taxon.tax_id) ?? []
      );
    }
  }, [data, isSuccess, firstQuery.data]);
  return { showLoading: isPending || firstQuery.isPending };
};
