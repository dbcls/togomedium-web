import { styled } from "@mui/material/styles";
import { COLOR_TEXT, COLOR_WHITE } from "%stanza/styles/variables";

export const StanzaWrapper = styled("div")({
  position: "relative",
  fontSize: 16,
  padding: 16,
  backgroundColor: COLOR_WHITE,
  borderRadius: 5,
  fontWeight: 300,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  color: COLOR_TEXT,
  boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
});
