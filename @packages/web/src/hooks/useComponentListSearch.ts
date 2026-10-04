import { getRouteApi } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  canonicalComponentListSearch,
  componentListPageWithinTotal,
  type ComponentListSearch,
} from "@/utils/componentListSearch";
import { useComponentListData } from "./useComponentListData";

const route = getRouteApi("/component/");

/** URL state and draft input, ready for the component list page to consume. */
export const useComponentListSearch = () => {
  const search = route.useSearch();
  const navigate = route.useNavigate();
  const locationKey = canonicalComponentListSearch(search);
  const [draft, setDraft] = useState({ locationKey, name: search.name });
  const data = useComponentListData(search);

  // Restore the input on history navigation, even when only the page or sorting changed.
  if (draft.locationKey !== locationKey) setDraft({ locationKey, name: search.name });

  useEffect(() => {
    if (!data.list.data) return;
    const page = componentListPageWithinTotal(search, Number(data.list.data.total));
    if (page !== search.page) void navigate({ search: { ...search, page }, replace: true });
  }, [data.list.data, search, navigate]);

  const updateSearch = (patch: Partial<ComponentListSearch>) =>
    navigate({ search: (previous) => ({ ...previous, ...patch, page: 1 }) });
  return {
    ...data,
    search,
    draftName: draft.locationKey === locationKey ? draft.name : search.name,
    setDraftName: (name: string) => setDraft({ locationKey, name }),
    submitName: (name = draft.name) => updateSearch({ name }),
    setRole: (role: string | null) => updateSearch({ role: role ?? "" }),
    setProperty: (property: string | null) => updateSearch({ property: property ?? "" }),
    setSort: (sort: ComponentListSearch["sort"], order: ComponentListSearch["order"]) =>
      updateSearch({ sort, order }),
    setPageSize: (pageSize: ComponentListSearch["pageSize"]) => updateSearch({ pageSize }),
    setPage: (page: number) => navigate({ search: (previous) => ({ ...previous, page }) }),
  };
};
