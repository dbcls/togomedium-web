import { THEME } from "%core/theme";
import { Sheet } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { SolutionBlock } from "%stanza/stanzas/gmdb-medium-builder/components/SolutionBlock";
import { useAppDispatch, useAppSelector } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { selectDocumentSolutions } from "%stanza/stanzas/gmdb-medium-builder/state/selectors/selectDocumentSolutions";
import { addSolutionThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/addSolutionThunk";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";

export type AppProps = {
  stanzaElement?: ShadowRoot;
};

const App = (_props: AppProps) => {
  const dispatch = useAppDispatch();
  const onClickAdd = () => {
    dispatch(addSolutionThunk());
  };

  const solutions = useAppSelector(selectDocumentSolutions);

  return (
    <Wrapper>
      <Sheet>
        {solutions.map((solution) => (
          <SolutionBlock key={solution.id} id={solution.id} />
        ))}
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
              onClick={onClickAdd}
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
