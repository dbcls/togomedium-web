import { atom, useAtomValue, useSetAtom } from "jotai";
import { TaxonInfo } from "./taxonList";
import { makeNewSelection } from "../functions/proessTaxonInfo";

const selectedTaxon = atom<string[]>([]);

export const useSelectedTaxonState = () => {
  return useAtomValue(selectedTaxon);
};

export const useSelectedTaxonMutators = () => {
  const setSelectedTaxon = useSetAtom(selectedTaxon);
  const clearTaxonSelect = () => {
    setSelectedTaxon([]);
  };
  const updateSelection = (list: TaxonInfo[], id: string) => {
    setSelectedTaxon((prev) => makeNewSelection(list, id, prev));
  };
  return {
    __setSelectedTaxon: setSelectedTaxon,
    clearTaxonSelect,
    updateSelection,
  };
};
