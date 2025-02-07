import { atom, useAtomValue, useSetAtom } from "jotai";
import { clone } from "../../../shared/utils/clone";

type QueryObj = { [key: string]: string };
const phenotypeQuery = atom<QueryObj>({});

export const usePhenotypeQueryState = () => {
  return useAtomValue(phenotypeQuery);
};

export const usePhenotypeQueryMutators = () => {
  const setPhenotypeQuery = useSetAtom(phenotypeQuery);
  const updatePhenotypeQuery = (key: string, value: string) => {
    setPhenotypeQuery((prev) => {
      const cloned: QueryObj = clone(prev);
      cloned[key] = value;
      return cloned;
    });
  };
  const removePhenotypeQuery = (key: string) => {
    setPhenotypeQuery((prev) => {
      const cloned: QueryObj = clone(prev);
      if (cloned[key]) {
        delete cloned[key];
      }
      return cloned;
    });
  };
  const clearPhenotypeQuery = () => {
    setPhenotypeQuery({});
  };
  return { updatePhenotypeQuery, removePhenotypeQuery, clearPhenotypeQuery };
};
