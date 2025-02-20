import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import {
  TaxonAncestorsParams,
  TaxonAncestorsResponse,
  taxonAncestorsURL,
} from "%api/taxonAncestors.ts/definitions";
import { getData } from "%core/network/getData";
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
import { useTaxonTreeMutators } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/treeState";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

// const use

export const AppContainer: FC<Props> = ({ dispatchEvent }) => {
  useMediaLoadFromTaxon();
  useTaxonSearchResult();
  const { setSearchResult } = useSearchResultMutators();

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
  const query = useQuery({
    queryKey: ["taxon_ancestors", searchedTaxon],
    queryFn: async () => {
      if (searchedTaxon === null) return [];
      const response = await getData<TaxonAncestorsResponse, TaxonAncestorsParams>(
        taxonAncestorsURL,
        { tax_id: searchedTaxon }
      );
      if (!response.body) throw new Error("No data");
      return response.body;
    },
    placeholderData: [],
    staleTime: Infinity,
  });
  useEffect(() => {
    margeTreeState(query.data ? query.data.map((taxon) => taxon.tax_id) : []);
  }, [query.data]);
};
