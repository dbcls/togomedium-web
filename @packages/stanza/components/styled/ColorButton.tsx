import { styled } from "@mui/material/styles";
import { COLOR_PRIMARY, COLOR_WHITE } from "%stanza/styles/variables";
export const ColorButton = styled("a")({
  backgroundColor: COLOR_PRIMARY,
  color: COLOR_WHITE,
  padding: "4px 8px 2px",
  borderRadius: 3,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1,
});
