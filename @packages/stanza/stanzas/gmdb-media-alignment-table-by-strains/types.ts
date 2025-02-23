import { LineageRank } from "%api/mediaStrainsAlignment/definitions";

export type CellInfo = {
  label: string;
  id: string;
  size: number;
};
export type DisplayData = {
  media: CellInfo[];
  taxon: Record<LineageRank, CellInfo[][]>;
};
