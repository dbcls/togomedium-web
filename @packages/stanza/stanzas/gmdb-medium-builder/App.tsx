import { THEME } from "%core/theme";
import { FeedbackSnackbar } from "%stanza/stanzas/gmdb-medium-builder/components/FeedbackSnackbar";
import { Sheet } from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
import { MediumInfo } from "%stanza/stanzas/gmdb-medium-builder/components/MediumInfo";
import { SolutionBlock } from "%stanza/stanzas/gmdb-medium-builder/components/SolutionBlock";
import { useAppDispatch, useAppSelector } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { useFeedback } from "%stanza/stanzas/gmdb-medium-builder/state/feedbackHooks";
import { selectDocumentSolutions } from "%stanza/stanzas/gmdb-medium-builder/state/selectors/selectDocumentSolutions";
import { addSolutionThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/addSolutionThunk";
import { replaceImportedAppStateThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/replaceImportedAppStateThunk";
import { importMediumDetailByGmId } from "%stanza/stanzas/gmdb-medium-builder/utils/mediumDetailImportWorkflow";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";

export type AppProps = {
  gmId?: string;
  stanzaElement?: ShadowRoot;
};

const App = ({ gmId }: AppProps) => {
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useFeedback();
  const [isInitialImporting, setIsInitialImporting] = useState(false);
  const onClickAdd = () => {
    dispatch(addSolutionThunk());
  };

  const solutions = useAppSelector(selectDocumentSolutions);

  useEffect(() => {
    const normalizedGmId = gmId?.trim();

    if (!normalizedGmId) {
      return;
    }

    let active = true;
    const abortController = new AbortController();

    setIsInitialImporting(true);

    void importMediumDetailByGmId(normalizedGmId, { abortController })
      .then((result) => {
        if (!active) {
          return;
        }

        if (!result.success) {
          showError({
            message: result.error.message,
            detail: result.error.detail,
          });
          return;
        }

        dispatch(replaceImportedAppStateThunk(result.state));
        showSuccess(`Imported ${normalizedGmId}.`);
      })
      .catch((error: unknown) => {
        if (!active) {
          return;
        }

        showError({
          message: "Import failed.",
          detail:
            error instanceof Error
              ? error.message
              : `Medium ${normalizedGmId} could not be imported.`,
        });
      })
      .finally(() => {
        if (active) {
          setIsInitialImporting(false);
        }
      });

    return () => {
      active = false;
      abortController.abort();
    };
  }, [dispatch, gmId, showError, showSuccess]);

  return (
    <Wrapper>
      {isInitialImporting ? (
        <InitialImportStatus>
          <LinearProgress />
          <span>Importing medium...</span>
        </InitialImportStatus>
      ) : null}
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

const InitialImportStatus = styled("div")({
  display: "grid",
  gap: THEME.SIZE.S1,
  padding: THEME.SIZE.S2,
  borderRadius: THEME.ROUND.BASE,
  backgroundColor: THEME.COLOR.WHITE,
  color: THEME.COLOR.GRAY,
  fontSize: 13,
});

const FooterRow = styled("div")({
  gridColumn: "span 5",
  display: "flex",
  justifyContent: "end",
  paddingInline: THEME.SIZE.S1,
});

export default App;
