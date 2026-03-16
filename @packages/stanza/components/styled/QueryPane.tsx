import { THEME } from "%core/theme";
import { styled } from "@mui/material/styles";

export const QueryPane = styled("div")({
  position: "relative",
  flex: 1,
  overflowY: "auto",
  borderRadius: THEME.ROUND.BASE,
  padding: THEME.SIZE.S1,
  backgroundColor: THEME.COLOR.WHITE,
  display: "flex",
  flexDirection: "column",
  gap: THEME.SIZE.S2,
});
