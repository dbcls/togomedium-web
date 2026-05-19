// disable react-refresh as this file contains shared styled components
/* oxlint-disable react-refresh/only-export-components */

import { THEME } from "%core/theme";
import { styled } from "@mui/material/styles";

const GRID_TEMPLATE_COLUMNS = "20px 384px 70px 70px 70px 70px 1fr";
export const SPAN_GRID_COLUMNS = "span 7";

export const Sheet = styled("div")({
  display: "grid",
  gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
  columnGap: THEME.SIZE.S2,
  rowGap: THEME.SIZE.S2,
});

export const Block = styled("div")({
  display: "grid",
  gridTemplateColumns: "subgrid",
  gridColumn: SPAN_GRID_COLUMNS,
  rowGap: THEME.SIZE.S2,
  backgroundColor: THEME.COLOR.WHITE,
  paddingInline: THEME.SIZE.S1,
  paddingTop: THEME.SIZE.S3,
  paddingBottom: THEME.SIZE.S1,
  borderRadius: THEME.ROUND.BASE,
  // border: THEME.BORDER,
});

export const TableRow = styled("div")({
  display: "grid",
  gridTemplateColumns: "subgrid",
  gridColumn: SPAN_GRID_COLUMNS,
});
