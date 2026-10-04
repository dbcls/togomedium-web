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
import { ComponentListPage } from "./ComponentListPage";

const component = {
  id: "GMO_000001",
  name: "Glucose",
  aliases: [],
  matched_names: [],
  medium_count: 0,
  roles: [],
  properties: [],
};
const facetData = {
  role_none_count: 0,
  property_none_count: 0,
  roles: [{ gmo_id: "GMO_000002", label_en: "Nutrient source", parent: null, count: 10 }],
  properties: [],
};
const json = (value: unknown) => new Response(JSON.stringify(value));
const listData = (url: string, total = "1") => {
  const params = new URL(url).searchParams;
  const offset = params.get("offset") ?? "0";
  return {
    contents: Number(offset) >= Number(total) ? [] : [component],
    total,
    limit: params.get("limit") ?? "20",
    offset,
  };
};
const setup = async (entry = "/component") => {
  const root = createRootRoute({ component: Outlet });
  const route = createRoute({
    getParentRoute: () => root,
    path: "/component/",
    validateSearch: validateComponentListSearch,
    search: { middlewares: [componentListSearchMiddleware] },
    beforeLoad: normalizeComponentListUrl,
    component: ComponentListPage,
  });
  const history = createMemoryHistory({ initialEntries: [entry] });
  const router = createRouter({
    routeTree: root.addChildren([route]),
    history,
    scrollRestoration: false,
  });
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  await screen.findByRole("heading", { name: "All Components" });
  return { history, client };
};
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("ComponentListPage", () => {
  it("keeps Any distinct from zero-count unassigned choices and restores them through history", async () => {
    const fetchMock = vi.fn(async (url: string) =>
      json(
        url.includes("_facets")
          ? { ...facetData, role_none_count: 0, property_none_count: 0 }
          : listData(url),
      ),
    );
    vi.stubGlobal("fetch", fetchMock);
    const { history } = await setup("/component?name=001009&page=2");
    await screen.findByRole("link", { name: "Glucose (GMO_000001)" });
    fireEvent.click(screen.getByRole("button", { name: "Any Role" }));
    fireEvent.click(await screen.findByRole("option", { name: "No roles, 0 results" }));
    await waitFor(() => expect(history.location.search).toContain("role=none"));
    expect(history.location.search).not.toContain("page=");
    fireEvent.click(screen.getByRole("button", { name: "Any Property" }));
    fireEvent.click(await screen.findByRole("option", { name: "No properties, 0 results" }));
    await waitFor(() =>
      expect(
        fetchMock.mock.calls.some(([url]) => {
          const params = new URL(url).searchParams;
          return (
            params.get("name") === "001009" &&
            params.get("role_id") === "none" &&
            params.get("property_id") === "none"
          );
        }),
      ).toBe(true),
    );
    await act(async () => {
      history.back();
    });
    await screen.findByRole("button", { name: "Any Property" });
    expect(screen.getByRole("button", { name: "No roles Role" })).toBeTruthy();
    await act(async () => {
      history.forward();
    });
    await screen.findByRole("button", { name: "No properties Property" });
    fireEvent.click(screen.getByRole("button", { name: "No roles Role" }));
    fireEvent.click(screen.getByRole("option", { name: "Any" }));
    await waitFor(() => expect(history.location.search).not.toContain("role="));
    expect(history.location.search).toContain("property=none");
  });
  it("offers a list retry after failure and waits for successful rendering before fetching facets", async () => {
    let unavailable = true;
    const fetchMock = vi.fn(async (url: string) => {
      if (url.includes("_facets")) return json(facetData);
      return unavailable ? new Response("Unavailable", { status: 503 }) : json(listData(url));
    });
    vi.stubGlobal("fetch", fetchMock);
    await setup();
    await screen.findByRole("alert");
    expect(screen.getByText("Components could not be loaded.")).toBeTruthy();
    expect(fetchMock.mock.calls.some(([url]) => url.includes("_facets"))).toBe(false);
    unavailable = false;
    fireEvent.click(screen.getByRole("button", { name: "Retry components" }));
    await screen.findByRole("link", { name: "Glucose (GMO_000001)" });
    await waitFor(() =>
      expect(fetchMock.mock.calls.filter(([url]) => url.includes("_facets"))).toHaveLength(1),
    );
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("renders cards before fetching facets and keeps cards usable if facet counts fail", async () => {
    const fetchMock = vi.fn(async (url: string) => {
      if (url.includes("_facets")) {
        expect(screen.getByRole("link", { name: "Glucose (GMO_000001)" })).toBeTruthy();
        return new Response("Unavailable", { status: 503 });
      }
      return json(listData(url));
    });
    vi.stubGlobal("fetch", fetchMock);
    await setup();
    await screen.findByRole("button", { name: "Retry filter counts" });
    expect(screen.getByRole("link", { name: "Glucose (GMO_000001)" }).getAttribute("href")).toBe(
      "/component/GMO_000001",
    );
    expect(screen.getByText("1–1 of 1 components")).toBeTruthy();
    expect(screen.queryByText("Loading counts…")).toBeNull();
  });

  it("corrects an out-of-range page before notifying that the list has rendered", async () => {
    const fetchMock = vi.fn(async (url: string) =>
      json(url.includes("_facets") ? facetData : listData(url)),
    );
    vi.stubGlobal("fetch", fetchMock);
    const { history } = await setup("/component?page=99");
    await screen.findByRole("link", { name: "Glucose (GMO_000001)" });
    await waitFor(() =>
      expect(fetchMock.mock.calls.filter(([url]) => url.includes("_facets"))).toHaveLength(1),
    );
    expect(
      fetchMock.mock.calls.map(([url]) =>
        new URL(url).pathname.endsWith("_facets")
          ? "facets"
          : new URL(url).searchParams.get("offset"),
      ),
    ).toEqual(["1960", "0", "facets"]);
    expect(history.location.search).toBe("");
  });

  it("connects sort and page-size controls without refetching facets", async () => {
    const fetchMock = vi.fn(async (url: string) =>
      json(url.includes("_facets") ? facetData : listData(url)),
    );
    vi.stubGlobal("fetch", fetchMock);
    await setup();
    await waitFor(() =>
      expect(fetchMock.mock.calls.some(([url]) => url.includes("_facets"))).toBe(true),
    );
    fireEvent.click(screen.getByRole("button", { name: "Medium count (highest first) Sort by" }));
    fireEvent.click(screen.getByRole("option", { name: "Standard name (A–Z)" }));
    await waitFor(() =>
      expect(
        fetchMock.mock.calls.some(([url]) => new URL(url).searchParams.get("sort") === "name"),
      ).toBe(true),
    );
    fireEvent.click(screen.getByRole("button", { name: "20 items Items per page" }));
    fireEvent.click(screen.getByRole("option", { name: "100 items" }));
    await waitFor(() =>
      expect(
        fetchMock.mock.calls.some(([url]) => new URL(url).searchParams.get("limit") === "100"),
      ).toBe(true),
    );
    expect(fetchMock.mock.calls.filter(([url]) => url.includes("_facets"))).toHaveLength(1);
  });

  it("retains option labels but hides previous-condition counts during a new search", async () => {
    let resolveFacets!: (response: Response) => void;
    const fetchMock = vi.fn((url: string) => {
      const params = new URL(url).searchParams;
      if (url.includes("_facets") && params.get("name") === "new")
        return new Promise<Response>((resolve) => {
          resolveFacets = resolve;
        });
      return Promise.resolve(json(url.includes("_facets") ? facetData : listData(url)));
    });
    vi.stubGlobal("fetch", fetchMock);
    await setup();
    fireEvent.click(await screen.findByRole("button", { name: "Any Role" }));
    await screen.findByRole("option", { name: "Nutrient source, 10 results" });
    fireEvent.click(screen.getByRole("option", { name: "Any" }));
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "new" } });
    fireEvent.submit(screen.getByRole("search", { name: "Name or GMO ID" }));
    await waitFor(() => expect(resolveFacets).toBeTypeOf("function"));
    fireEvent.click(screen.getByRole("button", { name: "Any Role" }));
    expect(
      screen.getByRole("option", { name: "Nutrient source, count loading" }).textContent,
    ).toContain("—");
    expect(screen.queryByRole("option", { name: "Nutrient source, 10 results" })).toBeNull();
    await act(async () => {
      resolveFacets(json({ ...facetData, roles: [{ ...facetData.roles[0], count: 0 }] }));
    });
    await screen.findByRole("option", { name: "Nutrient source, 0 results" });
  });
});
