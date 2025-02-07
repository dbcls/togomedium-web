import { atom, useAtomValue, useSetAtom } from "jotai";

export type SelectedAttributes = {
  gmo_ids: string[];
};
const selectedAttributes = atom<SelectedAttributes>({ gmo_ids: [] });

export const useSelectedAttributesState = () => {
  return useAtomValue(selectedAttributes);
};

export const useSelectedAttributesMutators = () => {
  const setSelectedAttributes = useSetAtom(selectedAttributes);
  return { setSelectedAttributes };
};
