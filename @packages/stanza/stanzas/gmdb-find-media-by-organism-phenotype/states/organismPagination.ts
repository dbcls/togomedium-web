import { atom, useAtomValue, useSetAtom } from "jotai";

const organismPagination = atom(1);

export const useOrganismPaginationState = () => {
  return useAtomValue(organismPagination);
};

export const useOrganismPaginationMutators = () => {
  const setOrganismPagination = useSetAtom(organismPagination);
  const next = () => setOrganismPagination((prev) => prev + 1);
  const prev = () => setOrganismPagination((prev) => prev - 1);
  const reset = () => setOrganismPagination(1);
  return { next, prev, reset };
};
