import { styled } from "@mui/material/styles";

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
});
