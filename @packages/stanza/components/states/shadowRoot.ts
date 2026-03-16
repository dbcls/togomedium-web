import { atom, useAtomValue, useSetAtom } from "jotai";

const shadowRootAtom = atom<ShadowRoot | null>(null);

export const useShadowRootState = () => {
  return useAtomValue(shadowRootAtom);
};

export const useShadowRootMutators = () => {
  const setter = useSetAtom(shadowRootAtom);
  const setShadowRoot = (shadowRoot: ShadowRoot | null) => setter(shadowRoot);
  return { setShadowRoot };
};
