import { styled } from "@mui/material/styles";
import { THEME } from "%stanza/styles/theme";

export const ColorButton = styled("a")({
  backgroundColor: THEME.COLOR.PRIMARY,
  color: THEME.COLOR.WHITE,
  padding: "4px 8px 2px",
  borderRadius: 3,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1,
});
