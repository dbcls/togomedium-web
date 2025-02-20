import { atom, useAtomValue, useSetAtom } from "jotai";

const searchResultAtom = atom<string | null>(null);

export const useSearchResult = () => {
  return useAtomValue(searchResultAtom);
};

export const useSearchResultMutators = () => {
  const setSearchResult = useSetAtom(searchResultAtom);
  return { setSearchResult };
};
