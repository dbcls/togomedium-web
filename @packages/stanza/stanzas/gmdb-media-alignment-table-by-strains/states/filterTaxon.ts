import { atom, useAtomValue, useSetAtom } from "jotai";

const filterTaxonAtom = atom("");

export const useFilterTaxonState = () => {
  return useAtomValue(filterTaxonAtom);
};

export const useFilterTaxonMutators = () => {
  const setter = useSetAtom(filterTaxonAtom);
  const setFilterTaxon = (id: string) => setter((prev) => (id === prev ? "" : id));
  return { setFilterTaxon };
};
