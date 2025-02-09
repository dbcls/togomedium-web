import { styled } from "@mui/material/styles";
import { COLOR_PRIMARY_DARK } from "%stanza/styles/variables";

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
  // "& a": {
  //   color: COLOR_PRIMARY_DARK,
  // },
});
