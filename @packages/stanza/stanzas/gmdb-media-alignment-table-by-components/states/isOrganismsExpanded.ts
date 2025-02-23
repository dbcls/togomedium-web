import { atom, useAtomValue, useSetAtom } from "jotai";

const isOrganismsExpanded = atom<boolean>(false);

export const useIsOrganismsExpendedState = () => {
  return useAtomValue(isOrganismsExpanded);
};

export const useIsOrganismsExpandedMutators = () => {
  const setIsOrganismsExpanded = useSetAtom(isOrganismsExpanded);
  return { setIsOrganismsExpanded };
};
