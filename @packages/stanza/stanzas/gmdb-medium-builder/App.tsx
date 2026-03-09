import { THEME } from "%core/theme";
import { styled } from "@mui/material/styles";
import React from "react";

export type AppProps = {
  stanzaElement?: ShadowRoot;
};

const App = ({}: AppProps) => {
  return <Wrapper>HELLO WORLD</Wrapper>;
};

const Wrapper = styled("div")({
  minHeight: 100,
  width: "fit-content",
  minWidth: "100%",
  backgroundColor: THEME.COLOR.WHITE,
  borderRadius: 5,
  padding: THEME.SIZE.S1,
});

export default App;
