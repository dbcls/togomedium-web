import { atom, useAtomValue, useSetAtom } from "jotai";

const mediaPagination = atom(1);
export const useMediaPaginationState = () => {
  return useAtomValue(mediaPagination);
};

export const useMediaPaginationMutators = () => {
  const setMediaPagination = useSetAtom(mediaPagination);
  const next = () => setMediaPagination((prev) => prev + 1);
  const prev = () => setMediaPagination((prev) => prev - 1);
  const reset = () => setMediaPagination(1);
  return { next, prev, reset };
};
