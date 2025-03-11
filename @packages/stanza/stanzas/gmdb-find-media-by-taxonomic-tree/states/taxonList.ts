import { atom, useAtomValue, useSetAtom } from "jotai";

export type TaxonInfo = {
  id: string;
  rank: string;
  label: string;
  children: string[] | undefined;
};

export const ncbiSuperkingdoms: TaxonInfo[] = [
  {
    id: "2157",
    label: "Archaea",
    rank: "Superkingdom",
    children: undefined,
  },
  {
    id: "2",
    label: "Bacteria",
    rank: "Superkingdom",
    children: undefined,
  },
  {
    id: "2759",
    label: "Eukaryota",
    rank: "Superkingdom",
    children: undefined,
  },
];

export const gtdbSuperkingdoms: TaxonInfo[] = [
  {
    id: "d__Bacteria",
    label: "d__Bacteria",
    rank: "Domain",
    children: undefined,
  },
  {
    id: "d__Archaea",
    label: "d__Archaea",
    rank: "Domain",
    children: undefined,
  },
];

const taxonListAtom = atom<TaxonInfo[]>([...ncbiSuperkingdoms, ...gtdbSuperkingdoms]);

export const useTaxonListState = () => {
  return useAtomValue(taxonListAtom);
};

export const useTaxonListMutators = () => {
  const setTaxonList = useSetAtom(taxonListAtom);
  const addTaxonToList = (taxon: TaxonInfo) => {
    setTaxonList((prev) => [...prev.filter((item) => item.id !== taxon.id), taxon]);
  };
  const setTaxonChildren = (id: string, children: string[]) => {
    setTaxonList((prev) => {
      const target = prev.find((item) => item.id === id);
      const filtered = prev.filter((item) => item.id !== id);
      if (!target) {
        console.warn("no target found", id);
        return prev;
      }
      return [...filtered, { ...target, children }];
    });
  };

  return { addTaxonToList, setTaxonChildren };
};
