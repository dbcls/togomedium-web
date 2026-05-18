import { useAppDispatch } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import {
  FeedbackActions,
  type FeedbackInput,
} from "%stanza/stanzas/gmdb-medium-builder/state/feedback";
import { useMemo } from "react";

export const useFeedback = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      showSuccess: (input: string | FeedbackInput) => {
        dispatch(FeedbackActions.showSuccess(input));
      },
      showError: (input: string | FeedbackInput) => {
        dispatch(FeedbackActions.showError(input));
      },
      closeFeedback: () => {
        dispatch(FeedbackActions.closeFeedback());
      },
    }),
    [dispatch],
  );
};
