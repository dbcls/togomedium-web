import { THEME } from "%core/theme";
import { MediumBuilderImportDialog } from "%stanza/stanzas/gmdb-medium-builder/components/MediumBuilderImportDialog";
import { useAppDispatch, useAppSelector } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import {
  DocumentActions,
  DocumentSelectors,
} from "%stanza/stanzas/gmdb-medium-builder/state/slices/document";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import type { ChangeEvent, FC } from "react";
import { useState } from "react";

export const MediumInfo: FC = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(DocumentSelectors.selectTitle);
  const description = useAppSelector(DocumentSelectors.selectDescription);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedImportFile, setSelectedImportFile] = useState<File | null>(null);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(DocumentActions.setTitle(event.target.value));
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(DocumentActions.setDescription(event.target.value));
  };

  const handleOpenImportDialog = () => {
    setIsImportDialogOpen(true);
  };

  const handleCloseImportDialog = () => {
    setIsImportDialogOpen(false);
    setSelectedImportFile(null);
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
      <MediumBuilderImportDialog
        open={isImportDialogOpen}
        selectedFile={selectedImportFile}
        onClose={handleCloseImportDialog}
        onFileSelect={setSelectedImportFile}
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
