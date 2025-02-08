import { atom, useAtomValue, useSetAtom } from "jotai";
import { filterOutInfo, hasInfo, LabelInfo } from "../../utils/labelInfo";

const selectedMedia = atom<LabelInfo[]>([]);

export const useSelectedMediaState = () => {
  return useAtomValue(selectedMedia);
};

export const useSelectedMediaMutators = () => {
  const setSelectedMedia = useSetAtom(selectedMedia);
  const toggleMediumSelection = (info: LabelInfo) => {
    setSelectedMedia((prev: LabelInfo[]) => {
      return hasInfo(prev, info) ? filterOutInfo(prev, info) : [...prev, info];
    });
  };
  const clearSelectedMedia = () => {
    setSelectedMedia([]);
  };
  return { setSelectedMedia, toggleMediumSelection, clearSelectedMedia };
};
