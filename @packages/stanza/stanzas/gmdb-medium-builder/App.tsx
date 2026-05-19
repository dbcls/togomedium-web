import { THEME } from "%core/theme";
import { FeedbackSnackbar } from "%stanza/stanzas/gmdb-medium-builder/components/FeedbackSnackbar";
import {
  Sheet,
  SPAN_GRID_COLUMNS,
} from "%stanza/stanzas/gmdb-medium-builder/components/LayoutStyles";
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
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";

type AppProps = {
  gmId?: string;
  stanzaElement?: ShadowRoot;
};

const App = ({ gmId }: AppProps) => {
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useFeedback();
  const normalizedGmId = useMemo(() => gmId?.trim() ?? "", [gmId]);
  const initialImportQuery = useInitialMediumImportQuery(normalizedGmId);
  const onClickAdd = () => {
    dispatch(addSolutionThunk());
  };

  const solutions = useAppSelector(selectDocumentSolutions);

  useEffect(() => {
    const result = initialImportQuery.data;
    if (!result) {
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
  }, [dispatch, initialImportQuery.data, normalizedGmId, showError, showSuccess]);

  useEffect(() => {
    const error = initialImportQuery.error;
    if (!error) {
      return;
    }

    showError({
      message: "Import failed.",
      detail:
        error instanceof Error ? error.message : `Medium ${normalizedGmId} could not be imported.`,
    });
  }, [initialImportQuery.error, normalizedGmId, showError]);

  const isInitialImporting = normalizedGmId !== "" && initialImportQuery.isFetching;

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

const useInitialMediumImportQuery = (gmId: string) => {
  return useQuery({
    queryKey: ["gmdb-medium-builder", "initial-medium-import", gmId],
    queryFn: async ({ signal }) => {
      const abortController = new AbortController();
      const abortImport = () => abortController.abort();
      signal.addEventListener("abort", abortImport, { once: true });

      try {
        if (signal.aborted) {
          abortImport();
        }
        return await importMediumDetailByGmId(gmId, { abortController });
      } finally {
        signal.removeEventListener("abort", abortImport);
      }
    },
    enabled: gmId !== "",
    retry: false,
    staleTime: Infinity,
  });
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
  gridColumn: SPAN_GRID_COLUMNS,
  display: "flex",
  justifyContent: "end",
  paddingInline: THEME.SIZE.S1,
});

export default App;
