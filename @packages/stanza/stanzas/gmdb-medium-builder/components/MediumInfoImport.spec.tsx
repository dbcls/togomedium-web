import { MediumInfo } from "%stanza/stanzas/gmdb-medium-builder/components/MediumInfo";
import { GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION } from "%stanza/stanzas/gmdb-medium-builder/schema/appData";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("MediumInfo JSON import", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("replaces builder state, closes the dialog, and shows success feedback on valid import", async () => {
    const fetchMock = installFetchMock();
    fetchMock.mockResolvedValue(
      createJsonResponse([
        {
          gmo_id: "GMO_000001",
          name: "Glucose",
          japanese_name: "Glucose",
        },
      ]),
    );
    const store = createThunkTestStore();
    vi.spyOn(console, "warn").mockImplementation(() => {});

    render(
      <Provider store={store}>
        <MediumInfo />
      </Provider>,
    );

    await selectImportFile(createDraftFile());
    fireEvent.click(screen.getByRole("button", { name: "Import" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: "Upload .json" })).toBeNull();
    });

    const state = store.getState();
    expect(state.document.title).toBe("Imported medium");
    expect(state.document.description).toBe("Imported description");
    expect(state.document.solutions).toHaveLength(1);
    expect(state.entities.solutionBlocks.ids).toHaveLength(1);
    expect(state.entities.componentRows.ids).toHaveLength(1);
    expect(Object.values(state.entities.componentRows.entities)[0]).toMatchObject({
      gmoId: "GMO_000001",
      component: "Glucose",
      volume: 10,
      unit: "g",
      note: "primary",
    });
    expect(state.feedback).toMatchObject({
      open: true,
      severity: "success",
      message: "Imported imported-medium.json.",
    });
  });

  it("keeps builder contents and keeps the dialog open when JSON parsing fails", async () => {
    const fetchMock = installFetchMock();
    const store = createThunkTestStore();
    const previousBuilderState = cloneBuilderState(store.getState());

    render(
      <Provider store={store}>
        <MediumInfo />
      </Provider>,
    );

    await selectImportFile(new File(["{"], "broken.json", { type: "application/json" }));
    fireEvent.click(screen.getByRole("button", { name: "Import" }));

    await waitFor(() => {
      expect(store.getState().feedback.severity).toBe("error");
    });

    expect(screen.queryByRole("dialog", { name: "Upload .json" })).not.toBeNull();
    expect(cloneBuilderState(store.getState())).toEqual(previousBuilderState);
    expect(store.getState().feedback).toMatchObject({
      open: true,
      severity: "error",
      message: "Import failed.",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("continues import and warns when component candidates cannot be fetched", async () => {
    const fetchMock = installFetchMock();
    fetchMock.mockRejectedValue(new Error("Network unavailable."));
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const store = createThunkTestStore();

    render(
      <Provider store={store}>
        <MediumInfo />
      </Provider>,
    );

    await selectImportFile(createDraftFile());
    fireEvent.click(screen.getByRole("button", { name: "Import" }));

    await waitFor(() => {
      expect(store.getState().feedback.severity).toBe("success");
    });

    expect(store.getState().document.title).toBe("Imported medium");
    expect(Object.values(store.getState().entities.componentRows.entities)[0]).toMatchObject({
      gmoId: "GMO_000001",
      component: "Wrong name",
    });
    expect(warn).toHaveBeenCalledWith(
      "[MediumBuilderImport] Component candidates could not be fetched. GMO ID validation was skipped.",
      expect.any(Error),
    );
    expect(warn).toHaveBeenCalledWith(
      "[MediumBuilderImport] gmo-id-validation-skipped at solutions: GMO ID validation was skipped because component candidates were not provided.",
    );
  });
});

const selectImportFile = async (file: File) => {
  fireEvent.click(screen.getByRole("button", { name: "Upload .json" }));

  const dropZone = screen.getByText("Drop a JSON file here").closest("label");
  expect(dropZone).not.toBeNull();

  const input = (dropZone as HTMLLabelElement).querySelector<HTMLInputElement>(
    'input[type="file"]',
  );
  expect(input).not.toBeNull();

  fireEvent.change(input as HTMLInputElement, { target: { files: [file] } });

  await waitFor(() => {
    expect(screen.queryByText(file.name)).not.toBeNull();
  });
};

const createDraftFile = () => {
  return new File([JSON.stringify(createDraft())], "imported-medium.json", {
    type: "application/json",
  });
};

const createDraft = () => ({
  schemaVersion: GMDB_MEDIUM_BUILDER_DRAFT_SCHEMA_VERSION,
  title: "Imported medium",
  description: "Imported description",
  solutions: [
    {
      title: "Imported solution",
      description: "Imported solution description",
      components: [
        {
          gmoId: "GMO_000001",
          component: "Wrong name",
          volume: 10,
          unit: "g",
          note: "primary",
        },
      ],
    },
  ],
});

const installFetchMock = () => {
  const fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
};

const createJsonResponse = (value: unknown) => {
  return new Response(JSON.stringify(value), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};

const cloneBuilderState = (
  state: ReturnType<ReturnType<typeof createThunkTestStore>["getState"]>,
) =>
  structuredClone({
    document: state.document,
    entities: state.entities,
  });
