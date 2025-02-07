import { atom, useAtomValue, useSetAtom } from "jotai";

export const organismTabNames = ["Found organisms", "Selected organisms"] as const;
export type OrganismTabName = (typeof organismTabNames)[number];
const organismTabFocus = atom<OrganismTabName>("Found organisms");

export const useOrganismTabFocusState = () => {
  return useAtomValue(organismTabFocus);
};

export const useOrganismTabFocusMutators = () => {
  const setOrganismTabFocus = useSetAtom(organismTabFocus);
  return { setOrganismTabFocus };
};
