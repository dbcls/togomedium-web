// disable react-refresh as this file contains shared styled components
/* oxlint-disable react-refresh/only-export-components */

import { THEME } from "%core/theme";
import { styled } from "@mui/material/styles";

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
  paddingInline: THEME.SIZE.S1,
  paddingTop: THEME.SIZE.S3,
  paddingBottom: THEME.SIZE.S1,
  borderRadius: THEME.ROUND.BASE,
});

export const TableRow = styled("div")({
  display: "grid",
  gridTemplateColumns: "subgrid",
  gridColumn: "span 5",
});
