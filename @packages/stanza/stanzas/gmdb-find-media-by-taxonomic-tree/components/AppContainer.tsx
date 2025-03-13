import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import { TaxonAncestorsParams, TaxonAncestorsResponse } from "%api/taxonAncestors.ts/definitions";
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
} from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/taxonomyType";
import { useTaxonTreeMutators } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/treeState";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
  taxonomyType: TaxonomyType;
};

// const use

export const AppContainer: FC<Props> = ({ dispatchEvent, taxonomyType }) => {
  const { setApiType } = useTaxonomyTypeMutators();
  const { setSearchResult } = useSearchResultMutators();
  useTaxonSearchResult();
  useMediaLoadFromTaxon();
  useEffect(() => {
    setApiType(taxonomyType);
  }, [taxonomyType, setApiType]);

  return (
    <AppWrapper>
      <QueryPane>
        <TaxonInput onChange={setSearchResult} />
        <TaxonomicTreeSection />
      </QueryPane>
      <SubPane>
        <MediaPane dispatchEvent={dispatchEvent} />
      </SubPane>
    </AppWrapper>
  );
};

const useTaxonSearchResult = () => {
  const searchedTaxon = useSearchResult();
  const { margeTreeState } = useTaxonTreeMutators();
  const { url, type } = useTaxonAncestorsApi();
  const query = useQuery({
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
  useEffect(() => {
    margeTreeState(
      query.data
        ? query.data
            .filter((taxon) => taxon.rank.toLowerCase() !== "species")
            .map((taxon) => taxon.tax_id)
        : []
    );
  }, [query.data]);
};
