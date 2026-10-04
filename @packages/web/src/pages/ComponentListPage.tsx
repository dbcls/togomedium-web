import type { SearchComponentsFacetsResponse } from "%api/searchComponentsFacets/definitions";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { H2 } from "@/components/atoms/H2.tsx";
import { ComponentCard } from "@/components/molecules/component-list/ComponentCard";
import {
  ListCountSelect,
  type ListCountOption,
} from "@/components/molecules/list-controls/ListCountSelect";
import { ListPagination } from "@/components/molecules/list-controls/ListPagination";
import { ListSearchField } from "@/components/molecules/list-controls/ListSearchField";
import { ListSelect } from "@/components/molecules/list-controls/ListSelect";
import { PageWrapper } from "@/components/wrappers/PageWrapper.tsx";
import { useComponentListSearch } from "@/hooks/useComponentListSearch";
import { usePageTitle } from "@/hooks/usePageTitle.ts";
import { componentRoleOptions } from "@/utils/componentListOptions";
import {
  componentListPageWithinTotal,
  type ComponentListSearch,
} from "@/utils/componentListSearch";

const SORT_OPTIONS: {
  id: string;
  label: string;
  sort: ComponentListSearch["sort"];
  order: ComponentListSearch["order"];
}[] = [
  {
    id: "medium_count-desc",
    label: "Medium count (highest first)",
    sort: "medium_count",
    order: "desc",
  },
  {
    id: "medium_count-asc",
    label: "Medium count (lowest first)",
    sort: "medium_count",
    order: "asc",
  },
  { id: "name-asc", label: "Standard name (A–Z)", sort: "name", order: "asc" },
  { id: "name-desc", label: "Standard name (Z–A)", sort: "name", order: "desc" },
  { id: "id-asc", label: "GMO ID (ascending)", sort: "id", order: "asc" },
  { id: "id-desc", label: "GMO ID (descending)", sort: "id", order: "desc" },
];
const PAGE_SIZES = [20, 50, 100] as const;
const withSelectedOption = (options: ListCountOption[], selected: string): ListCountOption[] =>
  selected && !options.some((option) => option.id === selected)
    ? [{ id: selected, label: selected }, ...options]
    : options;

export const ComponentListPage = () => {
  usePageTitle("All components");
  const state = useComponentListSearch();
  const { list, facets, search, countsStatus, markListRendered } = state;
  const [catalog, setCatalog] = useState<SearchComponentsFacetsResponse>();
  const displayedList =
    list.isSuccess && componentListPageWithinTotal(search, Number(list.data.total)) === search.page
      ? list.data
      : undefined;
  useEffect(() => {
    if (displayedList) markListRendered(displayedList);
  }, [displayedList, markListRendered]);
  useEffect(() => {
    if (facets.data) setCatalog(facets.data);
  }, [facets.data]);
  const choices = facets.data ?? catalog;
  const includeCounts = countsStatus === "ready";
  const roles = withSelectedOption(
    componentRoleOptions(choices?.roles ?? [], includeCounts),
    search.role,
  );
  const properties = withSelectedOption(
    (choices?.properties ?? []).map((property) => ({
      id: property.gmo_id,
      label: property.label_en || property.gmo_id,
      count: includeCounts ? property.count : undefined,
    })),
    search.property,
  );
  const total = Number(displayedList?.total ?? 0);
  const first = total === 0 ? 0 : Number(displayedList?.offset ?? 0) + 1;
  const last = Number(displayedList?.offset ?? 0) + (displayedList?.contents.length ?? 0);

  return (
    <PageWrapper>
      <section className="flex min-w-0 flex-col gap-5" aria-label="Component search">
        <H2 hasStanzaMargin={false}>All Components</H2>
        <div className="flex flex-col gap-3">
          <ListSearchField
            value={state.draftName}
            onChange={state.setDraftName}
            onSubmit={() => {
              void state.submitName();
            }}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <ListCountSelect
              label="Role"
              value={search.role || null}
              options={roles}
              countsStatus={countsStatus}
              onChange={(value) => {
                void state.setRole(value);
              }}
            />
            <ListCountSelect
              label="Property"
              value={search.property || null}
              options={properties}
              countsStatus={countsStatus}
              onChange={(value) => {
                void state.setProperty(value);
              }}
            />
            <ListSelect
              label="Sort by"
              value={`${search.sort}-${search.order}`}
              options={SORT_OPTIONS}
              onChange={(value) => {
                const option = SORT_OPTIONS.find((item) => item.id === value);
                if (option) void state.setSort(option.sort, option.order);
              }}
            />
            <ListSelect
              label="Items per page"
              value={String(search.pageSize)}
              options={PAGE_SIZES.map((size) => ({ id: String(size), label: `${size} items` }))}
              onChange={(value) => {
                const size = PAGE_SIZES.find((item) => String(item) === value);
                if (size) void state.setPageSize(size);
              }}
            />
          </div>
          {facets.isError && (
            <div>
              <Button
                variant="outline"
                size="sm"
                onPress={() => {
                  void facets.refetch();
                }}
              >
                Retry filter counts
              </Button>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Medium counts include distinct media whose recipes directly list the component. Indirect
          use through other media or solutions is excluded.
        </p>
        {list.isError ? (
          <div role="alert" className="flex flex-col items-start gap-3">
            <p>Components could not be loaded.</p>
            <Button
              variant="outline"
              onPress={() => {
                void list.refetch();
              }}
            >
              Retry components
            </Button>
          </div>
        ) : !displayedList ? (
          <p role="status">Loading components…</p>
        ) : (
          <>
            <p role="status" className="text-sm text-gray-600">
              {total === 0
                ? "0 components"
                : `${first.toLocaleString("en-US")}–${last.toLocaleString("en-US")} of ${total.toLocaleString("en-US")} components`}
            </p>
            {total === 0 ? (
              <p>No components match your search.</p>
            ) : (
              <ul className="flex flex-col gap-3" aria-label="Components">
                {displayedList.contents.map((component) => (
                  <li key={component.id}>
                    <ComponentCard component={component} />
                  </li>
                ))}
              </ul>
            )}
            {total > 0 && (
              <ListPagination
                page={search.page}
                totalItems={total}
                pageSize={search.pageSize}
                onPageChange={(page) => {
                  void state.setPage(page);
                }}
              />
            )}
          </>
        )}
      </section>
    </PageWrapper>
  );
};
