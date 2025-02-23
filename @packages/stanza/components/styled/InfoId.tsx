import { styled } from "@mui/material/styles";
import { THEME } from "%stanza/styles/theme";

export const InfoId = styled("div")({
  display: "flex",
  "& span": {
    fontWeight: 300,
    fontSize: 16,
  },
  "& .tag-list": {
    display: "flex",
    marginLeft: 20,
    gap: 4,
  },

  a: {
    color: THEME.STANZA_COLOR.PRIMARY_DARK,
  },
});
