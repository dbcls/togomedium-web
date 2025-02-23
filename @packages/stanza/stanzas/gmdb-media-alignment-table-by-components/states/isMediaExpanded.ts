import { atom, useAtomValue, useSetAtom } from "jotai";

const isMediaExpanded = atom(false);

export const useIsMediaExpendedState = () => {
  return useAtomValue(isMediaExpanded);
};

export const useIsMediaExpandedMutators = () => {
  const setIsMediaExpanded = useSetAtom(isMediaExpanded);
  return { setIsMediaExpanded };
};
