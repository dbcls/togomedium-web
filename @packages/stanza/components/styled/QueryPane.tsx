import { styled } from "@mui/material/styles";
import { COLOR_WHITE, ROUND_CORNER, SIZE1 } from "%stanza/styles/variables";

export const QueryPane = styled("div")({
  flex: 1,
  overflowY: "auto",
  borderRadius: ROUND_CORNER,
  padding: SIZE1,
  backgroundColor: COLOR_WHITE,
  display: "flex",
  flexDirection: "column",
});
