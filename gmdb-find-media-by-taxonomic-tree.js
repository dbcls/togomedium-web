import { l as lodash_debounce, d as defineStanzaElement } from './stanza-0294ba58.js';
import { S as Subscribable, l as notifyManager, c as shallowEqualObjects, a1 as replaceEqualDeep, u as useQueryClient, m as reactExports, n as noop, v as atom, x as useSetAtom, w as useAtomValue, s as styled, T as THEME, j as jsx, a as jsxs, b as TogoMediumReactStanza } from './StanzaReactProvider-6021d3e7.js';
import { a as array, o as object, s as string, n as number, m as makeApiUrl, g as getData } from './makeApiUrl-bc69b05b.js';
import { c as createListApiResponseSchema, l as listApiLinkSchema, a as createListApiParamsSchema, C as Checkbox, u as useMediaPaginationState, d as useQueryDataMutators, b as useFoundMediaMutators, e as useIsMediaLoadingMutators, f as useMediaPaginationMutators, n as nullListResponse, Q as QueryPane, M as MediaPane, S as SubPane, A as AppWrapper } from './ListApi-bd743e49.js';
import { P as PATH_LIST_MEDIA_OF_TAXONS } from './definitions-09faafc6.js';
import { Q as QueryObserver, a as useIsRestoring, b as useQueryErrorResetBoundary, e as ensureSuspenseTimers, c as ensurePreventErrorBoundaryRetry, d as useClearResetErrorBoundary, s as shouldSuspend, f as fetchOptimistic, g as getHasError, u as useQuery } from './useQuery-c819e3b3.js';
import { T as TextField, A as Autocomplete } from './TextField-95122230.js';
import { B as Box } from './Box-fb1fffc6.js';
import { g as getLinkTarget, m as makeLinkPath, b as PATH_TAXON } from './getLinkTarget-9ee27b52.js';
import { I as IconLoading, a as IconCompact, b as IconExpand, c as IconNoChildren } from './icons-0f23341a.js';
import { T as Tooltip } from './Tooltip-805a9746.js';
import { i as isArray } from './isArray-56c7d056.js';
import { L as LoadingCover } from './LoadingCover-3d9f5272.js';
import './Select-a2b2ad7a.js';
import './useSlotProps-42393a51.js';
import './CircularProgress-0dc9c54d.js';
import './Grow-d6a16e65.js';
import './createSvgIcon-a7ac74f6.js';

// src/queriesObserver.ts
function difference(array1, array2) {
  const excludeSet = new Set(array2);
  return array1.filter((x) => !excludeSet.has(x));
}
function replaceAt(array, index, value) {
  const copy = array.slice(0);
  copy[index] = value;
  return copy;
}
var QueriesObserver = class extends Subscribable {
  #client;
  #result;
  #queries;
  #options;
  #observers;
  #combinedResult;
  #lastCombine;
  #lastResult;
  #lastQueryHashes;
  #observerMatches = [];
  constructor(client, queries, options) {
    super();
    this.#client = client;
    this.#options = options;
    this.#queries = [];
    this.#observers = [];
    this.#result = [];
    this.setQueries(queries);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      this.#observers.forEach((observer) => {
        observer.subscribe((result) => {
          this.#onUpdate(observer, result);
        });
      });
    }
  }
  onUnsubscribe() {
    if (!this.listeners.size) {
      this.destroy();
    }
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    this.#observers.forEach((observer) => {
      observer.destroy();
    });
  }
  setQueries(queries, options) {
    this.#queries = queries;
    this.#options = options;
    notifyManager.batch(() => {
      const prevObservers = this.#observers;
      const newObserverMatches = this.#findMatchingObservers(this.#queries);
      newObserverMatches.forEach(
        (match) => match.observer.setOptions(match.defaultedQueryOptions)
      );
      const newObservers = newObserverMatches.map((match) => match.observer);
      const newResult = newObservers.map(
        (observer) => observer.getCurrentResult()
      );
      const hasLengthChange = prevObservers.length !== newObservers.length;
      const hasIndexChange = newObservers.some(
        (observer, index) => observer !== prevObservers[index]
      );
      const hasStructuralChange = hasLengthChange || hasIndexChange;
      const hasResultChange = hasStructuralChange ? true : newResult.some((result, index) => {
        const prev = this.#result[index];
        return !prev || !shallowEqualObjects(result, prev);
      });
      if (!hasStructuralChange && !hasResultChange) return;
      if (hasStructuralChange) {
        this.#observerMatches = newObserverMatches;
        this.#observers = newObservers;
      }
      this.#result = newResult;
      if (!this.hasListeners()) return;
      if (hasStructuralChange) {
        difference(prevObservers, newObservers).forEach((observer) => {
          observer.destroy();
        });
        difference(newObservers, prevObservers).forEach((observer) => {
          observer.subscribe((result) => {
            this.#onUpdate(observer, result);
          });
        });
      }
      this.#notify();
    });
  }
  getCurrentResult() {
    return this.#result;
  }
  getQueries() {
    return this.#observers.map((observer) => observer.getCurrentQuery());
  }
  getObservers() {
    return this.#observers;
  }
  getOptimisticResult(queries, combine) {
    const matches = this.#findMatchingObservers(queries);
    const result = matches.map(
      (match) => match.observer.getOptimisticResult(match.defaultedQueryOptions)
    );
    const queryHashes = matches.map(
      (match) => match.defaultedQueryOptions.queryHash
    );
    return [
      result,
      (r) => {
        return this.#combineResult(r ?? result, combine, queryHashes);
      },
      () => {
        return this.#trackResult(result, matches);
      }
    ];
  }
  #trackResult(result, matches) {
    return matches.map((match, index) => {
      const observerResult = result[index];
      return !match.defaultedQueryOptions.notifyOnChangeProps ? match.observer.trackResult(observerResult, (accessedProp) => {
        matches.forEach((m) => {
          m.observer.trackProp(accessedProp);
        });
      }) : observerResult;
    });
  }
  #combineResult(input, combine, queryHashes) {
    if (combine) {
      const lastHashes = this.#lastQueryHashes;
      const queryHashesChanged = queryHashes !== void 0 && lastHashes !== void 0 && (lastHashes.length !== queryHashes.length || queryHashes.some((hash, i) => hash !== lastHashes[i]));
      if (!this.#combinedResult || this.#result !== this.#lastResult || queryHashesChanged || combine !== this.#lastCombine) {
        this.#lastCombine = combine;
        this.#lastResult = this.#result;
        if (queryHashes !== void 0) {
          this.#lastQueryHashes = queryHashes;
        }
        this.#combinedResult = replaceEqualDeep(
          this.#combinedResult,
          combine(input)
        );
      }
      return this.#combinedResult;
    }
    return input;
  }
  #findMatchingObservers(queries) {
    const prevObserversMap = /* @__PURE__ */ new Map();
    this.#observers.forEach((observer) => {
      const key = observer.options.queryHash;
      if (!key) return;
      const previousObservers = prevObserversMap.get(key);
      if (previousObservers) {
        previousObservers.push(observer);
      } else {
        prevObserversMap.set(key, [observer]);
      }
    });
    const observers = [];
    queries.forEach((options) => {
      const defaultedOptions = this.#client.defaultQueryOptions(options);
      const match = prevObserversMap.get(defaultedOptions.queryHash)?.shift();
      const observer = match ?? new QueryObserver(this.#client, defaultedOptions);
      observers.push({
        defaultedQueryOptions: defaultedOptions,
        observer
      });
    });
    return observers;
  }
  #onUpdate(observer, result) {
    const index = this.#observers.indexOf(observer);
    if (index !== -1) {
      this.#result = replaceAt(this.#result, index, result);
      this.#notify();
    }
  }
  #notify() {
    if (this.hasListeners()) {
      const previousResult = this.#combinedResult;
      const newTracked = this.#trackResult(this.#result, this.#observerMatches);
      const newResult = this.#combineResult(newTracked, this.#options?.combine);
      if (previousResult !== newResult) {
        notifyManager.batch(() => {
          this.listeners.forEach((listener) => {
            listener(this.#result);
          });
        });
      }
    }
  }
};

function useQueries({
  queries,
  ...options
}, queryClient) {
  const client = useQueryClient(queryClient);
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const defaultedQueries = reactExports.useMemo(
    () => queries.map((opts) => {
      const defaultedOptions = client.defaultQueryOptions(
        opts
      );
      defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
      return defaultedOptions;
    }),
    [queries, client, isRestoring]
  );
  defaultedQueries.forEach((queryOptions) => {
    ensureSuspenseTimers(queryOptions);
    const query = client.getQueryCache().get(queryOptions.queryHash);
    ensurePreventErrorBoundaryRetry(queryOptions, errorResetBoundary, query);
  });
  useClearResetErrorBoundary(errorResetBoundary);
  const [observer] = reactExports.useState(
    () => new QueriesObserver(
      client,
      defaultedQueries,
      options
    )
  );
  const [optimisticResult, getCombinedResult, trackResult] = observer.getOptimisticResult(
    defaultedQueries,
    options.combine
  );
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop,
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setQueries(
      defaultedQueries,
      options
    );
  }, [defaultedQueries, options, observer]);
  const shouldAtLeastOneSuspend = optimisticResult.some(
    (result, index) => shouldSuspend(defaultedQueries[index], result)
  );
  const suspensePromises = shouldAtLeastOneSuspend ? optimisticResult.flatMap((result, index) => {
    const opts = defaultedQueries[index];
    if (opts && shouldSuspend(opts, result)) {
      const queryObserver = new QueryObserver(client, opts);
      return fetchOptimistic(opts, queryObserver, errorResetBoundary);
    }
    return [];
  }) : [];
  if (suspensePromises.length > 0) {
    throw Promise.all(suspensePromises);
  }
  const firstSingleResultWhichShouldThrow = optimisticResult.find(
    (result, index) => {
      const query = defaultedQueries[index];
      return query && getHasError({
        result,
        errorResetBoundary,
        throwOnError: query.throwOnError,
        query: client.getQueryCache().get(query.queryHash),
        suspense: query.suspense
      });
    }
  );
  if (firstSingleResultWhichShouldThrow?.error) {
    throw firstSingleResultWhichShouldThrow.error;
  }
  return getCombinedResult(trackResult());
}

const shadowRootAtom = atom(null);
const useShadowRootState = () => {
    return useAtomValue(shadowRootAtom);
};
const useShadowRootMutators = () => {
    const setter = useSetAtom(shadowRootAtom);
    const setShadowRoot = (shadowRoot) => setter(shadowRoot);
    return { setShadowRoot };
};

array(object({
    tax_id: string(),
    name: string(),
    rank: string(),
}));
object({
    tax_id: string(),
});
const PATH_GTDB_TAXON_ANCESTORS = "/gmdb_gtdb_taxonomy_ancestors";

object({
    items: array(object({
        tax_id: string(),
        name: string(),
        rank: string(),
    })),
});
object({
    tax_id: string(),
});
const PATH_GTDB_TAXON_CHILDREN = "/gmdb_gtdb_taxonomy_children";

array(object({
    tax_id: string(),
    name: string(),
    rank: string(),
}));
object({
    q: string(),
    max: number().int(),
});
const PATH_GTDB_TAXON_SEARCH_BY_NAME = "/gmdb_gtdb_taxonomy_search_by_name";

const PATH_LIST_MEDIA_OF_GTDB_TAXONS = "/gmdb_media_by_gtdb_taxon";
createListApiResponseSchema(object({
    name: string(),
    original_media_id: string(),
    media_id: listApiLinkSchema,
}));
createListApiParamsSchema({
    tax_id: string(),
});

const taxonAncestorsItemSchema = object({
    tax_id: string(),
    name: string(),
    rank: string(),
});
array(taxonAncestorsItemSchema);
object({
    tax_id: string(),
});
const PATH_TAXON_ANCESTORS = "/gmdb_taxonomy_ancestors";

const taxonChildrenItemSchema = object({
    tax_id: string(),
    name: string(),
    rank: string(),
});
array(taxonChildrenItemSchema);
object({
    tax_id: string(),
});
const PATH_TAXON_CHILDREN = "/gmdb_taxonomy_children";

const taxonSearchByNameItemSchema = object({
    tax_id: string(),
    name: string(),
    rank: string(),
});
array(taxonSearchByNameItemSchema);
object({
    q: string().min(4),
    max: number(),
});
const PATH_TAXON_SEARCH_BY_NAME = "/gmdb_taxonomy_search_by_name";

const taxonomyTypeAtom = atom("NCBI");
const useTaxonomyTypeMutators = () => {
    const setApiType = useSetAtom(taxonomyTypeAtom);
    return { setApiType };
};
const useTaxonomyType = () => {
    return useAtomValue(taxonomyTypeAtom);
};
const useTaxonSearchApi = () => {
    const apiType = useAtomValue(taxonomyTypeAtom);
    const url = makeApiUrl(apiType === "GTDB" ? PATH_GTDB_TAXON_SEARCH_BY_NAME : PATH_TAXON_SEARCH_BY_NAME);
    return { type: apiType, url };
};
const useTreeApi = () => {
    const apiType = useAtomValue(taxonomyTypeAtom);
    const url = makeApiUrl(apiType === "GTDB" ? PATH_GTDB_TAXON_CHILDREN : PATH_TAXON_CHILDREN);
    return { type: apiType, url };
};
const useTaxonAncestorsApi = () => {
    const apiType = useAtomValue(taxonomyTypeAtom);
    const url = makeApiUrl(apiType === "GTDB" ? PATH_GTDB_TAXON_ANCESTORS : PATH_TAXON_ANCESTORS);
    return { type: apiType, url };
};
const useListMediaOfTaxonsApi = () => {
    const apiType = useAtomValue(taxonomyTypeAtom);
    const url = makeApiUrl(apiType === "GTDB" ? PATH_LIST_MEDIA_OF_GTDB_TAXONS : PATH_LIST_MEDIA_OF_TAXONS);
    return { type: apiType, url };
};

function useUnmount(func) {
  const funcRef = reactExports.useRef(func);
  funcRef.current = func;
  reactExports.useEffect(
    () => () => {
      funcRef.current();
    },
    []
  );
}

// src/useDebounceCallback/useDebounceCallback.ts
function useDebounceCallback(func, delay = 500, options) {
  const debouncedFunc = reactExports.useRef();
  useUnmount(() => {
    if (debouncedFunc.current) {
      debouncedFunc.current.cancel();
    }
  });
  const debounced = reactExports.useMemo(() => {
    const debouncedFuncInstance = lodash_debounce(func, delay, options);
    const wrappedFunc = (...args) => {
      return debouncedFuncInstance(...args);
    };
    wrappedFunc.cancel = () => {
      debouncedFuncInstance.cancel();
    };
    wrappedFunc.isPending = () => {
      return !!debouncedFunc.current;
    };
    wrappedFunc.flush = () => {
      return debouncedFuncInstance.flush();
    };
    return wrappedFunc;
  }, [func, delay, options]);
  reactExports.useEffect(() => {
    debouncedFunc.current = lodash_debounce(func, delay, options);
  }, [func, delay, options]);
  return debounced;
}
function useDebounceValue(initialValue, delay, options) {
  const eq = (options == null ? void 0 : options.equalityFn) ?? ((left, right) => left === right);
  const unwrappedInitialValue = initialValue instanceof Function ? initialValue() : initialValue;
  const [debouncedValue, setDebouncedValue] = reactExports.useState(unwrappedInitialValue);
  const previousValueRef = reactExports.useRef(unwrappedInitialValue);
  const updateDebouncedValue = useDebounceCallback(
    setDebouncedValue,
    delay,
    options
  );
  if (!eq(previousValueRef.current, unwrappedInitialValue)) {
    updateDebouncedValue(unwrappedInitialValue);
    previousValueRef.current = unwrappedInitialValue;
  }
  return [debouncedValue, updateDebouncedValue];
}

const useTaxonChildrenSearch = () => {
    const [debouncedValue, setValue] = useDebounceValue("", 500);
    const { url, type } = useTaxonSearchApi();
    const { data, isFetching, isError } = useQuery({
        queryKey: ["taxon_search", type, debouncedValue],
        queryFn: async () => {
            if (debouncedValue.length <= 3)
                return [];
            const response = await getData(url, {
                q: debouncedValue,
                max: 100,
            });
            return response.body ?? [];
        },
        staleTime: Infinity,
        placeholderData: [],
    });
    const optionsText = reactExports.useMemo(() => {
        switch (true) {
            case debouncedValue.length <= 3:
                return "Type at least 4 characters";
            case isFetching:
                return "Loading...";
            case isError:
                return "Error fetching data";
            case !data?.length:
                return "No results found";
            default:
                return "";
        }
    }, [isFetching, debouncedValue, data, isError]);
    const options = data ?? [];
    return { options, setValue, optionsText };
};
const TaxonInput = ({ onChange }) => {
    const { options, setValue, optionsText } = useTaxonChildrenSearch();
    const taxonomyType = useTaxonomyType();
    const showId = reactExports.useMemo(() => {
        return taxonomyType === "NCBI";
    }, [taxonomyType]);
    return (jsx(Autocomplete, { options: options, disablePortal: true, filterOptions: (options, _params) => options, getOptionLabel: (option) => option.name, renderInput: (params) => jsx(TextField, { ...params, label: "Search taxon by name" }), onInputChange: (e, v) => {
            setValue(v);
        }, onSelect: (e) => {
            // console.log("onSelect", e);
        }, onChange: (e, v) => {
            onChange(v ? v.tax_id : null);
        }, renderTags: () => null, renderOption: (props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (jsx("li", { ...optionProps, children: jsxs(Box, { sx: { display: "flex", gap: 1, alignItems: "baseline" }, children: [jsx(TagTip$1, { children: option.rank }), showId && jsxs(TaxId, { children: ["[tax_id:", option.tax_id, "]"] }), jsx("span", { children: option.name })] }) }, key));
        }, noOptionsText: optionsText }));
};
const TagTip$1 = styled("div")({
    fontSize: 12,
    backgroundColor: THEME.COLOR.GRAY400,
    color: THEME.COLOR.WHITE,
    borderRadius: THEME.ROUND.BASE,
    paddingBlock: 4,
    paddingInline: 6,
});
const TaxId = styled("span")({
    fontSize: 13,
});

const TreeBranchView = ({ label, linkString, linkURL, id, check, tag, isOpen, onClickCheck, onToggleChildren, children, toolTipLabel = "", toggle, isHighlighted = false, showId = true, }) => {
    return (jsxs(Wrapper, { id: "branch-" + id, children: [jsxs(Inner, { className: isHighlighted ? "highlighted" : "", children: [jsxs(Left, { children: [jsx("span", { onClick: () => {
                                    if (toggle === "loading" || toggle === "none")
                                        return;
                                    onToggleChildren(id);
                                }, children: jsx(ToggleIcon, { status: toggle }) }), jsx(Tooltip, { arrow: true, title: toolTipLabel, placement: "top-start", slotProps: { popper: { disablePortal: true } }, children: jsx("span", { children: label }) }), tag && jsx(TagTip, { children: tag }), linkString && linkURL && showId && (jsxs("a", { href: linkURL, target: getLinkTarget(linkURL), children: ["[", linkString, "]"] }))] }), jsx(Checkbox, { checked: check === "checked" || check === "grouped", indeterminate: check === "indeterminate", onClick: () => onClickCheck(id) })] }), isOpen && !!children && jsx(ChildrenWrapper, { children: children })] }));
};
const ToggleIcon = ({ status }) => {
    switch (status) {
        case "none":
            return jsx(IconNoChildren, { sx: iconStyle });
        case "expand":
            return jsx(IconExpand, { sx: clickableIconStyle });
        case "compact":
            return jsx(IconCompact, { sx: clickableIconStyle });
        case "loading":
            return jsx(IconLoading, { sx: iconStyle });
    }
};
const Wrapper = styled("li")({
    marginTop: "-1px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
});
const Inner = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: THEME.COLOR.WHITE,
    padding: "0 8px",
    border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
    ["&.highlighted"]: {
        backgroundColor: THEME.COLOR.PRIMARY_PALE,
    },
});
const Left = styled("div")({
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    gap: 8,
    lineHeight: 1,
    fontSize: 16,
    a: {
        fontSize: 14,
        color: THEME.COLOR.PRIMARY,
    },
});
const iconStyle = {
    display: "block",
    color: THEME.COLOR.GRAY300,
    width: 24,
    height: 24,
};
const clickableIconStyle = {
    ...iconStyle,
    cursor: "pointer",
    color: THEME.COLOR.GRAY700,
};
const ChildrenWrapper = styled("ul")({
    paddingLeft: 16,
});
const TagTip = styled("span")({
    fontSize: 12,
    backgroundColor: THEME.COLOR.GRAY400,
    color: THEME.COLOR.WHITE,
    padding: "4px 6px",
    borderRadius: 5,
});

const findAscendants = (list, id) => {
    let iterationCount = 0;
    const result = [];
    let currentId = id;
    while (iterationCount < 255) {
        iterationCount++;
        const parent = findParent(list, currentId);
        if (parent) {
            result.unshift(parent.id);
            currentId = parent.id;
        }
        else {
            break;
        }
    }
    return result;
};
const findDescendants = (list, id) => {
    let result = [];
    const process = (currentId) => {
        const children = findChildren(list, currentId);
        if (children && isArray(children)) {
            result = [...result, ...children];
            children.forEach((childId) => process(childId));
        }
    };
    process(id);
    return result;
};
const makeNewSelection = (list, id, selection) => {
    const isSelected = checkIsSelected(id, selection);
    let result = setSelection(selection, id, !isSelected);
    let currentId;
    const ascendants = findAscendants(list, id).reverse();
    const descendants = findDescendants(list, id);
    if (descendants) {
        result = setMultipleSelection(result, descendants, false);
    }
    //
    const checkedAscendant = ascendants.find((ascendant) => result.includes(ascendant));
    if (checkedAscendant) {
        currentId = id;
        for (let i = 0; i < ascendants.length; i++) {
            const parent = ascendants[i];
            result = setSelection(result, parent, false);
            const siblings = findSiblings(list, currentId);
            result = setMultipleSelection(result, siblings, true);
            result = setSelection(result, currentId, false);
            if (checkedAscendant === parent) {
                break;
            }
            currentId = parent;
        }
    }
    currentId = id;
    for (let i = 0; i < ascendants.length; i++) {
        const parent = ascendants[i];
        const siblings = [...findSiblings(list, currentId), currentId];
        const checkedSiblings = siblings.filter((siblingId) => result.includes(siblingId));
        if (parent && checkedSiblings.length && checkedSiblings.length === siblings.length) {
            result = setMultipleSelection(result, checkedSiblings, false);
            result = setSelection(result, parent, true);
        }
        currentId = parent;
    }
    return result;
};
const checkIsSelected = (id, selection) => {
    return selection.includes(id);
};
const setSelection = (selection, id, value) => {
    const isSelected = checkIsSelected(id, selection);
    switch (true) {
        case isSelected && !value:
            return selection.filter((item) => item !== id);
        case !isSelected && value:
            return [...selection, id];
        default:
            return [...selection];
    }
};
const setMultipleSelection = (selection, ids, value) => {
    let result = [...selection];
    ids.forEach((id) => (result = setSelection(result, id, value)));
    return result;
};
const findChildren = (list, id) => list.find((info) => info.id === id)?.children;
const findParent = (list, id) => list.find((node) => node.children?.includes(id));
const findSiblings = (list, id) => {
    const children = findParent(list, id)?.children;
    if (children && isArray(children)) {
        return children.filter((myId) => myId !== id);
    }
    else {
        return [];
    }
};

const searchResultAtom = atom(null);
const useSearchResult = () => {
    return useAtomValue(searchResultAtom);
};
const useSearchResultMutators = () => {
    const setSearchResult = useSetAtom(searchResultAtom);
    return { setSearchResult };
};

const selectedTaxon = atom([]);
const useSelectedTaxonState = () => {
    return useAtomValue(selectedTaxon);
};
const useSelectedTaxonMutators = () => {
    const setSelectedTaxon = useSetAtom(selectedTaxon);
    const clearTaxonSelect = () => {
        setSelectedTaxon([]);
    };
    const updateSelection = (list, id) => {
        setSelectedTaxon((prev) => makeNewSelection(list, id, prev));
    };
    return {
        __setSelectedTaxon: setSelectedTaxon,
        clearTaxonSelect,
        updateSelection,
    };
};

const ncbiDomains = [
    {
        id: "2157",
        label: "Archaea",
        rank: "Domain",
        children: undefined,
    },
    {
        id: "2",
        label: "Bacteria",
        rank: "Domain",
        children: undefined,
    },
    {
        id: "2759",
        label: "Eukaryota",
        rank: "Domain",
        children: undefined,
    },
];
const gtdbDomains = [
    {
        id: "d__Bacteria",
        label: "d__Bacteria",
        rank: "Domain",
        children: undefined,
    },
    {
        id: "d__Archaea",
        label: "d__Archaea",
        rank: "Domain",
        children: undefined,
    },
];
const taxonListAtom = atom([...ncbiDomains, ...gtdbDomains]);
const useTaxonListState = () => {
    return useAtomValue(taxonListAtom);
};
const useTaxonListMutators = () => {
    const setTaxonList = useSetAtom(taxonListAtom);
    const addTaxonToList = (taxon) => {
        setTaxonList((prev) => [...prev.filter((item) => item.id !== taxon.id), taxon]);
    };
    const setTaxonChildren = (id, children) => {
        setTaxonList((prev) => {
            const target = prev.find((item) => item.id === id);
            const filtered = prev.filter((item) => item.id !== id);
            if (!target) {
                console.warn("no target found", id);
                return prev;
            }
            return [...filtered, { ...target, children }];
        });
    };
    return { addTaxonToList, setTaxonChildren };
};

const treeStateAtom = atom([]);
const useIsOpen = (id) => {
    return useAtomValue(treeStateAtom).includes(id);
};
const useTaxonTreeMutators = () => {
    const setTreeState = useSetAtom(treeStateAtom);
    const toggleOpen = (id) => {
        setTreeState((prev) => {
            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            }
            return [...prev, id];
        });
    };
    const setOpen = (id) => {
        setTreeState((prev) => {
            if (!prev.includes(id)) {
                return [...prev, id];
            }
            return prev;
        });
    };
    const setClosed = (id) => {
        setTreeState((prev) => {
            return prev.filter((item) => item !== id);
        });
    };
    const setBranchState = (id, isOpen) => { };
    const margeTreeState = (newState) => {
        setTreeState((prev) => {
            return [...new Set([...prev, ...newState])];
        });
    };
    const closeAll = () => {
        setTreeState([]);
    };
    return { setTreeState, toggleOpen, setOpen, setClosed, setBranchState, margeTreeState, closeAll };
};

const TaxonomicTreeBranch = ({ id }) => {
    const taxonList = useTaxonListState();
    const searchResult = useSearchResult();
    const isHighlighted = reactExports.useMemo(() => searchResult === id, [searchResult, id]);
    const myInfo = reactExports.useMemo(() => {
        return taxonList.find((item) => item.id === id);
    }, [taxonList, id]);
    const { branchChildren, isOpen, onToggleChildren, toggleIconStatus, taxonType } = useBranchChildren(myInfo);
    const { descendants, ascendants, ascendantsLabel } = useLineages(id, taxonList);
    const { check, onClickCheck } = useChecked(id, taxonList, ascendants, descendants);
    const { label, rank } = useTaxonInfo(myInfo);
    const [linkString, linkURL] = useLinkString(id);
    const shadowRoot = useShadowRootState();
    reactExports.useEffect(() => {
        if (isHighlighted && shadowRoot) {
            setTimeout(() => {
                const elmId = `branch-${id}`;
                const elm = shadowRoot.getElementById(elmId);
                const bound = elm?.getBoundingClientRect();
                const top = (bound?.top || 0) - 100;
                window.scrollTo({ top, behavior: "smooth" });
            }, 500);
        }
    }, [isHighlighted, shadowRoot, id]);
    return (jsx(TreeBranchView, { label: label, id: id, tag: rank, linkString: linkString, linkURL: linkURL, toolTipLabel: ascendantsLabel, check: check, isOpen: isOpen, onClickCheck: () => onClickCheck(), onToggleChildren: onToggleChildren, toggle: toggleIconStatus, isHighlighted: isHighlighted, showId: taxonType === "NCBI", children: isOpen &&
            branchChildren.length &&
            branchChildren.map((childId) => jsx(TaxonomicTreeBranch, { id: childId }, childId)) }));
};
const useBranchChildren = (info) => {
    const { toggleOpen } = useTaxonTreeMutators();
    const onToggleChildren = () => toggleOpen(info?.id || "");
    const isOpen = useIsOpen(info?.id || "");
    const { url, type } = useTreeApi();
    const { addTaxonToList, setTaxonChildren } = useTaxonListMutators();
    const query = useQuery({
        queryKey: ["taxon_children", type, info?.id || ""],
        queryFn: async () => {
            const tax_id = info?.id || "";
            if (!tax_id)
                return [];
            const response = await getData(url, {
                tax_id,
            });
            return response.body;
        },
        staleTime: Infinity,
        placeholderData: [],
    });
    reactExports.useEffect(() => {
        if (query.data?.length) {
            query.data.forEach((item) => {
                addTaxonToList({
                    id: item.tax_id,
                    rank: item.rank,
                    label: item.name,
                    children: [],
                });
            });
        }
    }, [query.data]);
    reactExports.useEffect(() => {
        if (query.data?.length) {
            setTaxonChildren(info?.id || "", query.data.map((item) => item.tax_id));
        }
    }, [query.data]);
    const branchChildren = reactExports.useMemo(() => (query.data ?? []).map((item) => item.tax_id), [query.data]);
    const toggleIconStatus = reactExports.useMemo(() => {
        switch (true) {
            case info?.rank.toLowerCase() === "species":
                return "none";
            case query.isLoading:
                return "loading";
            case isOpen:
                return "compact";
            default:
                return "expand";
        }
    }, [info, isOpen, query.isLoading]);
    return { branchChildren, onToggleChildren, isOpen, toggleIconStatus, taxonType: type };
};
const useLinkString = (id, rank) => {
    const linkString = reactExports.useMemo(() => `tax_id:${id}`, [id]);
    const linkURL = reactExports.useMemo(() => makeLinkPath(`${PATH_TAXON}${id}`), [id]);
    return [linkString, linkURL];
};
const useTaxonInfo = (myInfo) => {
    const rank = reactExports.useMemo(() => myInfo?.rank || "", [myInfo]);
    const label = reactExports.useMemo(() => myInfo?.label || "", [myInfo]);
    return { rank, label };
};
const useChecked = (id, taxonList, ascendants, descendants) => {
    const selectedTaxon = useSelectedTaxonState();
    const { updateSelection } = useSelectedTaxonMutators();
    const onClickCheck = () => {
        updateSelection(taxonList, id);
    };
    const isChecked = !!selectedTaxon.find((taxId) => taxId === id);
    const isGrouped = !!selectedTaxon.find((taxId) => ascendants.includes(taxId));
    const isIndeterminate = !!selectedTaxon.find((taxId) => descendants.includes(taxId));
    const check = reactExports.useMemo(() => {
        switch (true) {
            case isChecked:
                return "checked";
            case isGrouped:
                return "grouped";
            case isIndeterminate:
                return "indeterminate";
            default:
                return "none";
        }
    }, [isChecked, isGrouped, isIndeterminate]);
    return { check, onClickCheck };
};
const useLineages = (id, taxonList) => {
    // console.log("useLineages", id);
    const ascendants = reactExports.useMemo(() => findAscendants(taxonList, id), [taxonList, id]);
    const descendants = reactExports.useMemo(() => findDescendants(taxonList, id), [taxonList, id]);
    const ascendantsLabel = reactExports.useMemo(() => ascendants.map((id) => taxonList.find((taxon) => taxon.id === id)?.label).join(" > "), [ascendants]);
    // useEffect(() => {
    //   console.log({ id: id, ascendants: ascendants, descendants: descendants });
    // }, [descendants]);
    return { ascendants, descendants, ascendantsLabel };
};

const TaxonomicTreeSection = ({ showLoading }) => {
    const type = useTaxonomyType();
    const superKingdoms = reactExports.useMemo(() => {
        return type === "GTDB" ? gtdbDomains : ncbiDomains;
    }, [type]);
    return (jsxs("div", { style: { position: "relative" }, children: [jsx(LoadingCover, { showLoading: showLoading, errorMessage: "" }), jsx("div", { children: superKingdoms.map((superKingdom) => (jsx(TaxonomicTreeBranch, { id: superKingdom.id }, superKingdom.id))) })] }));
};

const SHOW_COUNT = 10;
const useMediaLoadFromTaxon = () => {
    const page = useMediaPaginationState();
    const selectedTaxon = useSelectedTaxonState();
    const { setQueryData } = useQueryDataMutators();
    const { setFoundMedia } = useFoundMediaMutators();
    const { setIsMediaLoading } = useIsMediaLoadingMutators();
    const { reset } = useMediaPaginationMutators();
    const { url, type } = useListMediaOfTaxonsApi();
    const query = useQuery({
        queryKey: ["media_of_taxon", type, selectedTaxon.sort(), { page }],
        queryFn: async () => {
            const tax_ids = selectedTaxon.sort().join(",");
            if (tax_ids.length === 0)
                return nullListResponse;
            //
            const response = await getData(url, {
                tax_ids,
                limit: SHOW_COUNT,
                offset: (page - 1) * SHOW_COUNT,
            });
            if (!response.body)
                throw new Error("No data");
            return response.body;
        },
        staleTime: Infinity,
        placeholderData: (previousData) => previousData,
    });
    reactExports.useEffect(() => {
        setQueryData({ tax_ids: selectedTaxon });
    }, [selectedTaxon]);
    reactExports.useEffect(() => {
        query.data && setFoundMedia(query.data);
    }, [query.data, setFoundMedia]);
    reactExports.useEffect(() => {
        setIsMediaLoading(query.isLoading || query.isPlaceholderData);
    }, [query.isLoading, query.isPlaceholderData, setIsMediaLoading]);
    reactExports.useEffect(() => {
        reset();
    }, [selectedTaxon, reset]);
};

// const use
const AppContainer = ({ dispatchEvent, taxonomyType }) => {
    const { setApiType } = useTaxonomyTypeMutators();
    const { setSearchResult } = useSearchResultMutators();
    const { showLoading } = useTaxonSearchResult();
    useMediaLoadFromTaxon();
    reactExports.useEffect(() => {
        setApiType(taxonomyType);
    }, [taxonomyType, setApiType]);
    return (jsxs(AppWrapper, { children: [jsxs(QueryPane, { children: [jsx(TaxonInput, { onChange: setSearchResult }), jsx(TaxonomicTreeSection, { showLoading: showLoading })] }), jsx(SubPane, { children: jsx(MediaPane, { dispatchEvent: dispatchEvent }) })] }));
};
const useTaxonSearchResult = () => {
    const searchedTaxon = useSearchResult();
    const { margeTreeState, closeAll } = useTaxonTreeMutators();
    const { url, type } = useTaxonAncestorsApi();
    const { url: treApiUrl } = useTreeApi();
    const firstQuery = useQuery({
        queryKey: ["taxon_ancestors", type, searchedTaxon],
        queryFn: async () => {
            if (searchedTaxon === null)
                return [];
            const response = await getData(url, {
                tax_id: searchedTaxon,
            });
            if (!response.body)
                throw new Error("No data");
            return response.body;
        },
        placeholderData: [],
        staleTime: Infinity,
    });
    const childrenIds = reactExports.useMemo(() => firstQuery.data?.map((d) => d.tax_id) ?? [], [firstQuery.data]);
    const { data, isSuccess, isLoading, isPending } = useQueries({
        queries: childrenIds.map((id) => ({
            queryKey: ["taxon_children", type, id],
            queryFn: async () => {
                const response = await getData(treApiUrl, {
                    tax_id: id,
                });
                return response.body;
            },
            staleTime: Infinity,
        })),
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                isLoading: results.some((result) => result.isLoading),
                isError: results.some((result) => result.isError),
                isPending: results.some((result) => result.isPending),
                isSuccess: results.every((result) => result.isSuccess),
            };
        },
    });
    reactExports.useEffect(() => {
        if (data.length === 0) {
            closeAll();
        }
        if (isSuccess && data.length > 0) {
            margeTreeState(firstQuery.data
                ?.filter((taxon) => taxon.rank.toLowerCase() !== "species")
                .map((taxon) => taxon.tax_id) ?? []);
        }
    }, [data, isSuccess, firstQuery.data]);
    return { showLoading: isPending || firstQuery.isPending };
};

const App = ({ stanzaElement, taxonomyType = "NCBI" }) => {
    const { setShadowRoot } = useShadowRootMutators();
    setShadowRoot(stanzaElement || null);
    const dispatchEvent = (gmIds) => {
        if (!stanzaElement)
            return;
        //
        stanzaElement.dispatchEvent(new CustomEvent("STANZA_RUN_ACTION", { bubbles: true, composed: true, detail: gmIds }));
    };
    return (jsx(AppContainer, { dispatchEvent: dispatchEvent, taxonomyType: taxonomyType === "GTDB" ? "GTDB" : "NCBI" }));
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const params = this.params;
        const taxonomyType = params?.taxonomy_type;
        return jsx(App, { stanzaElement: this.root, taxonomyType: taxonomyType });
    }
}

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ReactStanza
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-find-media-by-taxonomic-tree",
	"stanza:label": "Media finder by taxonomic tree",
	"stanza:definition": "Retrieves media by taxon selected from the taxonomic tree",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda (YOHAK)",
	"stanza:address": "satoshionoda@yohak.design",
	"stanza:contributor": [
],
	"stanza:created": "2022-01-01",
	"stanza:updated": "2025-03-22",
	"stanza:parameter": [
	{
		"stanza:key": "taxonomy_type",
		"stanza:example": "NCBI",
		"stanza:description": "NCBI or GTDB",
		"stanza:required": false
	}
],
	"stanza:menu-placement": "none",
	"stanza:style": [
],
	"stanza:incomingEvent": [
],
	"stanza:outgoingEvent": [
	{
		"stanza:key": "STANZA_RUN_ACTION",
		"stanza:description": "dispatches when the action button is clicked"
	}
]
};

var templates = [
  ["stanza.html.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p class=\"greeting\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"greeting") || (depth0 != null ? lookupProperty(depth0,"greeting") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"greeting","hash":{},"data":data,"loc":{"start":{"line":1,"column":20},"end":{"line":1,"column":32}}}) : helper)))
    + "!!!</p>";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-find-media-by-taxonomic-tree.js.map
