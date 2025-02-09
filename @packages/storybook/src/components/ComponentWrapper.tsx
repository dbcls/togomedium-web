import { styled } from "@mui/material/styles";
import { COLOR_WHITE, SIZE2 } from "%stanza/styles/variables";

export const ComponentWrapper = styled("div")(({ theme }) => ({
  backgroundColor: COLOR_WHITE,
  padding: SIZE2,
}));
