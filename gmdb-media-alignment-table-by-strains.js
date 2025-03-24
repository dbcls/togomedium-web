import { d as defineStanzaElement } from './stanza-ee9dc64c.js';
import { s as styled, T as THEME, a as jsxs, j as jsx, l as atom, m as useAtomValue, o as useSetAtom, F as Fragment, b as TogoMediumReactStanza } from './StanzaReactProvider-b083349e.js';
import { m as makeLinkPath, g as getLinkTarget, u as useQuery } from './getLinkTarget-f23444d4.js';
import { l as lineageRanks, m as mediaStrainsAlignmentURL } from './definitions-18b95eec.js';
import { g as getData } from './getData-1442ae18.js';
import { r as reactExports, R as React, e as dist } from './index-ef9d40bc.js';
import { n as nanoid, N as NotFound } from './index.browser-0883b6be.js';
import { a as PATH_MEDIUM } from './consts-deffa432.js';
import { c as copy } from './index-b1a62205.js';
import { j as Tooltip } from './Tooltip-f4db4da8.js';
import { m as makeSpeciesName, c as capitalizeFirstLetter, s as stringToArray } from './string-cf2ce947.js';
import './DefaultPropsProvider-c607464a.js';

const makeCellHeight = (size) => {
    return 48 * size + size - 1;
};
const processDisplayData = (data, filterTaxon = "", filterRank = "strain") => {
    // console.log("process", data.length, data[0].organisms.length, filterTaxon, filterRank);
    const nullFilled = fillNullTaxon(data);
    const filtered = filterData(nullFilled, filterTaxon);
    const taxon = processTaxonColList(filtered, filterRank);
    const media = processMediaCell(filtered, taxon, filterRank);
    return { media, taxon };
};
const processMediaCell = (data, taxon, filterRank) => {
    return data.map((item, i) => {
        return {
            id: item.gm_id,
            label: item.label,
            size: taxon[filterRank][i].length,
        };
    });
};
const fillNullTaxon = (data) => {
    const cloned = copy(data);
    const nullCells = [];
    const findNullId = (gmId, parentId) => {
        return nullCells.find((cell) => parentId === cell.parentId && cell.gmId === gmId)?.id;
    };
    cloned.forEach((media) => {
        media.organisms.forEach((organism) => {
            const gmId = media.gm_id;
            lineageRanks.forEach((rank, lineageIndex) => {
                if (organism[rank] !== null)
                    return;
                //
                const parentRank = lineageRanks[lineageIndex - 1];
                const parent = organism[parentRank];
                const parentId = parent.id;
                const foundId = findNullId(gmId, parentId);
                const id = foundId || nanoid();
                //
                organism[rank] = { id, label: "" };
                if (!foundId) {
                    nullCells.push({ id, parentId, gmId });
                }
            });
        });
    });
    return cloned;
};
const processTaxonCol = (trees, rank, filterRank) => {
    return trees.map((tree) => getNodeListOfRankFromTree(tree, rank).map((node) => ({
        id: node.id,
        label: node.label,
        size: getSizeOfCell(node, filterRank),
    })));
};
const processTaxonColList = (data, filterRank) => {
    const trees = makeTaxonTreesFromData(data);
    return lineageRanks.reduce((accum, rank) => {
        const result = { ...accum };
        result[rank] = processTaxonCol(trees, rank, filterRank);
        return result;
    }, {});
};
const filterData = (data, taxId = "") => {
    if (taxId === "")
        return data;
    const cloned = copy(data);
    cloned.forEach((media) => {
        media.organisms = media.organisms.filter((organism) => {
            const organismIds = Object.values(organism).map((item) => item.id);
            return organismIds.includes(taxId);
        });
    });
    return cloned.filter((medium) => medium.organisms.length > 0);
};
const getSizeOfCell = (node, filterRank) => {
    let total = 1;
    const process = (n) => {
        if (n.rank !== filterRank) {
            total += Math.max(n.children.length - 1, 0);
            n.children.forEach((c) => {
                process(c);
            });
        }
    };
    process(node);
    return total;
};
const makeTaxonTreesFromData = (data) => {
    return data.map((medium) => makeTaxonTree(medium.organisms, medium.gm_id));
};
const makeTaxonTree = (organisms, gmId) => {
    const flatTaxonList = organisms
        .map((organism) => lineageToTaxonNode(organism, gmId))
        .flat()
        .reduce(reduceSingle, []);
    organisms.forEach((organism) => {
        lineageRanks.forEach((rank, index) => {
            const targetTaxon = organism[rank];
            const targetNode = findNodeFromFlatList(flatTaxonList, targetTaxon?.id || "", rank);
            if (rank !== "superkingdom") {
                const parentRank = lineageRanks[index - 1];
                const parentTaxon = organism[parentRank];
                const parentNode = findNodeFromFlatList(flatTaxonList, parentTaxon?.id || "", parentRank);
                parentNode.children.push(targetNode);
            }
        });
    });
    flatTaxonList.forEach((node) => {
        node.children = node.children.reduce(reduceSingle, []).sort((a, b) => {
            if (a.label < b.label)
                return -1;
            if (a.label > b.label)
                return 1;
            return 0;
        });
    });
    return flatTaxonList.filter((node) => node.rank === "superkingdom");
};
const getNodeListOfRankFromTree = (tree, rank) => {
    const process = (nodes, currentRank) => {
        if (currentRank === rank) {
            return nodes;
        }
        else {
            const nextNodes = nodes.map((node) => node.children).flat();
            const currentRankIndex = lineageRanks.indexOf(currentRank);
            const nextRank = lineageRanks[currentRankIndex + 1];
            return process(nextNodes, nextRank);
        }
    };
    return process(tree, "superkingdom");
};
const findNodeFromFlatList = (list, id, rank) => list.find((node) => node.rank === rank && id === node.id);
const lineageToTaxonNode = (lineage, gmId) => lineageRanks.map((key) => makeTaxonNode(lineage[key], key, gmId));
const makeTaxonNode = (taxon, rank, gmId) => {
    if (!taxon) {
        throw Error("taxon should not be null");
    }
    return {
        rank,
        id: taxon.id,
        label: taxon.label,
        gmId,
        children: [],
    };
};
const reduceSingle = (accum, current) => {
    return accum.find((item) => item.id === current.id && item.rank === current.rank)
        ? [...accum]
        : [...accum, current];
};

const useToolTipEnabled = () => {
    const labelRef = reactExports.useRef(null);
    // cannot use useMemo as it depends on the ref;
    // instead, use useEffect to update the state
    const [toolTipEnabled, setToolTipEnabled] = reactExports.useState(false);
    reactExports.useEffect(() => {
        const offsetWidth = labelRef.current?.offsetWidth;
        const scrollWidth = labelRef.current?.scrollWidth;
        setToolTipEnabled(!!scrollWidth && !!offsetWidth && scrollWidth > offsetWidth);
    }, [labelRef]);
    return { labelRef, toolTipEnabled };
};
const MediaCell = ({ label, id, size }) => {
    const { labelRef, toolTipEnabled } = useToolTipEnabled();
    return (jsxs(Wrapper$5, { style: { height: `${makeCellHeight(size)}px` }, children: [jsx("a", { href: makeLinkPath(`${PATH_MEDIUM}${id}`), target: getLinkTarget(`${PATH_MEDIUM}${id}`), children: id }), jsx("div", { className: "label-wrapper", children: jsx(Tooltip, { slotProps: { popper: { disablePortal: true } }, title: label, placement: "top", arrow: true, disableHoverListener: !toolTipEnabled, children: jsx("span", { ref: labelRef, className: "label", children: label }) }) })] }));
};
const Wrapper$5 = styled("div")({
    width: "200px",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: `${COLOR_WHITE}`,
    backgroundColor: THEME.COLOR.WHITE,
    padding: "8px 8px 0",
    fontSize: "14px",
    a: {
        color: THEME.COLOR.PRIMARY,
        textDecoration: "none",
        width: "fit-content",
    },
    ".label-wrapper": {
        position: "relative",
    },
    ".label": {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
        height: "16px",
        flexShrink: 0,
    },
});

const MediaCol = ({ mediaList }) => {
    return (jsxs(Wrapper$4, { children: [jsx(EmptyCell, {}), mediaList.map((info, index) => (jsx(MediaCell, { ...info }, index)))] }));
};
const Wrapper$4 = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    width: "200px",
});
const EmptyCell = styled("div")({
    height: "24px",
    backgroundColor: THEME.COLOR.WHITE,
});

const FilterIcon = ({ sx }) => {
    return (jsx(Wrapper$3, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", sx: sx, children: jsx("path", { d: "M324.4 64C339.6 64 352 76.37 352 91.63C352 98.32 349.6 104.8 345.2 109.8L240 230V423.6C240 437.1 229.1 448 215.6 448C210.3 448 205.2 446.3 200.9 443.1L124.7 385.6C116.7 379.5 112 370.1 112 360V230L6.836 109.8C2.429 104.8 0 98.32 0 91.63C0 76.37 12.37 64 27.63 64H324.4zM144 224V360L208 408.3V223.1C208 220.1 209.4 216.4 211.1 213.5L314.7 95.1H37.26L140 213.5C142.6 216.4 143.1 220.1 143.1 223.1L144 224zM496 400C504.8 400 512 407.2 512 416C512 424.8 504.8 432 496 432H336C327.2 432 320 424.8 320 416C320 407.2 327.2 400 336 400H496zM320 256C320 247.2 327.2 240 336 240H496C504.8 240 512 247.2 512 256C512 264.8 504.8 272 496 272H336C327.2 272 320 264.8 320 256zM496 80C504.8 80 512 87.16 512 96C512 104.8 504.8 112 496 112H400C391.2 112 384 104.8 384 96C384 87.16 391.2 80 400 80H496z" }) }));
};
const Wrapper$3 = styled("svg")({});

const filterTaxonAtom = atom("");
const useFilterTaxonState = () => {
    return useAtomValue(filterTaxonAtom);
};
const useFilterTaxonMutators = () => {
    const setter = useSetAtom(filterTaxonAtom);
    const setFilterTaxon = (id) => setter((prev) => (id === prev ? "" : id));
    return { setFilterTaxon };
};

const TaxonCell = (props) => {
    const wrapperRef = React.useRef(null);
    reactExports.useEffect(() => {
        if (!wrapperRef.current)
            return;
        const size = props.isFolded ? 1 : props.size;
        wrapperRef.current.style.height = makeCellHeight(size) + "px";
        // console.log("set height", size, props.id, props.isFolded);
    }, [props.size, props.isFolded]);
    return reactExports.useMemo(() => (jsx(ToMemoize, { ...props, wrapperRef: wrapperRef })), [props.id]);
};
const ToMemoize = ({ wrapperRef, label, id, rank }) => {
    const filterId = useFilterTaxonState();
    const pathRoot = rank === "strain" ? "/strain/" : "/taxon/";
    const { setFilterTaxon } = useFilterTaxonMutators();
    const onClickFilter = () => {
        setFilterTaxon(id);
    };
    const { labelRef, toolTipEnabled } = useToolTipEnabled();
    // console.log("render TaxonCell", rank, size);
    return (jsxs(Wrapper$2, { ref: wrapperRef, children: [!!label && (jsxs(Fragment, { children: [jsx("a", { href: makeLinkPath(`${pathRoot}${id}`), target: getLinkTarget(`${pathRoot}${id}`), children: id }), jsx("div", { className: "label-wrapper", children: jsx(Tooltip, { title: makeLabel(label, rank), placement: "top", arrow: true, disableHoverListener: !toolTipEnabled, slotProps: { popper: { disablePortal: true } }, children: jsx("span", { className: "label", ref: labelRef, children: makeLabel(label, rank) }) }) }), jsx(FilterIconWrapper, { onClick: onClickFilter, children: jsx(FilterIcon, { sx: id === filterId ? filterIconColorActive : filterIconColorInactive }) })] })), !label && jsx(Fragment, { children: "" })] }));
};
const makeLabel = (label, rank) => {
    switch (rank) {
        case "strain":
            return makeSpeciesName(label);
        case "species":
            return makeSpeciesName(label);
        default:
            return label;
    }
};
const Wrapper$2 = styled("div")({
    position: "relative",
    width: 200,
    display: "flex",
    flexDirection: "column",
    backgroundColor: THEME.COLOR.WHITE,
    padding: "8px 8px 0",
    fontSize: 14,
    "& a": {
        color: THEME.COLOR.PRIMARY,
        textDecoration: "none",
        width: "fit-content",
    },
    ".label-wrapper": {
        position: "relative",
    },
    ".label": {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
        height: 16,
        flexShrink: 0,
    },
});
const FilterIconWrapper = styled("span")({
    width: 16,
    height: 16,
    position: "absolute",
    top: 8,
    right: 8,
    cursor: "pointer",
    svg: {
        display: "block",
        width: 16,
        height: 16,
    },
});
const filterIconColorInactive = {
    fill: THEME.COLOR.GRAY400,
};
const filterIconColorActive = {
    fill: THEME.COLOR.PRIMARY,
};

const makeDefaultStatus = () => lineageRanks.reduce((accum, current) => {
    return { ...accum, [current]: false };
}, {});
const filterStatusAtom = atom(makeDefaultStatus());
const filterRankAtom = atom((get) => {
    const status = get(filterStatusAtom);
    return findCurrentFilterRank(status);
});
const useFilterRankState = () => {
    return useAtomValue(filterRankAtom);
};
const useFilterRankMutators = () => {
    const setFilterStatus = useSetAtom(filterStatusAtom);
    const changeFilterRank = (rank, val) => setFilterStatus((prev) => ({ ...prev, [rank]: val }));
    return { changeFilterRank };
};
const findCurrentFilterRank = (status) => {
    let found = undefined;
    const arr = lineageRanks.concat().reverse();
    for (let i = 0; i < arr.length; i++) {
        const key = arr[i];
        const val = status[key];
        if (val) {
            found = key;
        }
        else {
            break;
        }
    }
    if (found === "superkingdom") {
        return "superkingdom";
    }
    const result = lineageRanks[lineageRanks.indexOf(found) - 1];
    return result || "strain";
};

const TaxonCol = ({ rank, taxonList }) => {
    const { changeFilterRank } = useFilterRankMutators();
    const [isFolded, setIsFolded] = reactExports.useState(false);
    const wrapperRef = reactExports.useRef(null);
    const onClickRank = (e) => {
        e.preventDefault();
        setIsFolded((prev) => {
            const result = !prev;
            changeFilterRank(rank, result);
            return result;
        });
    };
    reactExports.useEffect(() => {
        const isFolded = rank === "superkingdom" || rank === "phylum" || rank === "class";
        if (isFolded) {
            setIsFolded(true);
            changeFilterRank(rank, true);
        }
    }, []);
    reactExports.useEffect(() => {
        if (!wrapperRef.current)
            return;
        setTimeout(() => {
            wrapperRef.current.style.display = !isFolded ? "flex" : "none";
        }, 16);
    }, [isFolded]);
    return (jsxs(Wrapper$1, { sx: isFolded ? foldedStyle : null, children: [!isFolded && jsx(RankCell, { onClick: onClickRank, children: capitalizeFirstLetter(rank) }), jsx(AllTaxonWrapper, { ref: wrapperRef, children: taxonList.map((list, index) => (jsx(MediumTaxonWrapper, { children: list.map((info, index) => (jsx(TaxonCell, { ...info, rank: rank, isFolded: isFolded }, index))) }, index))) }), isFolded && (jsx(FoldedCover, { onClick: onClickRank, children: jsx("span", { children: capitalizeFirstLetter(rank) }) }))] }));
};
const Wrapper$1 = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    position: "relative",
    height: "100%",
    minHeight: "72px",
    transitionDuration: "0.4s",
    transitionTimingFunction: dist.Ease._4_IN_OUT_QUART,
    overflow: "hidden",
    width: "200px",
});
const foldedStyle = {
    width: "36px",
};
const FoldedCover = styled("div")({
    width: "100%",
    height: "100%",
    backgroundColor: THEME.COLOR.WHITE,
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: "8px",
    paddingRight: "8px",
    cursor: "pointer",
    span: {
        display: "block",
        transformOrigin: "left top",
        transform: "translateX(24px) rotate(90deg)",
        fontWeight: THEME.FONT_WEIGHT.BOLD,
    },
});
const RankCell = styled("div")({
    cursor: "pointer",
    backgroundColor: THEME.COLOR.WHITE,
    height: "24px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "8px",
    fontWeight: THEME.FONT_WEIGHT.BOLD,
});
const AllTaxonWrapper = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    flexShrink: 0,
});
const MediumTaxonWrapper = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "1px",
    flexShrink: 0,
});

const AppContainer = ({ data, hideMedia = false }) => {
    const filterTaxon = useFilterTaxonState();
    const filterRank = useFilterRankState();
    const displayData = reactExports.useMemo(() => processDisplayData(data, filterTaxon, filterRank), [data, filterTaxon, filterRank]);
    return displayData.media.length ? (jsxs(Container, { children: [!hideMedia && jsx(MediaCol, { mediaList: displayData.media }), jsx(TaxonContainer, { children: lineageRanks
                    .concat()
                    .reverse()
                    .map((rank, index) => (jsx(TaxonCol, { rank: rank, taxonList: displayData.taxon[rank] }, index))) })] })) : (jsx(NotFound, {}));
};
const Container = styled("div")({
    display: "flex",
    gap: "2px",
    padding: "1px",
    backgroundColor: THEME.COLOR.GRAY_LINE,
    width: "fit-content",
});
const TaxonContainer = styled("div")({
    display: "flex",
    gap: "1px",
});

const useData = (gmIds) => {
    const { data, isLoading } = useQuery({
        queryKey: [...gmIds],
        queryFn: async () => {
            const result = await getData(mediaStrainsAlignmentURL, {
                gm_ids: gmIds.join(","),
            });
            if (!result.body)
                throw new Error("No data");
            return result.body;
        },
    });
    return { data, isLoading };
};
const App = ({ gmIds, hideMedia = false }) => {
    const { data, isLoading } = useData(gmIds);
    if (isLoading)
        return jsx(Fragment, { children: "Loading..." });
    return jsx(Wrapper, { children: data && jsx(AppContainer, { data, hideMedia }) });
};
const Wrapper = styled("div")({
    minHeight: 100,
    width: "fit-content",
    minWidth: "100%",
    backgroundColor: THEME.COLOR.WHITE,
    borderRadius: 5,
    padding: THEME.SIZE.S1,
});

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const gmIds = stringToArray(this.params.gm_ids);
        const hideMedia = this.params.hide_media === "true";
        return jsx(App, { hideMedia, gmIds, stanzaElement: this.root });
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
	"@id": "gmdb-media-alignment-table-by-strains",
	"stanza:label": "Media alignment table by strains",
	"stanza:definition": "Aligns media based on the strains that can be cultivated",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda (YOHAK)",
	"stanza:address": "satoshionoda@yohak.design",
	"stanza:contributor": [
],
	"stanza:created": "2022-01-01",
	"stanza:updated": "2025-03-22",
	"stanza:parameter": [
	{
		"stanza:key": "gm_ids",
		"stanza:type": "string",
		"stanza:example": "HM_D00001a,HM_D00065",
		"stanza:description": "",
		"stanza:required": true
	},
	{
		"stanza:key": "hide_media",
		"stanza:type": "string",
		"stanza:example": "false",
		"stanza:description": "",
		"stanza:required": false
	}
],
	"stanza:menu-placement": "none",
	"stanza:style": [
],
	"stanza:incomingEvent": [
],
	"stanza:outgoingEvent": [
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
//# sourceMappingURL=gmdb-media-alignment-table-by-strains.js.map
