import { l as lodash_debounce, d as defineStanzaElement } from './stanza-ee9dc64c.js';
import { l as atom, o as useSetAtom, m as useAtomValue, s as styled, T as THEME, j as jsx, a as jsxs, b as TogoMediumReactStanza } from './StanzaReactProvider-b083349e.js';
import { u as useQuery, g as getLinkTarget, m as makeLinkPath } from './getLinkTarget-f23444d4.js';
import { r as reactExports, e as dist } from './index-ef9d40bc.js';
import { m as makeApiUrl, g as getData } from './getData-1442ae18.js';
import { C as Checkbox, u as useMediaPaginationState, b as useQueryDataMutators, a as useFoundMediaMutators, c as useIsMediaLoadingMutators, d as useMediaPaginationMutators, n as nullListResponse, Q as QueryPane, M as MediaPane, S as SubPane, A as AppWrapper } from './ListApi-115ba089.js';
import { a as listMediaOfGtdbTaxonsURL, l as listMediaOfTaxonsURL } from './definitions-85d5d955.js';
import { T as TextField, A as Autocomplete } from './TextField-ebad9552.js';
import { B as Box, I as IconLoading, a as IconCompact, b as IconExpand, c as IconNoChildren } from './icons-c7bf1293.js';
import { b as PATH_TAXON } from './consts-deffa432.js';
import { j as Tooltip } from './Tooltip-f4db4da8.js';
import './DefaultPropsProvider-c607464a.js';
import './isHostComponent-b55b8d7a.js';
import './createSvgIcon-d354a6e3.js';

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

const taxonAncestorsURL = makeApiUrl("gmdb_taxonomy_ancestors");
const gtdbTaxonAncestorsURL = makeApiUrl("gmdb_taxonomy_gtdb_ancestors");

const taxonChildrenURL = makeApiUrl("gmdb_taxonomy_children");
const gtdbTaxonChildrenURL = makeApiUrl("gmdb_taxonomy_gtdb_children");

const taxonSearchByNameURL = makeApiUrl("gmdb_taxonomy_search_by_name");
const gtdbTaxonSearchByNameUrl = makeApiUrl("gmdb_taxonomy_gtdb_search_by_name");

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
    const url = apiType === "GTDB" ? gtdbTaxonSearchByNameUrl : taxonSearchByNameURL;
    return { type: apiType, url };
};
const useTreeApi = () => {
    const apiType = useAtomValue(taxonomyTypeAtom);
    const url = apiType === "GTDB" ? gtdbTaxonChildrenURL : taxonChildrenURL;
    return { type: apiType, url };
};
const useTaxonAncestorsApi = () => {
    const apiType = useAtomValue(taxonomyTypeAtom);
    const url = apiType === "GTDB" ? gtdbTaxonAncestorsURL : taxonAncestorsURL;
    return { type: apiType, url };
};
const useListMediaOfTaxonsApi = () => {
    const apiType = useAtomValue(taxonomyTypeAtom);
    const url = apiType === "GTDB" ? listMediaOfGtdbTaxonsURL : listMediaOfTaxonsURL;
    return { type: apiType, url };
};

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
    return (jsx(Autocomplete, { options: options, disablePortal: true, filterOptions: (options, _params) => options, getOptionLabel: (option) => option.name, renderInput: (params) => (jsx(TextField, { ...params, label: "Search taxon by name" })), onInputChange: (e, v) => {
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
    return (jsxs(Wrapper, { children: [jsxs(Inner, { className: isHighlighted ? "highlighted" : "", children: [jsxs(Left, { children: [jsx("span", { onClick: () => {
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
        if (children && dist.isArray(children)) {
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
    if (children && dist.isArray(children)) {
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

const ncbiSuperkingdoms = [
    {
        id: "2157",
        label: "Archaea",
        rank: "Superkingdom",
        children: undefined,
    },
    {
        id: "2",
        label: "Bacteria",
        rank: "Superkingdom",
        children: undefined,
    },
    {
        id: "2759",
        label: "Eukaryota",
        rank: "Superkingdom",
        children: undefined,
    },
];
const gtdbSuperkingdoms = [
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
const taxonListAtom = atom([...ncbiSuperkingdoms, ...gtdbSuperkingdoms]);
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
    return { setTreeState, toggleOpen, setOpen, setClosed, setBranchState, margeTreeState };
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
    return (jsx(TreeBranchView, { label: label, id: id, tag: rank, linkString: linkString, linkURL: linkURL, toolTipLabel: ascendantsLabel, check: check, isOpen: isOpen, onClickCheck: () => onClickCheck(), onToggleChildren: onToggleChildren, toggle: toggleIconStatus, isHighlighted: isHighlighted, showId: taxonType === "NCBI", children: isOpen &&
            branchChildren.length &&
            branchChildren.map((childId) => (jsx(TaxonomicTreeBranch, { id: childId }, childId))) }));
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
    const ascendants = reactExports.useMemo(() => findAscendants(taxonList, id), [taxonList, id]);
    const descendants = reactExports.useMemo(() => findDescendants(taxonList, id), [taxonList, id]);
    const ascendantsLabel = reactExports.useMemo(() => ascendants.map((id) => taxonList.find((taxon) => taxon.id === id)?.label).join(" > "), [ascendants]);
    // useEffect(() => {
    //   console.log({ id: id, ascendants: ascendants, descendants: descendants });
    // }, [descendants]);
    return { ascendants, descendants, ascendantsLabel };
};

const TaxonomicTreeSection = () => {
    const type = useTaxonomyType();
    const superKingdoms = reactExports.useMemo(() => {
        return type === "GTDB" ? gtdbSuperkingdoms : ncbiSuperkingdoms;
    }, [type]);
    return (jsx("div", { children: jsx("div", { children: superKingdoms.map((superKingdom) => (jsx(TaxonomicTreeBranch, { id: superKingdom.id }, superKingdom.id))) }) }));
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
    useTaxonSearchResult();
    useMediaLoadFromTaxon();
    reactExports.useEffect(() => {
        setApiType(taxonomyType);
    }, [taxonomyType, setApiType]);
    return (jsxs(AppWrapper, { children: [jsxs(QueryPane, { children: [jsx(TaxonInput, { onChange: setSearchResult }), jsx(TaxonomicTreeSection, {})] }), jsx(SubPane, { children: jsx(MediaPane, { dispatchEvent: dispatchEvent }) })] }));
};
const useTaxonSearchResult = () => {
    const searchedTaxon = useSearchResult();
    const { margeTreeState } = useTaxonTreeMutators();
    const { url, type } = useTaxonAncestorsApi();
    const query = useQuery({
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
    reactExports.useEffect(() => {
        margeTreeState(query.data
            ? query.data
                .filter((taxon) => taxon.rank.toLowerCase() !== "species")
                .map((taxon) => taxon.tax_id)
            : []);
    }, [query.data]);
};

const App = ({ stanzaElement, taxonomyType = "NCBI" }) => {
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
        return (jsx(App, { stanzaElement: this.root, taxonomyType: taxonomyType }));
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
    + "!!!</p>\n";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-find-media-by-taxonomic-tree.js.map
