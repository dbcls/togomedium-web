import { styled } from "@mui/material/styles";
import { THEME } from "%core/theme";

export const StanzaWrapper = styled("div")({
  position: "relative",
  fontSize: 16,
  padding: 16,
  backgroundColor: THEME.COLOR.WHITE,
  borderRadius: 5,
  fontWeight: 300,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  color: THEME.COLOR.TEXT,
  boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
});
