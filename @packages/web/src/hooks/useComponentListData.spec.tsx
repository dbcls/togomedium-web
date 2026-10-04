import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_COMPONENT_LIST_SEARCH } from "@/utils/componentListSearch";
import { useComponentListData } from "./useComponentListData";

const listResponse = (name = "Glucose") => ({
  contents: [
    {
      id: "GMO_000001",
      name,
      aliases: [],
      matched_names: [],
      medium_count: 3,
      roles: [],
      properties: [],
    },
  ],
  total: "1",
  limit: "20",
  offset: "0",
});
const facetsResponse = {
  role_none_count: 0,
  property_none_count: 0,
  roles: [{ gmo_id: "GMO_000002", label_en: "Carbon", parent: null, count: 1 }],
  properties: [],
};
const jsonResponse = (value: unknown) =>
  new Response(JSON.stringify(value), { headers: { "Content-Type": "application/json" } });
const setup = () => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  return { client, wrapper };
};

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("component list split queries", () => {
  it("starts facets only after the current response is rendered, and reuses them for page/sort/size", async () => {
    const fetchMock = vi.fn(async (url: string) =>
      jsonResponse(url.includes("_facets") ? facetsResponse : listResponse()),
    );
    vi.stubGlobal("fetch", fetchMock);
    const { wrapper } = setup();
    const { result, rerender } = renderHook(({ search }) => useComponentListData(search), {
      wrapper,
      initialProps: { search: DEFAULT_COMPONENT_LIST_SEARCH },
    });
    await waitFor(() => expect(result.current.list.isSuccess).toBe(true));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    act(() => result.current.markListRendered(result.current.list.data));
    await waitFor(() => expect(result.current.facets.isSuccess).toBe(true));
    rerender({ search: { ...DEFAULT_COMPONENT_LIST_SEARCH, page: 2, sort: "name", pageSize: 50 } });
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3));
    await waitFor(() => expect(result.current.list.isSuccess).toBe(true));
    act(() => result.current.markListRendered(result.current.list.data));
    expect(result.current.facets.data).toEqual(facetsResponse);
    expect(fetchMock.mock.calls.filter(([url]) => url.includes("_facets"))).toHaveLength(1);
  });
  it("keeps late list and facet responses attached to their conditions and hides stale counts", async () => {
    let resolveOldList!: (value: Response) => void;
    let resolveOldFacets!: (value: Response) => void;
    const fetchMock = vi.fn((url: string) => {
      const params = new URL(url).searchParams;
      if (params.get("name") === "old" && !url.includes("_facets"))
        return new Promise<Response>((resolve) => {
          resolveOldList = resolve;
        });
      if (params.get("name") === "first" && url.includes("_facets"))
        return new Promise<Response>((resolve) => {
          resolveOldFacets = resolve;
        });
      return Promise.resolve(
        jsonResponse(
          url.includes("_facets") ? facetsResponse : listResponse(params.get("name") ?? ""),
        ),
      );
    });
    vi.stubGlobal("fetch", fetchMock);
    const { wrapper } = setup();
    const { result, rerender } = renderHook(
      ({ name }) => useComponentListData({ ...DEFAULT_COMPONENT_LIST_SEARCH, name }),
      { wrapper, initialProps: { name: "old" } },
    );
    rerender({ name: "first" });
    await waitFor(() => expect(result.current.list.data?.contents[0].name).toBe("first"));
    act(() => result.current.markListRendered(result.current.list.data));
    await waitFor(() => expect(resolveOldFacets).toBeTypeOf("function"));
    rerender({ name: "new" });
    expect(result.current.facets.data).toBeUndefined();
    expect(result.current.countsStatus).toBe("loading");
    await waitFor(() => expect(result.current.list.data?.contents[0].name).toBe("new"));
    await act(async () => {
      resolveOldList(jsonResponse(listResponse("old")));
      resolveOldFacets(
        jsonResponse({ roles: [], properties: [], role_none_count: 0, property_none_count: 0 }),
      );
    });
    expect(result.current.list.data?.contents[0].name).toBe("new");
    expect(result.current.facets.data).toBeUndefined();
    act(() => result.current.markListRendered(result.current.list.data));
    await waitFor(() => expect(result.current.facets.data).toEqual(facetsResponse));
  });
  it("isolates failed facets and supports explicit retry without refetching the list", async () => {
    let fail = true;
    const fetchMock = vi.fn(async (url: string) =>
      url.includes("_facets") && fail
        ? new Response("failure", { status: 500 })
        : jsonResponse(url.includes("_facets") ? facetsResponse : listResponse()),
    );
    vi.stubGlobal("fetch", fetchMock);
    const { wrapper } = setup();
    const { result, rerender } = renderHook(({ search }) => useComponentListData(search), {
      wrapper,
      initialProps: { search: DEFAULT_COMPONENT_LIST_SEARCH },
    });
    await waitFor(() => expect(result.current.list.isSuccess).toBe(true));
    act(() => result.current.markListRendered(result.current.list.data));
    await waitFor(() => expect(result.current.countsStatus).toBe("error"));
    expect(result.current.list.data?.total).toBe("1");
    rerender({ search: { ...DEFAULT_COMPONENT_LIST_SEARCH, page: 2 } });
    await waitFor(() => expect(result.current.list.isSuccess).toBe(true));
    act(() => result.current.markListRendered(result.current.list.data));
    expect(fetchMock.mock.calls.filter(([url]) => url.includes("_facets"))).toHaveLength(1);
    fail = false;
    await act(async () => {
      await result.current.facets.refetch();
    });
    await waitFor(() => expect(result.current.countsStatus).toBe("ready"));
    expect(fetchMock.mock.calls.filter(([url]) => url.includes("_list"))).toHaveLength(2);
  });
  it.each([new Response("failure", { status: 500 }), jsonResponse({ contents: [] })])(
    "rejects failed or invalid list responses without starting facets",
    async (response) => {
      const fetchMock = vi.fn(async () => response);
      vi.stubGlobal("fetch", fetchMock);
      const { wrapper } = setup();
      const { result } = renderHook(() => useComponentListData(DEFAULT_COMPONENT_LIST_SEARCH), {
        wrapper,
      });
      await waitFor(() => expect(result.current.list.isError).toBe(true));
      expect(result.current.list.data).toBeUndefined();
      expect(fetchMock).toHaveBeenCalledTimes(1);
    },
  );
});
