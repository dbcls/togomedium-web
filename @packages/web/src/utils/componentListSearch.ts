import type { SearchComponentsFacetsParams } from "%api/searchComponentsFacets/definitions";
import type { SearchComponentsListParams } from "%api/searchComponentsList/definitions";
import {
  defaultStringifySearch,
  redirect,
  stripSearchParams,
  type SearchMiddleware,
} from "@tanstack/react-router";

export type ComponentListSearch = {
  name: string;
  role: string;
  property: string;
  sort: SearchComponentsListParams["sort"];
  order: SearchComponentsListParams["order"];
  page: number;
  pageSize: 20 | 50 | 100;
};

export const DEFAULT_COMPONENT_LIST_SEARCH: ComponentListSearch = {
  name: "",
  role: "",
  property: "",
  sort: "medium_count",
  order: "desc",
  page: 1,
  pageSize: 20,
};

const parsePositiveInteger = (value: unknown) => {
  if (typeof value !== "string" && typeof value !== "number") return undefined;
  if (!/^[1-9][0-9]*$/.test(String(value))) return undefined;
  const number = Number(value);
  return Number.isSafeInteger(number) ? number : undefined;
};

export const validateComponentListSearch = (
  input: Record<string, unknown>,
): ComponentListSearch => {
  const pageSize = parsePositiveInteger(input.pageSize);
  const size = pageSize === 50 || pageSize === 100 ? pageSize : 20;
  const page = parsePositiveInteger(input.page) ?? 1;
  return {
    name:
      typeof input.name === "string"
        ? input.name
        : typeof input.name === "number" || typeof input.name === "boolean"
          ? String(input.name)
          : "",
    role: typeof input.role === "string" && /^GMO_[0-9]{6}$/.test(input.role) ? input.role : "",
    property:
      typeof input.property === "string" && /^GMO_[0-9]{6}$/.test(input.property)
        ? input.property
        : "",
    sort: input.sort === "name" || input.sort === "id" ? input.sort : "medium_count",
    order: input.order === "asc" ? "asc" : "desc",
    page: Number.isSafeInteger((page - 1) * size) ? page : 1,
    pageSize: size,
  };
};

export const componentListSearchParams = (
  search: ComponentListSearch,
): SearchComponentsListParams => ({
  ...componentFacetsSearchParams(search),
  sort: search.sort,
  order: search.order,
  limit: String(search.pageSize),
  offset: String((search.page - 1) * search.pageSize),
});

export const componentFacetsSearchParams = (
  search: ComponentListSearch,
): SearchComponentsFacetsParams => ({
  name: search.name,
  role_id: search.role,
  property_id: search.property,
});

const compactComponentListSearch = (search: ComponentListSearch) =>
  Object.fromEntries(
    Object.entries(search).filter(
      ([key, value]) => value !== DEFAULT_COMPONENT_LIST_SEARCH[key as keyof ComponentListSearch],
    ),
  );

export const canonicalComponentListSearch = (search: ComponentListSearch) =>
  defaultStringifySearch(compactComponentListSearch(search));

const stripDefaults = stripSearchParams<ComponentListSearch>(DEFAULT_COMPONENT_LIST_SEARCH);
export const componentListSearchMiddleware: SearchMiddleware<ComponentListSearch> = (context) =>
  stripDefaults({
    ...context,
    next: (search) => validateComponentListSearch(context.next(search)),
  });

export const normalizeComponentListUrl = ({
  search,
  location,
}: {
  search: Record<string, unknown>;
  location: { searchStr: string };
}) => {
  const normalized = validateComponentListSearch(search);
  if (!isCanonicalComponentListSearch(location.searchStr, normalized))
    throw redirect({ to: "/component", search: normalized, replace: true });
};

export const isCanonicalComponentListSearch = (searchStr: string, search: ComponentListSearch) => {
  const actual = new URLSearchParams(searchStr);
  const expected = new URLSearchParams(canonicalComponentListSearch(search));
  actual.sort();
  expected.sort();
  return actual.toString() === expected.toString();
};

export const componentListPageWithinTotal = (search: ComponentListSearch, total: number) =>
  Math.min(search.page, Math.max(1, Math.ceil(total / search.pageSize)));
