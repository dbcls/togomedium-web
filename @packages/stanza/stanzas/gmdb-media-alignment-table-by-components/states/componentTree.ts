import { atom, useAtomValue, useSetAtom } from "jotai";
import { toggleFooterComponent } from "../functions/toggleFooterComponent";
import { ComponentTrunk } from "../types";

const componentTreeAtom = atom<ComponentTrunk>([]);

export const useComponentTreeState = () => {
  return useAtomValue(componentTreeAtom);
};

export const useComponentTreeMutators = () => {
  const setComponentTree = useSetAtom(componentTreeAtom);
  const toggleComponent = (update: string) =>
    setComponentTree((prev) => toggleFooterComponent(update, prev) || []);
  return { toggleComponent, setComponentTree };
};
