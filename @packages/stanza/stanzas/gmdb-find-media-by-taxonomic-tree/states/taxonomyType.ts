import { atom, useAtomValue, useSetAtom } from "jotai";
import { listMediaOfGtdbTaxonsURL, listMediaOfTaxonsURL } from "%api/listMediaOfTaxons/definitions";
import { gtdbTaxonAncestorsURL, taxonAncestorsURL } from "%api/taxonAncestors.ts/definitions";
import { gtdbTaxonChildrenURL, taxonChildrenURL } from "%api/taxonChildren/definitions";
import { gtdbTaxonSearchByNameUrl, taxonSearchByNameURL } from "%api/taxonSearchByName/definitions";

export type TaxonomyType = "NCBI" | "GTDB";
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
  const url = apiType === "GTDB" ? gtdbTaxonSearchByNameUrl : taxonSearchByNameURL;
  return { type: apiType, url };
};

export const useTreeApi = (): ApiInfo => {
  const apiType = useAtomValue(taxonomyTypeAtom);
  const url = apiType === "GTDB" ? gtdbTaxonChildrenURL : taxonChildrenURL;
  return { type: apiType, url };
};

export const useTaxonAncestorsApi = (): ApiInfo => {
  const apiType = useAtomValue(taxonomyTypeAtom);
  const url = apiType === "GTDB" ? gtdbTaxonAncestorsURL : taxonAncestorsURL;
  return { type: apiType, url };
};

export const useListMediaOfTaxonsApi = (): ApiInfo => {
  const apiType = useAtomValue(taxonomyTypeAtom);
  const url = apiType === "GTDB" ? listMediaOfGtdbTaxonsURL : listMediaOfTaxonsURL;
  return { type: apiType, url };
};
