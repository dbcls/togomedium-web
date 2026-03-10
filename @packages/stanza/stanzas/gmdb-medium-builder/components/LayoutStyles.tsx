import { THEME } from "%core/theme";
import App from "%stanza/stanzas/gmdb-medium-builder/App";
import { styled } from "@mui/material/styles";
import type { FC } from "react";

type Props = {};

export const LayoutStyles: FC<Props> = () => {
  return <div>LayoutStyles</div>;
};

export const Sheet = styled("div")({
  display: "grid",
  gridTemplateColumns: "20px auto auto auto 1fr",
  columnGap: THEME.SIZE.S2,
  rowGap: THEME.SIZE.S2,
});
export const Block = styled("div")({
  display: "grid",
  gridTemplateColumns: "subgrid",
  gridColumn: "span 5",
  rowGap: THEME.SIZE.S2,
  backgroundColor: THEME.COLOR.WHITE,
  padding: THEME.SIZE.S1,
  borderRadius: THEME.ROUND.BASE,
});

export const TableRow = styled("div")({
  display: "grid",
  gridTemplateColumns: "subgrid",
  gridColumn: "span 5",
});
