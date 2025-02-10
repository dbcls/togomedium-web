import { styled } from "@mui/material/styles";
import { THEME } from "%stanza/styles/theme";

export const AppWrapper = styled("div")({
  position: "relative",
  backgroundColor: THEME.COLOR.GRAY_BG,
  padding: THEME.SIZE.S1,
  height: "100%",
  display: "flex",
  flexGrow: 1,
  alignItems: "stretch",
  gap: THEME.SIZE.S1,
});
