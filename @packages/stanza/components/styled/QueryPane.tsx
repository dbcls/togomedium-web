import { styled } from "@mui/material/styles";
import { THEME } from "%stanza/styles/theme";

export const QueryPane = styled("div")({
  flex: 1,
  overflowY: "auto",
  borderRadius: THEME.ROUND.BASE,
  padding: THEME.SIZE.S1,
  backgroundColor: THEME.COLOR.WHITE,
  display: "flex",
  flexDirection: "column",
  gap: THEME.SIZE.S2,
});
