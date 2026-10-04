import {
  PATH_SEARCH_COMPONENTS_FACETS,
  searchComponentsFacetsResponseSchema,
} from "%api/searchComponentsFacets/definitions";
import {
  PATH_SEARCH_COMPONENTS_LIST,
  searchComponentsListResponseSchema,
  type SearchComponentsListResponse,
} from "%api/searchComponentsList/definitions";
import { makeApiUrl } from "%core/network/makeApiUrl";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  componentFacetsSearchParams,
  componentListSearchParams,
  type ComponentListSearch,
} from "@/utils/componentListSearch";

const fetchComponentData = async (
  path: string,
  params: Record<string, string>,
  signal: AbortSignal,
) => {
  const response = await fetch(makeApiUrl(path, new URLSearchParams(params)), {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`Component search failed (${response.status})`);
  return response.json() as Promise<unknown>;
};

/** The page must call markListRendered(data) in an effect after rendering that response. */
export const useComponentListData = (search: ComponentListSearch) => {
  const listParams = componentListSearchParams(search);
  const facetParams = componentFacetsSearchParams(search);
  const [renderedList, markListRendered] = useState<SearchComponentsListResponse>();
  const list = useQuery({
    queryKey: ["component-list", listParams],
    queryFn: async ({ signal }) =>
      searchComponentsListResponseSchema.parse(
        await fetchComponentData(PATH_SEARCH_COMPONENTS_LIST, listParams, signal),
      ),
    staleTime: 30_000,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const facets = useQuery({
    queryKey: ["component-facets", facetParams],
    queryFn: async ({ signal }) =>
      searchComponentsFacetsResponseSchema.parse(
        await fetchComponentData(PATH_SEARCH_COMPONENTS_FACETS, facetParams, signal),
      ),
    // A failed facet query stays failed until an explicit retry, including across page changes.
    enabled: (query) =>
      query.state.status !== "error" && list.isSuccess && list.data === renderedList,
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return {
    list,
    facets,
    markListRendered,
    countsStatus: facets.isError
      ? ("error" as const)
      : facets.data
        ? ("ready" as const)
        : ("loading" as const),
  };
};
