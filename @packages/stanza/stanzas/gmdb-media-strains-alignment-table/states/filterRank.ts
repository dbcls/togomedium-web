import { atom, useAtomValue, useSetAtom } from "jotai";
import { Optional } from "yohak-tools";
import { LineageRank, lineageRanks } from "%api/mediaStrainsAlignment/definitions";

type FilterStatus = Record<LineageRank, boolean>;

const makeDefaultStatus = (): FilterStatus =>
  lineageRanks.reduce((accum: any, current) => {
    return { ...accum, [current]: false };
  }, {});

const filterStatusAtom = atom<FilterStatus>(makeDefaultStatus());
const filterRankAtom = atom<LineageRank>((get) => {
  const status = get(filterStatusAtom);
  return findCurrentFilterRank(status);
});

export const useFilterRankState = () => {
  return useAtomValue(filterRankAtom);
};

export const useFilterRankMutators = () => {
  const setFilterStatus = useSetAtom(filterStatusAtom);
  const changeFilterRank = (rank: LineageRank, val: boolean) =>
    setFilterStatus((prev) => ({ ...prev, [rank]: val }));
  return { changeFilterRank };
};

const findCurrentFilterRank = (status: FilterStatus): LineageRank => {
  let found: Optional<LineageRank> = undefined;
  const arr = lineageRanks.concat().reverse();
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i];
    const val = status[key];
    if (val) {
      found = key;
    } else {
      break;
    }
  }
  if (found === "superkingdom") {
    return "superkingdom";
  }
  const result = lineageRanks[lineageRanks.indexOf(found!) - 1];
  return result || "strain";
};

export const __TEST__ = {
  findCurrentFilterRank,
  makeDefaultStatus,
};
