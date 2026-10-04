import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  componentListSearchMiddleware,
  normalizeComponentListUrl,
  validateComponentListSearch,
} from "@/utils/componentListSearch";
import { useComponentListSearch } from "./useComponentListSearch";

const Harness = () => {
  const state = useComponentListSearch();
  return (
    <>
      <output data-testid="search">{JSON.stringify(state.search)}</output>
      <input
        aria-label="Name"
        value={state.draftName}
        onChange={(event) => state.setDraftName(event.target.value)}
      />
      <button
        onClick={() => {
          void state.submitName();
        }}
      >
        Search
      </button>
      <button
        onClick={() => {
          void state.setRole("GMO_000002");
        }}
      >
        Role
      </button>
      <button
        onClick={() => {
          void state.setProperty("GMO_000003");
        }}
      >
        Property
      </button>
      <button
        onClick={() => {
          void state.setSort("name", "asc");
        }}
      >
        Sort
      </button>
      <button
        onClick={() => {
          void state.setPageSize(50);
        }}
      >
        Size
      </button>
      <button
        onClick={() => {
          void state.setPage(2);
        }}
      >
        Page
      </button>
    </>
  );
};

const setup = async (entry: string, total = "200") => {
  vi.stubGlobal(
    "fetch",
    vi.fn(
      async () => new Response(JSON.stringify({ contents: [], total, limit: "20", offset: "0" })),
    ),
  );
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const root = createRootRoute({ component: Outlet });
  const component = createRoute({
    validateSearch: validateComponentListSearch,
    search: { middlewares: [componentListSearchMiddleware] },
    beforeLoad: normalizeComponentListUrl,
    getParentRoute: () => root,
    path: "/component/",
    component: Harness,
  });
  const history = createMemoryHistory({ initialEntries: [entry] });
  const router = createRouter({
    routeTree: root.addChildren([component]),
    history,
    scrollRestoration: false,
  });
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  await waitFor(() => expect(screen.getByTestId("search")).toBeTruthy());
  return { router, history };
};

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("component list navigation", () => {
  it("restores direct URL state, leaves draft unapplied, and restores it on back/forward", async () => {
    const { router, history } = await setup(
      "/component/?name=グルコース%20%26%20a&role=GMO_000002&sort=id&order=asc&page=2&pageSize=50",
    );
    expect(screen.getByRole<HTMLInputElement>("textbox", { name: "Name" }).value).toBe(
      "グルコース & a",
    );
    fireEvent.change(screen.getByRole("textbox"), { target: { value: '日本語 " + ?' } });
    expect(router.state.location.search.name).toBe("グルコース & a");
    fireEvent.click(screen.getByText("Search"));
    await waitFor(() => expect(router.state.location.search.name).toBe('日本語 " + ?'));
    expect(router.state.location.search.page).toBeUndefined();
    await act(async () => {
      history.back();
    });
    await waitFor(() =>
      expect(screen.getByRole<HTMLInputElement>("textbox").value).toBe("グルコース & a"),
    );
    await act(async () => {
      history.forward();
    });
    await waitFor(() =>
      expect(screen.getByRole<HTMLInputElement>("textbox").value).toBe('日本語 " + ?'),
    );
  });
  it.each(["Role", "Property", "Sort", "Size"])(
    "applies %s immediately and resets the page",
    async (button) => {
      const { router } = await setup("/component/?page=3");
      fireEvent.click(screen.getByText(button));
      await waitFor(() =>
        expect(JSON.parse(screen.getByTestId("search").textContent ?? "{}").page).toBe(1),
      );
      expect(router.state.location.search.page).toBeUndefined();
    },
  );
  it("replaces invalid URL values and range overflow, without adding history entries", async () => {
    const { history, router } = await setup(
      "/component/?page=900&sort=unknown&order=oops&pageSize=30&role=bad&extra=x",
      "41",
    );
    await waitFor(() => expect(router.state.location.search.page).toBe(3));
    expect(router.state.location.search).toEqual({ page: 3 });
    expect(history.length).toBe(1);
  });
  it("normalizes an empty result page to page one", async () => {
    const { router } = await setup("/component/?page=3", "0");
    await waitFor(() => expect(router.state.location.search.page).toBeUndefined());
    expect(JSON.parse(screen.getByTestId("search").textContent ?? "{}").page).toBe(1);
  });
});
