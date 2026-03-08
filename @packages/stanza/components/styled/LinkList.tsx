import { THEME } from "%core/theme";
import { styled } from "@mui/material/styles";

export const LinkList = styled("ul")({
  li: {
    display: "flex",
    gap: 8,
  },
  a: {
    color: THEME.STANZA_COLOR.PRIMARY_DARK,
  },
});
