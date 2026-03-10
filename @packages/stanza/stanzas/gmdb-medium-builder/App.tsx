import { THEME } from "%core/theme";
import { InputBlock } from "%stanza/stanzas/gmdb-medium-builder/components/InputBlock";
import { InputRow } from "%stanza/stanzas/gmdb-medium-builder/components/InputRow";
import {
  Block,
  Sheet,
  TableRow,
} from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
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
        <FooterRow>
          <Button
            variant={"contained"}
            size={"small"}
            disableElevation={true}
            sx={{ textTransform: "none" }}
          >
            Add solution block
          </Button>
        </FooterRow>
      </Sheet>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  minHeight: 100,
  width: "fit-content",
  minWidth: "100%",
});

const FooterRow = styled("div")({
  gridColumn: "span 5",
  display: "flex",
  justifyContent: "flex-end",
  paddingInline: THEME.SIZE.S1,
});

export default App;
