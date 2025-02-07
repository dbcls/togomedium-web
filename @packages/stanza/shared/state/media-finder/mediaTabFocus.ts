import { atom, useAtomValue, useSetAtom } from "jotai";

export const mediaTabNames = ["Found media", "Selected media"] as const;
export type MediaTabName = (typeof mediaTabNames)[number];
const mediaTabFocus = atom<MediaTabName>("Found media");

export const useMediaTabFocusState = () => {
  return useAtomValue(mediaTabFocus);
};

export const useMediaTabFocusMutators = () => {
  const setMediaTabFocus = useSetAtom(mediaTabFocus);
  return { setMediaTabFocus };
};
