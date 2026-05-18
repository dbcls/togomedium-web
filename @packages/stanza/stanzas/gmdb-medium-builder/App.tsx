import { THEME } from "%core/theme";
import { FeedbackSnackbar } from "%stanza/stanzas/gmdb-medium-builder/components/FeedbackSnackbar";
import { Sheet } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { MediumInfo } from "%stanza/stanzas/gmdb-medium-builder/components/MediumInfo";
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
      <MediumInfo />

      <Sheet>
        {solutions.map((solution) => (
          <SolutionBlock key={solution.id} id={solution.id} />
        ))}
        <FooterRow>
          <Button
            variant={"contained"}
            size={"small"}
            disableElevation={true}
            sx={{ textTransform: "none" }}
            onClick={onClickAdd}
          >
            Add solution block
          </Button>
        </FooterRow>
      </Sheet>
      <FeedbackSnackbar />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  minHeight: 100,
  width: "fit-content",
  minWidth: "100%",
  // backgroundColor: "white",
  borderRadius: THEME.ROUND.BASE,
  display: "grid",
  gap: THEME.SIZE.S2,
});

const FooterRow = styled("div")({
  gridColumn: "span 5",
  display: "flex",
  justifyContent: "end",
  paddingInline: THEME.SIZE.S1,
});

export default App;
