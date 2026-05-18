import {
  DEFAULT_FEEDBACK_AUTO_HIDE_DURATION,
  FeedbackActions,
} from "%stanza/stanzas/gmdb-medium-builder/state/feedback";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { describe, expect, it } from "vitest";

describe("feedback state", () => {
  it("shows success feedback", () => {
    const store = createThunkTestStore();

    store.dispatch(FeedbackActions.showSuccess("Export completed."));

    expect(store.getState().feedback).toEqual({
      open: true,
      severity: "success",
      message: "Export completed.",
      detail: undefined,
      autoHideDuration: DEFAULT_FEEDBACK_AUTO_HIDE_DURATION,
      key: 1,
    });
  });

  it("shows error feedback with detail and custom auto-hide duration", () => {
    const store = createThunkTestStore();

    store.dispatch(
      FeedbackActions.showError({
        message: "Import failed.",
        detail: "Line 8: missing solutions.",
        autoHideDuration: 8000,
      }),
    );

    expect(store.getState().feedback).toEqual({
      open: true,
      severity: "error",
      message: "Import failed.",
      detail: "Line 8: missing solutions.",
      autoHideDuration: 8000,
      key: 1,
    });
  });

  it("closes visible feedback without clearing the latest message", () => {
    const store = createThunkTestStore();

    store.dispatch(FeedbackActions.showSuccess("Export completed."));
    store.dispatch(FeedbackActions.closeFeedback());

    expect(store.getState().feedback).toMatchObject({
      open: false,
      severity: "success",
      message: "Export completed.",
    });
  });
});
