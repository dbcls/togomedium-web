import { SolutionBlock } from "%stanza/stanzas/gmdb-medium-builder/components/SolutionBlock";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("%core/fetch/fetchAllComponents", () => ({
  fetchAllComponents: vi.fn().mockResolvedValue([]),
}));

describe("SolutionBlock", () => {
  afterEach(() => {
    cleanup();
  });

  it("edits the solution note description", () => {
    const store = createThunkTestStore();
    renderSolutionBlock(store);

    fireEvent.click(screen.getByRole("button", { name: "Note" }));
    const noteInput = screen.getByLabelText("Solution note");

    expect((noteInput as HTMLInputElement).value).toBe("desc A");

    fireEvent.change(noteInput, { target: { value: "Preparation note" } });

    expect(store.getState().entities.solutionBlocks.entities["solution-1"]?.description).toBe(
      "Preparation note",
    );
  });
});

const renderSolutionBlock = (store: ReturnType<typeof createThunkTestStore>) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SolutionBlock id="solution-1" />
      </Provider>
    </QueryClientProvider>,
  );
};
