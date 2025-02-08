import { atom, useAtomValue, useSetAtom } from "jotai";

export type QueryData = { [key: string]: string | string[] | null };
const queryData = atom<QueryData>({});

export const useQueryDataState = () => {
  return useAtomValue(queryData);
};

export const useQueryDataMutators = () => {
  const setQueryData = useSetAtom(queryData);
  return { setQueryData };
};
