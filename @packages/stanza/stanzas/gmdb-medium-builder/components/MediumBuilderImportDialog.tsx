import { THEME } from "%core/theme";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { ChangeEvent, DragEvent, FC } from "react";
import { useId, useState } from "react";

export type MediumBuilderImportDialogProps = {
  open: boolean;
  selectedFile: File | null;
  onClose: () => void;
  onFileSelect: (file: File | null) => void;
  onImport?: (file: File) => void;
};

export const MediumBuilderImportDialog: FC<MediumBuilderImportDialogProps> = ({
  open,
  selectedFile,
  onClose,
  onFileSelect,
  onImport,
}) => {
  const inputId = useId();
  const [selectionError, setSelectionError] = useState<string | null>(null);

  const selectFiles = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    if (files.length > 1) {
      onFileSelect(null);
      setSelectionError("Select a single JSON file. Multiple files cannot be imported at once.");
      return;
    }

    onFileSelect(files[0] ?? null);
    setSelectionError(null);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    selectFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setSelectionError(null);
    onClose();
  };

  const handleImport = () => {
    if (!selectedFile || !onImport) {
      return;
    }

    onImport(selectedFile);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"sm"}>
      <DialogTitle>Upload .json</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <Alert severity={"warning"}>
            Importing a JSON file will replace the current medium builder contents.
          </Alert>

          <DropZone htmlFor={inputId} onDrop={handleDrop} onDragOver={handleDragOver}>
            <VisuallyHiddenInput
              id={inputId}
              type={"file"}
              accept={"application/json,.json"}
              onChange={handleInputChange}
            />
            <Typography variant={"subtitle2"} component={"span"}>
              Drop a JSON file here
            </Typography>
            <Typography variant={"body2"} color={"text.secondary"} component={"span"}>
              or choose one from your computer
            </Typography>
            <Button
              variant={"outlined"}
              size={"small"}
              component={"span"}
              sx={{ textTransform: "none" }}
            >
              Choose file
            </Button>
          </DropZone>

          <Box>
            <Typography variant={"caption"} color={"text.secondary"} component={"p"}>
              Selected file
            </Typography>
            <Typography variant={"body2"} component={"p"}>
              {selectedFile ? selectedFile.name : "No file selected"}
            </Typography>
          </Box>

          {selectionError ? <Alert severity={"error"}>{selectionError}</Alert> : null}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button
          variant={"contained"}
          disableElevation={true}
          disabled={!selectedFile || !onImport}
          onClick={handleImport}
          sx={{ textTransform: "none" }}
        >
          Import
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DropZone = styled("label")({
  minHeight: 140,
  border: `1px dashed ${THEME.COLOR.GRAY_LINE}`,
  borderRadius: THEME.ROUND.BASE,
  padding: THEME.SIZE.S2,
  display: "grid",
  placeItems: "center",
  alignContent: "center",
  gap: THEME.SIZE.S1,
  cursor: "pointer",
  backgroundColor: THEME.COLOR.WHITE,
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
