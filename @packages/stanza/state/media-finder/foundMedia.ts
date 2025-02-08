import { atom, useAtomValue, useSetAtom } from "jotai";
import { MediaFinderListApiBody } from "../../utils/types";

export type FoundMedia = MediaFinderListApiBody<"gm_id" | "name">;
export const nullResponse: FoundMedia = {
  total: 0,
  limit: 0,
  contents: [],
  offset: 0,
};

const foundMedia = atom<FoundMedia>(nullResponse);

export const useFoundMediaState = () => {
  return useAtomValue(foundMedia);
};

export const useFoundMediaMutators = () => {
  const setFoundMedia = useSetAtom(foundMedia);
  return { setFoundMedia };
};
