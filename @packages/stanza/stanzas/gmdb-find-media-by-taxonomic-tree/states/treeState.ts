import { atom, useAtomValue, useSetAtom } from "jotai";

const treeStateAtom = atom<string[]>([]);

export const useTaxonTreeState = () => {
  return useAtomValue(treeStateAtom);
};

export const useIsOpen = (id: string) => {
  return useAtomValue(treeStateAtom).includes(id);
};

export const useTaxonTreeMutators = () => {
  const setTreeState = useSetAtom(treeStateAtom);
  const toggleOpen = (id: string) => {
    setTreeState((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const setOpen = (id: string) => {
    setTreeState((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const setClosed = (id: string) => {
    setTreeState((prev) => {
      return prev.filter((item) => item !== id);
    });
  };
  const setBranchState = (id: string, isOpen: boolean) => {};

  const margeTreeState = (newState: string[]) => {
    setTreeState((prev) => {
      return [...new Set([...prev, ...newState])];
    });
  };

  const closeAll = () => {
    setTreeState([]);
  };

  return { setTreeState, toggleOpen, setOpen, setClosed, setBranchState, margeTreeState, closeAll };
};
