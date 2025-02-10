import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import {
  LineageRank,
  lineageRanks,
} from "%stanza/stanzas/gmdb-media-strains-alignment-table/functions/types";
import { THEME } from "%stanza/styles/theme";
import { capitalizeFirstLetter, makeSpeciesName } from "%stanza/utils/string";

export type ApiLineage = {
  uri: string;
  taxid: number;
  label: string;
  rank: string;
}[];

export const LineageList: FC<{
  lineage: Partial<
    Record<
      LineageRank,
      {
        taxid: string | number;
        label: string;
      }
    >
  >;
}> = ({ lineage }) => {
  return (
    <LineageListWrapper>
      {lineageRanks
        .filter((rank) => !!lineage[rank] && lineage[rank]!.label !== "NA")
        .map((rank, index) => {
          const item = lineage[rank]!;
          return (
            <LineageItem
              rank={rank}
              label={item.label}
              id={item.taxid.toString()}
              key={index}
            />
          );
        })}
    </LineageListWrapper>
  );
};

const LineageItem: FC<{ rank: LineageRank; label: string; id: string }> = ({ rank, label, id }) => (
  <li>
    <span>{capitalizeFirstLetter(rank)}</span>
    <a href={`/taxon/${id}`}>{rank === "species" ? makeSpeciesName(label) : label}</a>
  </li>
);

const LineageListWrapper = styled("ul")({
  display: "flex",
  gap: 8,

  li: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
    borderRadius: 5,

    span: {
      width: "100%",
      textAlign: "center",
      borderBottom: `1px solid ${THEME.COLOR.GRAY_LINE}`,
      padding: "4px 8px",
      fontWeight: 500,
    },

    a: {
      padding: "4px 8px",
      color: THEME.COLOR.PRIMARY,
    },
  },
});
