import { styled } from "@mui/material/styles";
import { THEME } from "%stanza/styles/theme";

export const LinkList = styled("ul")({
  li: {
    display: "flex",
    gap: 8,
  },
  a: {
    color: THEME.STANZA_COLOR.PRIMARY_DARK,
  },
});
