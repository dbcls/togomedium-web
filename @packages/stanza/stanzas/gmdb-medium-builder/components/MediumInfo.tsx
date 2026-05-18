import { THEME } from "%core/theme";
import { ImportDialog } from "%stanza/stanzas/gmdb-medium-builder/components/ImportDialog";
import {
  type AppState,
  useAppDispatch,
  useAppSelector,
} from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { useFeedback } from "%stanza/stanzas/gmdb-medium-builder/state/feedbackHooks";
import {
  DocumentActions,
  DocumentSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import { replaceImportedAppStateThunk } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/replaceImportedAppStateThunk";
import { downloadDraft } from "%stanza/stanzas/gmdb-medium-builder/utils/draftExport";
import {
  importDraftJson,
  logImportWarnings,
} from "%stanza/stanzas/gmdb-medium-builder/utils/draftImport";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import type { ChangeEvent, FC } from "react";
import { useState } from "react";
import { useStore } from "react-redux";

export const MediumInfo: FC = () => {
  const dispatch = useAppDispatch();
  const store = useStore<AppState>();
  const title = useAppSelector(DocumentSelectors.selectTitle);
  const description = useAppSelector(DocumentSelectors.selectDescription);
  const { showSuccess, showError } = useFeedback();
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedImportFile, setSelectedImportFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(DocumentActions.setTitle(event.target.value));
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(DocumentActions.setDescription(event.target.value));
  };

  const handleOpenImportDialog = () => {
    setIsImportDialogOpen(true);
  };

  const handleSaveDraftJson = () => {
    try {
      const { filename } = downloadDraft(store.getState());

      showSuccess(`Saved ${filename}.`);
    } catch (error) {
      showError({
        message: "Export failed.",
        detail: error instanceof Error ? error.message : "The draft JSON could not be downloaded.",
      });
    }
  };

  const handleCloseImportDialog = () => {
    setIsImportDialogOpen(false);
    setSelectedImportFile(null);
  };

  const handleImportDraftJson = async (file: File) => {
    if (isImporting) {
      return;
    }

    setIsImporting(true);

    try {
      const result = await importDraftJson(file);
      logImportWarnings(result.warnings);

      if (!result.success) {
        showError({
          message: result.error.message,
          detail: result.error.detail,
        });
        return;
      }

      dispatch(replaceImportedAppStateThunk(result.state));
      handleCloseImportDialog();
      showSuccess(`Imported ${file.name}.`);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Wrapper>
      <Fields>
        <TextField
          fullWidth={true}
          placeholder={"Medium name"}
          size={"small"}
          value={title}
          onChange={handleChangeTitle}
        />
        <TextField
          fullWidth={true}
          placeholder={"Medium description"}
          multiline={true}
          size={"small"}
          rows={3}
          value={description}
          onChange={handleChangeDescription}
        />
      </Fields>
      <Actions>
        <Button
          variant={"contained"}
          size={"small"}
          disableElevation={true}
          sx={{ textTransform: "none" }}
          onClick={handleSaveDraftJson}
        >
          Save as .json
        </Button>
        <Button
          variant={"contained"}
          size={"small"}
          disableElevation={true}
          sx={{ textTransform: "none" }}
          onClick={handleOpenImportDialog}
        >
          Upload .json
        </Button>
      </Actions>
      <ImportDialog
        open={isImportDialogOpen}
        selectedFile={selectedImportFile}
        onClose={handleCloseImportDialog}
        onFileSelect={setSelectedImportFile}
        onImport={handleImportDraftJson}
      />
    </Wrapper>
  );
};

const Wrapper = styled("header")({
  padding: THEME.SIZE.S2,
  borderRadius: THEME.ROUND.BASE,
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: THEME.SIZE.S2,
  backgroundColor: THEME.COLOR.WHITE,
});

const Actions = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: THEME.SIZE.S1,
});

const Fields = styled("div")({
  display: "grid",
  gap: THEME.SIZE.S1,
  flex: 1,
});
