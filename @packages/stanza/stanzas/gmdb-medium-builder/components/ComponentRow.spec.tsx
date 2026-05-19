import { ComponentRow } from "%stanza/stanzas/gmdb-medium-builder/components/ComponentRow";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("%core/fetch/fetchAllComponents", () => ({
  fetchAllComponents: vi.fn().mockResolvedValue([
    {
      gmo_id: "GMO_000001",
      name: "Glucose",
    },
    {
      gmo_id: "GMO_000002",
      name: "Bacto &trade; Yeast extract",
    },
  ]),
}));

describe("ComponentRow", () => {
  afterEach(() => {
    cleanup();
  });

  it("keeps empty and zero volume values distinct in state", () => {
    const store = createThunkTestStore();
    renderComponentRow(store);

    const volumeInput = screen.getByLabelText("Volume");

    fireEvent.change(volumeInput, { target: { value: "" } });
    expect(store.getState().entities.componentRows.entities["component-row-1"]?.volume).toBeNull();
    expect((volumeInput as HTMLInputElement).value).toBe("");

    fireEvent.change(volumeInput, { target: { value: "0" } });
    expect(store.getState().entities.componentRows.entities["component-row-1"]?.volume).toBe(0);
    expect((volumeInput as HTMLInputElement).value).toBe("0");
  });

  it("edits free-solo unit, concentration value, and free-solo concentration unit", () => {
    const store = createThunkTestStore();
    renderComponentRow(store);

    fireEvent.change(screen.getByLabelText("Unit"), { target: { value: "custom spoon" } });
    fireEvent.change(screen.getByLabelText("Concentration"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Concentration unit"), {
      target: { value: "custom molarity" },
    });

    expect(store.getState().entities.componentRows.entities["component-row-1"]).toMatchObject({
      unit: "custom spoon",
      concentrationValue: null,
      concentrationUnit: "custom molarity",
    });

    fireEvent.change(screen.getByLabelText("Concentration"), { target: { value: "0" } });
    expect(
      store.getState().entities.componentRows.entities["component-row-1"]?.concentrationValue,
    ).toBe(0);
  });

  it("decodes HTML entities in component options before displaying and selecting them", async () => {
    const store = createThunkTestStore();
    renderComponentRow(store);

    const componentInput = screen.getByLabelText("Component");
    fireEvent.change(componentInput, { target: { value: "Bacto" } });

    const option = await screen.findByText("Bacto \u2122 Yeast extract");
    expect(screen.queryByText("Bacto &trade; Yeast extract")).toBeNull();

    fireEvent.click(option);

    await waitFor(() => {
      expect(store.getState().entities.componentRows.entities["component-row-1"]).toMatchObject({
        gmoId: "GMO_000002",
        component: "Bacto \u2122 Yeast extract",
      });
    });
  });
});

const renderComponentRow = (store: ReturnType<typeof createThunkTestStore>) => {
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
        <ComponentRow id="component-row-1" solutionBlockId="solution-1" />
      </Provider>
    </QueryClientProvider>,
  );
};
