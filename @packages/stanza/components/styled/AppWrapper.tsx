import { styled } from "@mui/material/styles";
import { COLOR_GRAY_BG, SIZE1 } from "%stanza/styles/variables";

export const AppWrapper = styled("div")({
  position: "relative",
  backgroundColor: COLOR_GRAY_BG,
  padding: SIZE1,
  height: "100%",
  display: "flex",
  flexGrow: 1,
  alignItems: "stretch",
  gap: SIZE1,
});
