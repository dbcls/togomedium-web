import { styled } from "@mui/material/styles";
import { THEME } from "%core/theme";

export const InfoId = styled("div")({
  display: "flex",
  alignItems: "center",
  "& span": {
    fontWeight: 300,
    fontSize: 16,
  },
  "& .tag-list": {
    display: "flex",
    marginLeft: 20,
    gap: 4,
    alignItems: "center",
  },

  a: {
    color: THEME.STANZA_COLOR.PRIMARY_DARK,
  },
});
