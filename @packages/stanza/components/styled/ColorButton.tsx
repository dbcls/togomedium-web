import { styled } from "@mui/material/styles";
import { THEME } from "%core/theme";

export const ColorButton = styled("a")({
  backgroundColor: THEME.STANZA_COLOR.PRIMARY,
  color: `${THEME.COLOR.WHITE} !important`,
  padding: "4px 8px 2px",
  borderRadius: 3,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1,
});
