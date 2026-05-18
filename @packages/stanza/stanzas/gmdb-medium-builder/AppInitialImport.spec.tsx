import { vi } from "vitest";

vi.mock("%stanza/stanzas/gmdb-medium-builder/components/SolutionBlock", () => ({
  SolutionBlock: ({ id }: { id: string }) => <div data-testid={"solution-block"}>{id}</div>,
}));

import App from "%stanza/stanzas/gmdb-medium-builder/App";
import { createThunkTestStore } from "%stanza/stanzas/gmdb-medium-builder/state/thunks/testUtils";
import {
  mediumDetailImportFixture,
  referencedMediumDetailImportFixture,
} from "%stanza/stanzas/gmdb-medium-builder/utils/fixtures/mediumDetailImport";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { afterEach, describe, expect, it } from "vitest";

describe("App initial medium import", () => {
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("keeps the current initial state and does not import automatically without gmId", async () => {
    const fetchMock = installFetchMock();
    const store = createThunkTestStore();
    const previousBuilderState = cloneBuilderState(store.getState());

    renderWithProviders(<App />, store);

    expect(screen.queryByText("Importing medium...")).toBeNull();
    expect(cloneBuilderState(store.getState())).toEqual(previousBuilderState);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("imports a main medium, expands references, replaces builder state, and shows success", async () => {
    installMediumDetailFetchMock();
    const store = createThunkTestStore();

    renderWithProviders(<App gmId={"GM_000001"} />, store);

    await waitFor(() => {
      expect(store.getState().feedback).toMatchObject({
        open: true,
        severity: "success",
        message: "Imported GM_000001.",
      });
    });

    const state = store.getState();
    expect(state.document.title).toBe("Imported NBRC medium");
    expect(state.document.description).toBe("pH: 7.2");
    expect(state.document.provenance).toEqual({
      importSourceGmId: "GM_000001",
      originalMediaId: "NBRC 123",
      sourceUrl: "https://example.org/medium/GM_000001",
    });
    expect(state.document.solutions).toHaveLength(3);
    expect(state.entities.solutionBlocks.entities[state.document.solutions[2]]).toMatchObject({
      title: "Trace element solution",
      description: "Filter-sterilize referenced trace solution.",
    });
    expect(Object.values(state.entities.componentRows.entities)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          component: "ZnSO4",
          volume: 0.1,
          unit: "g/L",
          concentrationValue: null,
          concentrationUnit: "",
          note: "",
        }),
        expect.objectContaining({
          component: "Glucose",
          concentrationValue: 55.5,
          concentrationUnit: "mM",
          note: "",
        }),
      ]),
    );
    expect(state.feedback).toMatchObject({
      open: true,
      severity: "success",
      message: "Imported GM_000001.",
    });
    expect(screen.queryByText("Imported GM_000001.")).not.toBeNull();
  });

  it("shows a loading status while the initial import is running", async () => {
    const mainMedium = createDeferred<Response>();
    const fetchMock = installFetchMock();
    fetchMock.mockReturnValue(mainMedium.promise);
    const store = createThunkTestStore();

    renderWithProviders(<App gmId={"GM_000001"} />, store);

    expect(await screen.findByText("Importing medium...")).not.toBeNull();
    expect(screen.queryByRole("progressbar")).not.toBeNull();

    mainMedium.resolve(createJsonResponse(mediumDetailImportFixture));
  });

  it("shows error feedback and keeps state when the main medium cannot be fetched", async () => {
    const fetchMock = installFetchMock();
    fetchMock.mockResolvedValue(new Response(null, { status: 500, statusText: "Server Error" }));
    const store = createThunkTestStore();
    const previousBuilderState = cloneBuilderState(store.getState());

    renderWithProviders(<App gmId={"GM_000001"} />, store);

    await waitFor(() => {
      expect(store.getState().feedback.severity).toBe("error");
    });

    expect(cloneBuilderState(store.getState())).toEqual(previousBuilderState);
    expect(store.getState().feedback).toMatchObject({
      open: true,
      severity: "error",
      message: "Import failed.",
      detail: "Medium GM_000001 could not be fetched.",
    });
  });

  it("shows error feedback and keeps state when a reference medium cannot be fetched", async () => {
    installMediumDetailFetchMock({
      GM_000999: new Response(null, { status: 500, statusText: "Server Error" }),
    });
    const store = createThunkTestStore();
    const previousBuilderState = cloneBuilderState(store.getState());

    renderWithProviders(<App gmId={"GM_000001"} />, store);

    await waitFor(() => {
      expect(store.getState().feedback.severity).toBe("error");
    });

    expect(cloneBuilderState(store.getState())).toEqual(previousBuilderState);
    expect(store.getState().feedback).toMatchObject({
      open: true,
      severity: "error",
      message: "Import failed.",
      detail: "Reference medium GM_000999 could not be fetched.",
    });
  });

  it("shows error feedback and keeps state when the referenced table is missing", async () => {
    const referenceWithoutTargetTable = structuredClone(referencedMediumDetailImportFixture);
    referenceWithoutTargetTable.components = referenceWithoutTargetTable.components.filter(
      (table) => table.subcomponent_name !== "Trace element solution",
    );
    installMediumDetailFetchMock({
      GM_000999: createJsonResponse(referenceWithoutTargetTable),
    });
    const store = createThunkTestStore();
    const previousBuilderState = cloneBuilderState(store.getState());

    renderWithProviders(<App gmId={"GM_000001"} />, store);

    await waitFor(() => {
      expect(store.getState().feedback.severity).toBe("error");
    });

    expect(cloneBuilderState(store.getState())).toEqual(previousBuilderState);
    expect(store.getState().feedback).toMatchObject({
      open: true,
      severity: "error",
      message: "Import failed.",
      detail: 'Reference medium GM_000999 does not include table "Trace element solution".',
    });
  });
});

const renderWithProviders = (
  children: ReactElement,
  store: ReturnType<typeof createThunkTestStore>,
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>,
  );
};

const installMediumDetailFetchMock = (overrides: Record<string, Response> = {}) => {
  const fetchMock = installFetchMock();

  fetchMock.mockImplementation(async (_url: string, options?: RequestInit) => {
    const gmId = getGmIdFromRequest(options);

    if (overrides[gmId]) {
      return overrides[gmId];
    }

    if (gmId === "GM_000001") {
      return createJsonResponse(mediumDetailImportFixture);
    }

    if (gmId === "GM_000999") {
      return createJsonResponse(referencedMediumDetailImportFixture);
    }

    return new Response(null, { status: 404, statusText: "Not Found" });
  });

  return fetchMock;
};

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

const getGmIdFromRequest = (options?: RequestInit) => {
  const body = options?.body;

  if (typeof body !== "string") {
    return "";
  }

  return new URLSearchParams(body).get("gm_id") ?? "";
};

const cloneBuilderState = (
  state: ReturnType<ReturnType<typeof createThunkTestStore>["getState"]>,
) =>
  structuredClone({
    document: state.document,
    entities: state.entities,
  });

const createDeferred = <T,>() => {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return { promise, resolve, reject };
};
