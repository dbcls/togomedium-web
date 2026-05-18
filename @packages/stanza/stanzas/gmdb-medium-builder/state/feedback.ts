import type { AppState } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FeedbackSeverity = "success" | "error";

type FeedbackInput = {
  message: string;
  detail?: string;
  autoHideDuration?: number;
};

type FeedbackState = {
  open: boolean;
  severity: FeedbackSeverity;
  message: string;
  detail?: string;
  autoHideDuration: number;
  key: number;
};

const DEFAULT_FEEDBACK_AUTO_HIDE_DURATION = 6000;

export const createInitialFeedbackState = (): FeedbackState => ({
  open: false,
  severity: "success",
  message: "",
  detail: undefined,
  autoHideDuration: DEFAULT_FEEDBACK_AUTO_HIDE_DURATION,
  key: 0,
});

const normalizePayload = (payload: string | FeedbackInput): FeedbackInput => {
  if (typeof payload === "string") {
    return { message: payload };
  }

  return payload;
};

const showFeedback = (
  state: FeedbackState,
  severity: FeedbackSeverity,
  payload: string | FeedbackInput,
) => {
  const input = normalizePayload(payload);

  state.open = true;
  state.severity = severity;
  state.message = input.message;
  state.detail = input.detail;
  state.autoHideDuration = input.autoHideDuration ?? DEFAULT_FEEDBACK_AUTO_HIDE_DURATION;
  state.key += 1;
};

const slice = createSlice({
  name: "feedback",
  initialState: createInitialFeedbackState(),
  reducers: {
    showSuccess: (state, action: PayloadAction<string | FeedbackInput>) => {
      showFeedback(state, "success", action.payload);
    },
    showError: (state, action: PayloadAction<string | FeedbackInput>) => {
      showFeedback(state, "error", action.payload);
    },
    closeFeedback: (state) => {
      state.open = false;
    },
  },
});

export const feedbackReducer = slice.reducer;
export const FeedbackActions = slice.actions;

export const FeedbackSelectors = {
  selectFeedback: (state: AppState) => state.feedback,
};

export const __TEST__ = {
  DEFAULT_FEEDBACK_AUTO_HIDE_DURATION,
};
