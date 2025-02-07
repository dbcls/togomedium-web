import { atom, useAtomValue, useSetAtom } from "jotai";
import { filterOutInfo, hasInfo, LabelInfo } from "../../../shared/utils/labelInfo";

const selectedOrganisms = atom<LabelInfo[]>([]);

export const useSelectedOrganismsState = () => {
  return useAtomValue(selectedOrganisms);
};

export const useSelectedOrganismsMutators = () => {
  const setSelectedOrganisms = useSetAtom(selectedOrganisms);
  const toggleOrganismSelection = (info: LabelInfo) => {
    setSelectedOrganisms((prev: LabelInfo[]) => {
      return hasInfo(prev, info) ? filterOutInfo(prev, info) : [...prev, info];
    });
  };
  const clearSelectedOrganisms = () => {
    setSelectedOrganisms([]);
  };
  return { setSelectedOrganisms, toggleOrganismSelection, clearSelectedOrganisms };
};
