import { PATH_GTDB_TAXON_ANCESTORS } from "%api/gtdbTaxonAncestors/definitions";
import { PATH_GTDB_TAXON_CHILDREN } from "%api/gtdbTaxonChildren/definitions";
import { PATH_GTDB_TAXON_SEARCH_BY_NAME } from "%api/gtdbTaxonSearchByName/definitions";
import { PATH_LIST_MEDIA_OF_GTDB_TAXONS } from "%api/listMediaOfGtdbTaxons/definitions";
import { PATH_LIST_MEDIA_OF_TAXONS } from "%api/listMediaOfTaxons/definitions";
import { PATH_TAXON_ANCESTORS } from "%api/taxonAncestors.ts/definitions";
import { PATH_TAXON_CHILDREN } from "%api/taxonChildren/definitions";
import { PATH_TAXON_SEARCH_BY_NAME } from "%api/taxonSearchByName/definitions";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { TaxonomyType } from "%core/types/TaxonomyType";
import { atom, useAtomValue, useSetAtom } from "jotai";

type ApiInfo = { type: TaxonomyType; url: string };

const taxonomyTypeAtom = atom<TaxonomyType>("NCBI");
export const useTaxonomyTypeMutators = () => {
  const setApiType = useSetAtom(taxonomyTypeAtom);
  return { setApiType };
};

export const useTaxonomyType = () => {
  return useAtomValue(taxonomyTypeAtom);
};

export const useTaxonSearchApi = (): ApiInfo => {
  const apiType = useAtomValue(taxonomyTypeAtom);
  const url = makeApiUrl(
    apiType === "GTDB" ? PATH_GTDB_TAXON_SEARCH_BY_NAME : PATH_TAXON_SEARCH_BY_NAME,
  );
  return { type: apiType, url };
};

export const useTreeApi = (): ApiInfo => {
  const apiType = useAtomValue(taxonomyTypeAtom);
  const url = makeApiUrl(apiType === "GTDB" ? PATH_GTDB_TAXON_CHILDREN : PATH_TAXON_CHILDREN);
  return { type: apiType, url };
};

export const useTaxonAncestorsApi = (): ApiInfo => {
  const apiType = useAtomValue(taxonomyTypeAtom);
  const url = makeApiUrl(apiType === "GTDB" ? PATH_GTDB_TAXON_ANCESTORS : PATH_TAXON_ANCESTORS);
  return { type: apiType, url };
};

export const useListMediaOfTaxonsApi = (): ApiInfo => {
  const apiType = useAtomValue(taxonomyTypeAtom);
  const url = makeApiUrl(
    apiType === "GTDB" ? PATH_LIST_MEDIA_OF_GTDB_TAXONS : PATH_LIST_MEDIA_OF_TAXONS,
  );
  return { type: apiType, url };
};
