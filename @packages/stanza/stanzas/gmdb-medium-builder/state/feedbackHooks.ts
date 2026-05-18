import { useAppDispatch } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import {
  FeedbackActions,
  type MediumBuilderFeedbackInput,
} from "%stanza/stanzas/gmdb-medium-builder/state/feedback";
import { useMemo } from "react";

export const useMediumBuilderFeedback = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      showSuccess: (input: string | MediumBuilderFeedbackInput) => {
        dispatch(FeedbackActions.showSuccess(input));
      },
      showError: (input: string | MediumBuilderFeedbackInput) => {
        dispatch(FeedbackActions.showError(input));
      },
      closeFeedback: () => {
        dispatch(FeedbackActions.closeFeedback());
      },
    }),
    [dispatch],
  );
};
