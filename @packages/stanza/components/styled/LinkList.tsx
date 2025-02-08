import { styled } from "@mui/material/styles";
import { COLOR_PRIMARY } from "%stanza/styles/variables";

export const LinkList = styled("ul")({
  li: {
    display: "flex",
    gap: 8,
  },
  a: {
    color: COLOR_PRIMARY,
  },
});
