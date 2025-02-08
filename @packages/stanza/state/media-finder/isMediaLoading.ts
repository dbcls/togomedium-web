import { atom, useAtomValue, useSetAtom } from "jotai";

const isMediaLoading = atom<boolean>(false);

export const useIsMediaLoadingState = () => {
  return useAtomValue(isMediaLoading);
};

export const useIsMediaLoadingMutators = () => {
  const setIsMediaLoading = useSetAtom(isMediaLoading);
  return { setIsMediaLoading };
};
