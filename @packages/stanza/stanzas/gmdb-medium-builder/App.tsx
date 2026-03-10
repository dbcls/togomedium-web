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
          <FooterLeft>
            <Button
              variant={"contained"}
              size={"small"}
              disableElevation={true}
              sx={{ textTransform: "none" }}
            >
              Save as .json
            </Button>
            <Button
              variant={"contained"}
              size={"small"}
              disableElevation={true}
              sx={{ textTransform: "none" }}
            >
              Upload .json
            </Button>
          </FooterLeft>
          <FooterRight>
            <Button
              variant={"contained"}
              size={"small"}
              disableElevation={true}
              sx={{ textTransform: "none" }}
            >
              Add solution block
            </Button>
          </FooterRight>
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
  justifyContent: "space-between",
  paddingInline: THEME.SIZE.S1,
});

const FooterLeft = styled("div")({
  display: "flex",
  gap: THEME.SIZE.S1,
});
const FooterRight = styled("div")({
  display: "flex",
});

export default App;
