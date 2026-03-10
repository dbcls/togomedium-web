import { THEME } from "%core/theme";
import { InputBlock } from "%stanza/stanzas/gmdb-medium-builder/components/InputBlock";
import { InputRow } from "%stanza/stanzas/gmdb-medium-builder/components/InputRow";
import {
  Block,
  Sheet,
  TableRow,
} from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { Autocomplete, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

export type AppProps = {
  stanzaElement?: ShadowRoot;
};

const App = ({}: AppProps) => {
  return (
    <Wrapper>
      <Sheet>
        <InputBlock />
        <InputBlock />
      </Sheet>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  minHeight: 100,
  width: "fit-content",
  minWidth: "100%",
  // backgroundColor: THEME.COLOR.WHITE,
  // borderRadius: 5,
  // padding: THEME.SIZE.S1,
});

export default App;
