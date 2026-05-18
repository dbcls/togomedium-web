import { useAppSelector } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { FeedbackSelectors } from "%stanza/stanzas/gmdb-medium-builder/state/feedback";
import { useMediumBuilderFeedback } from "%stanza/stanzas/gmdb-medium-builder/state/feedbackHooks";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import type React from "react";

export const MediumBuilderFeedbackSnackbar = () => {
  const feedback = useAppSelector(FeedbackSelectors.selectFeedback);
  const { closeFeedback } = useMediumBuilderFeedback();

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    closeFeedback();
  };

  return (
    <Snackbar
      key={feedback.key}
      open={feedback.open}
      autoHideDuration={feedback.autoHideDuration}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert
        variant={"filled"}
        severity={feedback.severity}
        onClose={handleClose}
        sx={{ alignItems: "center", maxWidth: 560, width: "100%" }}
      >
        <span>{feedback.message}</span>
        {feedback.detail ? <span> {feedback.detail}</span> : null}
      </Alert>
    </Snackbar>
  );
};
