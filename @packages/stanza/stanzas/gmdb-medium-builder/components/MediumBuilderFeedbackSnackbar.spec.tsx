import { MediumBuilderFeedbackSnackbar } from "%stanza/stanzas/gmdb-medium-builder/components/MediumBuilderFeedbackSnackbar";
import { FeedbackActions } from "%stanza/stanzas/gmdb-medium-builder/state/feedback";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("MediumBuilderFeedbackSnackbar", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("renders success feedback", () => {
    const store = createThunkTestStore();
    store.dispatch(FeedbackActions.showSuccess("Export completed."));

    render(
      <Provider store={store}>
        <MediumBuilderFeedbackSnackbar />
      </Provider>,
    );

    expect(screen.queryByText("Export completed.")).not.toBeNull();
    expect(screen.queryByRole("alert")).not.toBeNull();
  });

  it("renders error feedback detail", () => {
    const store = createThunkTestStore();
    store.dispatch(
      FeedbackActions.showError({
        message: "Import failed.",
        detail: "Line 8: missing solutions.",
      }),
    );

    render(
      <Provider store={store}>
        <MediumBuilderFeedbackSnackbar />
      </Provider>,
    );

    expect(screen.queryByText("Import failed.")).not.toBeNull();
    expect(screen.queryByText("Line 8: missing solutions.")).not.toBeNull();
  });

  it("closes feedback from the alert close button", () => {
    const store = createThunkTestStore();
    store.dispatch(FeedbackActions.showSuccess("Export completed."));

    render(
      <Provider store={store}>
        <MediumBuilderFeedbackSnackbar />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(store.getState().feedback.open).toBe(false);
  });

  it("auto-hides feedback after its configured duration", () => {
    vi.useFakeTimers();

    const store = createThunkTestStore();
    store.dispatch(
      FeedbackActions.showError({
        message: "Export failed.",
        autoHideDuration: 1000,
      }),
    );

    render(
      <Provider store={store}>
        <MediumBuilderFeedbackSnackbar />
      </Provider>,
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(store.getState().feedback.open).toBe(false);
  });
});
