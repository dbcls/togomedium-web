import { d as defineStanzaElement } from './stanza-ee9dc64c.js';
import { l as atom, m as useAtomValue, o as useSetAtom, s as styled, T as THEME, j as jsx, a as jsxs, F as Fragment, b as TogoMediumReactStanza } from './StanzaReactProvider-b083349e.js';
import { m as makeLinkPath, g as getLinkTarget, u as useQuery } from './getLinkTarget-f23444d4.js';
import { j as jsx$1, r as reactExports } from './index-ef9d40bc.js';
import { m as makeApiUrl, g as getData } from './getData-1442ae18.js';
import { d as decodeHTMLEntities } from './decodeHtmlEntities-9696853d.js';
import { a as IconCompact, b as IconExpand, d as IconBlank } from './icons-c7bf1293.js';
import { c as clone } from './clone-4533aa20.js';
import { P as PATH_COMPONENT, a as PATH_MEDIUM, b as PATH_TAXON } from './consts-deffa432.js';
import { j as Tooltip } from './Tooltip-f4db4da8.js';
import { s as stringToArray } from './string-cf2ce947.js';
import './createSvgIcon-d354a6e3.js';
import './DefaultPropsProvider-c607464a.js';

const mediaComponentAlignmentTableURL = makeApiUrl("gmdb_media_alignment_by_gm_ids");

const WIDTH_EXPANDED = "200px";
const WIDTH_COMPACT = "150px";
const WIDTH_ALIGNMENT_CELL = 40;
const ROOT_COMPONENT = "GMO_000002";

const findBranchFromTrunk = (id, tree) => {
    return tree.map((branch) => findNode(id, branch)).find((r) => !!r);
};
// https://stackoverflow.com/a/22222867/2207021
function findNode(id, currentNode) {
    let i, currentChild, result;
    if (id == currentNode.id) {
        return currentNode;
    }
    else {
        for (i = 0; i < currentNode.children.length; i += 1) {
            currentChild = currentNode.children[i];
            result = findNode(id, currentChild);
            if (result !== undefined) {
                return result;
            }
        }
        return undefined;
    }
}

const toggleFooterComponent = (id, data) => {
    const cloned = clone(data);
    const branch = findBranchFromTrunk(id, cloned);
    if (branch) {
        branch.isOpen = !branch.isOpen;
        return cloned;
    }
    else {
        return undefined;
    }
};

const componentTreeAtom = atom([]);
const useComponentTreeState = () => {
    return useAtomValue(componentTreeAtom);
};
const useComponentTreeMutators = () => {
    const setComponentTree = useSetAtom(componentTreeAtom);
    const toggleComponent = (update) => setComponentTree((prev) => toggleFooterComponent(update, prev) || []);
    return { toggleComponent, setComponentTree };
};

const FooterCell = ({ label, level, hasChildren, isOpen, id }) => {
    const { toggleComponent } = useComponentTreeMutators();
    const onClickFooterItem = (id) => toggleComponent(id);
    const Icon = hasChildren ? (isOpen ? (jsx(IconCompact, { sx: clickableIconStyle, onClick: () => onClickFooterItem(id) })) : (jsx(IconExpand, { sx: clickableIconStyle, onClick: () => onClickFooterItem(id) }))) : (jsx(IconBlank, { sx: iconStyle$1 }));
    return (jsxs(Wrapper$9, { children: [new Array(level).fill(null).map((r, index) => (jsx("span", { className: "spacer" }, index))), Icon, jsx("span", { className: "text", children: decodeHTMLEntities(label) })] }));
};
const Wrapper$9 = styled("div")({
    boxSizing: "border-box",
    width: WIDTH_ALIGNMENT_CELL,
    backgroundColor: THEME.COLOR.WHITE,
    whiteSpace: "nowrap",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: THEME.SIZE.S1,
    paddingBottom: THEME.SIZE.S4,
    "& > .text": {
        writingMode: "vertical-rl",
        transform: "translateX(-1px)",
    },
    "& > .spacer": {
        display: "block",
        height: THEME.SIZE.S3,
        flexGrow: 0,
        flexShrink: 0,
    },
});
const iconStyle$1 = {
    marginBottom: THEME.SIZE.S1,
    width: 24,
    height: 24,
};
const clickableIconStyle = {
    ...iconStyle$1,
    cursor: "pointer",
};

const isMediaExpanded = atom(false);
const useIsMediaExpendedState = () => {
    return useAtomValue(isMediaExpanded);
};
const useIsMediaExpandedMutators = () => {
    const setIsMediaExpanded = useSetAtom(isMediaExpanded);
    return { setIsMediaExpanded };
};

const isOrganismsExpanded = atom(false);
const useIsOrganismsExpendedState = () => {
    return useAtomValue(isOrganismsExpanded);
};
const useIsOrganismsExpandedMutators = () => {
    const setIsOrganismsExpanded = useSetAtom(isOrganismsExpanded);
    return { setIsOrganismsExpanded };
};

const FooterRow = ({ components }) => {
    const isMediaExpanded = useIsMediaExpendedState();
    const isOrganismsExpanded = useIsOrganismsExpendedState();
    return (jsxs(Wrapper$8, { children: [jsx(InfoSpacer, { className: isMediaExpanded ? "expand" : "compact" }), jsx(InfoSpacer, { className: isOrganismsExpanded ? "expand" : "compact" }), components.map((component) => (jsx$1(FooterCell, { ...component, key: component.id }))), jsx(ComponentSpacer, {})] }));
};
const Wrapper$8 = styled("div")({
    display: "flex",
    gap: 1,
    width: "100%",
    "& > *": {
        flexGrow: 0,
        flexShrink: 0,
    },
});
const InfoSpacer = styled("div")({
    backgroundColor: THEME.COLOR.WHITE,
    "&.expand": {
        width: WIDTH_EXPANDED,
    },
    "&.compact": {
        width: WIDTH_COMPACT,
    },
});
const ComponentSpacer = styled("div")({
    backgroundColor: THEME.COLOR.WHITE,
    flexGrow: "1 !important",
});

const HeaderCell = ({ label, onClickIcon, isExpanded }) => {
    return (jsxs(Wrapper$7, { className: isExpanded ? "expanded" : "compact", children: [jsx("span", { children: label }), isExpanded ? (jsx(IconCompact, { sx: iconStyle, onClick: onClickIcon })) : (jsx(IconExpand, { sx: iconStyle, onClick: onClickIcon }))] }));
};
const Wrapper$7 = styled("div")({
    display: "flex",
    backgroundColor: THEME.COLOR.WHITE,
    alignItems: "center",
    justifyContent: "space-between",
    padding: THEME.SIZE.S1,
    boxSizing: "border-box",
    "&.expanded": {
        width: WIDTH_EXPANDED,
    },
    "&.compact": {
        width: WIDTH_COMPACT,
    },
});
const iconStyle = {
    fontSize: 24,
    color: THEME.COLOR.GRAY700,
    cursor: "pointer",
};

const HeaderRow = ({ scrollable = false }) => {
    const isMediaExpanded = useIsMediaExpendedState();
    const isOrganismsExpanded = useIsOrganismsExpendedState();
    const { setIsMediaExpanded } = useIsMediaExpandedMutators();
    const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
    const onClickMediaExpandIcon = () => {
        setIsMediaExpanded(!isMediaExpanded);
    };
    const onClickOrganismExpandIcon = () => {
        setIsOrganismsExpanded(!isOrganismsExpanded);
    };
    const Wrapper = scrollable ? ScrollableWrapper : DefaultWrapper;
    return (jsxs(Wrapper, { children: [jsx(HeaderCell, { label: "Media", isExpanded: isMediaExpanded, onClickIcon: onClickMediaExpandIcon }), jsx(HeaderCell, { label: "Organisms", isExpanded: isOrganismsExpanded, onClickIcon: onClickOrganismExpandIcon }), jsx(Components, { children: "Components" })] }));
};
const DefaultWrapper = styled("div")({
    display: "flex",
    gap: "1px",
    width: "100%",
    "& > *": {
        flexGrow: 0,
        flexShrink: 0,
    },
});
const ScrollableWrapper = styled("div")({
    display: "flex",
    gap: "1px",
    width: "100%",
    "& > *": {
        flexGrow: 0,
        flexShrink: 0,
    },
    position: "absolute",
    top: 0,
    left: 0,
    border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
    backgroundColor: THEME.COLOR.GRAY_LINE,
});
const Components = styled("div")({
    backgroundColor: THEME.COLOR.WHITE,
    display: "flex",
    alignItems: "center",
    padding: THEME.SIZE.S1,
    flexGrow: "1 !important",
});

const AlignmentCell = ({ state, label, id }) => {
    return (jsx(Wrapper$6, { children: jsx(Tooltip, { title: label, placement: "top", arrow: true, slotProps: { popper: { disablePortal: true } }, children: jsx("a", { href: makeLinkPath(`${PATH_COMPONENT}${id}`), target: "_blank", className: `icon-${state} icon`, rel: "noreferrer", children: jsx("span", {}) }) }) }));
};
const Wrapper$6 = styled("div")({
    boxSizing: "border-box",
    backgroundColor: THEME.COLOR.WHITE,
    // padding: SIZE1,
    padding: THEME.SIZE.S1,
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    flexGrow: 0,
    ".icon": {
        display: "flex",
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    ".icon-available > span": {
        display: "block",
        width: "100%",
        height: "100%",
        backgroundColor: THEME.COLOR.PRIMARY,
    },
    ".icon-grouped > span": {
        display: "block",
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        border: `2px solid ${THEME.COLOR.PRIMARY}`,
    },
    ".icon-none > span": {
        display: "none",
        boxSizing: "border-box",
        width: "100%",
        height: 4,
        backgroundColor: THEME.COLOR.GRAY,
        borderRadius: 4,
    },
});

const InfoCell = ({ info, linkBase, expanded, priority = [] }) => {
    return expanded ? (jsx(Expanded, { info: sortInfo(info, priority), linkBase, priority })) : (jsx(Compact, { info: sortInfo(info, priority), linkBase, priority }));
};
const sortInfo = (info, priority) => {
    return [
        ...priority.map((id) => info.find((item) => item.id === id)).filter((item) => !!item),
        ...info.filter((item) => !priority.includes(item.id)),
    ];
};
const Compact = ({ info, linkBase, priority = [] }) => {
    const myPriorityItems = reactExports.useMemo(() => info.map((item) => item.id).filter((str) => priority.includes(str)), [info, priority]);
    const items = reactExports.useMemo(() => (myPriorityItems.length ? info.filter((item) => priority.includes(item.id)) : [info[0]]), [myPriorityItems, info]);
    const restText = reactExports.useMemo(() => {
        const remain = myPriorityItems.length ? info.length - myPriorityItems.length : info.length - 1;
        switch (remain) {
            case 0:
                return "";
            case 1:
                return ` + ${remain} organism`;
            default:
                return ` + ${remain} organisms`;
        }
    }, [myPriorityItems, info]);
    return (jsx(Wrapper$5, { className: "compact", children: jsx("div", { className: "inner", children: jsxs("div", { className: "text", children: [items.map((item, index) => (jsxs("span", { children: [item.id ? (jsx(Tooltip, { title: item.label, placement: "top", arrow: true, slotProps: { popper: { disablePortal: true } }, children: jsx("a", { href: makeLinkPath(`${linkBase}${item.id}`), target: getLinkTarget(`${linkBase}${item.id}`), children: item.id }) })) : (jsx(Fragment, { children: item.label })), index < items.length - 1 ? ", " : ""] }, index))), jsx("span", { style: { whiteSpace: "nowrap" }, children: restText })] }) }) }));
};
const Expanded = ({ info, linkBase, priority = [] }) => {
    return (jsx(Wrapper$5, { className: "expanded", children: jsx("div", { className: "inner", children: [
                ...info.filter((item) => priority.includes(item.id)),
                ...info.filter((item) => !priority.includes(item.id)),
            ].map((item) => (jsxs("div", { className: "text", children: [jsx("a", { href: makeLinkPath(`${linkBase}${item.id}`), target: getLinkTarget(`${linkBase}${item.id}`), children: item.id }), jsx("span", { children: item.label })] }, item.id))) }) }));
};
const Wrapper$5 = styled("div")({
    fontSize: "14px",
    backgroundColor: THEME.COLOR.WHITE,
    boxSizing: "border-box",
    padding: THEME.SIZE.S1,
    display: "block",
    minHeight: "40px",
    "& .inner": {
        paddingTop: "4px",
    },
    "& a": {
        color: THEME.COLOR.PRIMARY,
        textDecoration: "none",
    },
    "&.compact": {
        width: WIDTH_COMPACT,
        "& .inner": {
            display: "flex",
            flexWrap: "wrap",
        },
        "& .text": {
            marginRight: THEME.SIZE.S1,
        },
    },
    "&.expanded": {
        width: WIDTH_EXPANDED,
        "& .text": {
            display: "flex",
            flexDirection: "column",
            "& + .text": {
                marginTop: THEME.SIZE.S1,
            },
        },
    },
});

const MediaRow = ({ medium, organisms, components, prioritizedOrganism = [], }) => {
    const isMediaExpanded = useIsMediaExpendedState();
    const isOrganismsExpanded = useIsOrganismsExpendedState();
    return (jsxs(Wrapper$4, { children: [jsx(InfoCell, { info: [medium], expanded: isMediaExpanded, linkBase: PATH_MEDIUM }), jsx(InfoCell, { info: organisms.length ? organisms : [{ id: "", label: "No organisms found" }], expanded: isOrganismsExpanded, linkBase: PATH_TAXON, priority: prioritizedOrganism }), components.map((component) => (jsx$1(AlignmentCell, { ...component, key: component.id }))), jsx(Spacer$1, {})] }));
};
const Wrapper$4 = styled("div")({
    display: "flex",
    gap: 1,
    width: "100%",
    "& > *": {
        flexGrow: 0,
        flexShrink: 0,
    },
});
const Spacer$1 = styled("div")({
    backgroundColor: THEME.COLOR.WHITE,
    flexGrow: "1 !important",
});

const makeAlignmentData = (data, footerComponents) => {
    return data.media.map((medium) => makeMediaRowProp(medium, data.organisms, data.components, footerComponents));
};
const makeMediaRowProp = (mediumData, organismsData, componentsData, footerList) => {
    const medium = {
        id: mediumData.gm_id,
        label: mediumData.name,
    };
    const organisms = mediumData.organisms.map((taxid) => organismsData
        .filter((organism) => organism.tax_id === taxid)
        .map((organism) => ({ id: organism.tax_id, label: organism.name }))[0]);
    const components = footerList.map((data) => {
        return {
            id: data.id,
            label: data.label,
            state: findComponentState(data.id, mediumData.components, componentsData, footerList),
        };
    });
    return {
        medium,
        organisms,
        components,
    };
};
const findComponentState = (id, mediumComponents, allComponents, footerList) => {
    if (mediumComponents.find((candidate) => candidate === id)) {
        return "available";
    }
    const groupedId = listChildComponents(id, allComponents).find((child) => mediumComponents.find((candidate) => candidate === child));
    if (groupedId) {
        const isOpen = footerList.find((item) => item.id === id)?.isOpen === true;
        return isOpen ? "grouped" : "available";
    }
    return "none";
};
const listChildComponents = (id, components) => {
    const result = [];
    const addItem = (parentId) => {
        const children = components.filter((c) => c.parent === parentId).map((c) => c.gmo_id);
        result.push(...children);
        children.forEach((c) => addItem(c));
    };
    addItem(id);
    return result;
};

const makeComponentTree = (components) => {
    const items = components.map((item) => ({
        name: item.name,
        id: item.gmo_id,
        level: 0,
        parent: item.parent,
        children: [],
        isOpen: false,
        func: item.function,
    }));
    const result = items.filter((item) => !item.parent || item.parent === ROOT_COMPONENT);
    items.forEach((item) => (item.children = items.filter((filtering) => filtering.parent === item.id)));
    items.forEach((item) => (item.level = getItemLevel(item, items)));
    return result;
};
const getItemLevel = (item, items) => {
    let parent = item;
    let level = -1;
    do {
        level++;
        parent = items.find((found) => found.id === parent.parent);
    } while (parent);
    return level;
};

const makeFooterComponents = (data) => {
    const result = [];
    data.forEach((item) => {
        addToCollection(item, result);
    });
    return result;
};
const addToCollection = (data, collection) => {
    collection.push({
        label: data.name,
        level: data.level,
        hasChildren: data.children.length > 0,
        isOpen: data.isOpen,
        id: data.id,
    });
    if (data.isOpen) {
        data.children.forEach((item) => {
            addToCollection(item, collection);
        });
    }
};

const AlignmentTable = ({ data, prioritizedOrganism }) => {
    const componentTree = useComponentTreeState();
    const { setComponentTree } = useComponentTreeMutators();
    const components = reactExports.useMemo(() => makeFooterComponents(componentTree), [componentTree]);
    const footerProps = reactExports.useMemo(() => ({ components }), [components]);
    const rowProps = reactExports.useMemo(() => makeAlignmentData(data, components), [data, components]);
    reactExports.useEffect(() => {
        setComponentTree(makeComponentTree(data.components));
    }, [data]);
    return (jsxs(Wrapper$3, { children: [jsx(HeaderRow, {}), rowProps.map((props) => (jsx$1(MediaRow, { ...props, key: props.medium.id, prioritizedOrganism: prioritizedOrganism }))), jsx(FooterRow, { ...footerProps })] }));
};
const Wrapper$3 = styled("div")({
    display: "flex",
    gap: 1,
    flexDirection: "column",
    backgroundColor: THEME.COLOR.GRAY_LINE,
    padding: 1,
});

const InfoColumns = ({ data, prioritizedOrganism = [] }) => {
    const isMediaExpanded = useIsMediaExpendedState();
    const isOrganismsExpanded = useIsOrganismsExpendedState();
    const { setIsMediaExpanded } = useIsMediaExpandedMutators();
    const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
    const onClickMediaExpandIcon = () => {
        setIsMediaExpanded(!isMediaExpanded);
    };
    const onClickOrganismExpandIcon = () => {
        setIsOrganismsExpanded(!isOrganismsExpanded);
    };
    return (jsxs(Wrapper$2, { children: [jsxs(Header, { children: [jsx(HeaderCell, { label: "Media", isExpanded: isMediaExpanded, onClickIcon: onClickMediaExpandIcon }), jsx(HeaderCell, { label: "Organisms", isExpanded: isOrganismsExpanded, onClickIcon: onClickOrganismExpandIcon })] }), data.media.map((m) => {
                const organisms = m.organisms.map((taxid) => {
                    const organism = data.organisms.find((o) => o.tax_id === taxid);
                    const id = organism ? organism.tax_id : "";
                    const label = organism ? organism.name : "";
                    return { id, label };
                });
                return (jsx(MediaRow, { medium: { id: m.gm_id, label: m.name }, organisms: organisms, components: [], prioritizedOrganism: prioritizedOrganism }, m.gm_id));
            }), jsxs(SpacerRow, { children: [jsx(Spacer, { className: isMediaExpanded ? "expanded" : "compact" }), jsx(Spacer, { className: isOrganismsExpanded ? "expanded" : "compact" })] })] }));
};
const Wrapper$2 = styled("div")({
    display: "flex",
    gap: "1px",
    flexDirection: "column",
    backgroundColor: THEME.COLOR.GRAY_LINE,
    width: "fit-content",
    height: "100%",
    padding: "1px 0 1px 1px",
    boxSizing: "border-box",
    //
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
});
const Header = styled("div")({
    width: "fit-content",
    display: "flex",
    gap: "1px",
});
const SpacerRow = styled("div")({
    flexGrow: 1,
    gap: "1px",
    display: "flex",
    borderRight: `1px solid transparent`,
});
const Spacer = styled("span")({
    backgroundColor: THEME.COLOR.WHITE,
    "&.expanded": {
        width: WIDTH_EXPANDED,
    },
    "&.compact": {
        width: WIDTH_COMPACT,
    },
});

const ScrollableTable = ({ data, prioritizedOrganism = [] }) => {
    return (jsxs(Wrapper$1, { children: [jsx(HeaderRow, { scrollable: true }), jsx(InfoColumns, { data: data, prioritizedOrganism: prioritizedOrganism }), jsx("div", { className: "inner", children: jsx(AlignmentTable, { data: data, prioritizedOrganism: prioritizedOrganism }) })] }));
};
const Wrapper$1 = styled("div")({
    position: "relative",
    overflow: "hidden",
    backgroundColor: THEME.COLOR.GRAY_LINE,
    "& > .inner": {
        overflowX: "auto",
    },
});

const useDataQuery = (gm_ids, stanzaDispatch) => {
    return useQuery({
        queryKey: ["media-alignment", { gm_ids }],
        queryFn: async () => {
            stanzaDispatch("STANZA_ON_QUERY_DATA", gm_ids);
            const response = await getData(mediaComponentAlignmentTableURL, {
                gm_ids: gm_ids.join(","),
            });
            if (!response.body)
                throw new Error("No data");
            stanzaDispatch("STANZA_ON_LOAD_DATA", response.body);
            return response.body;
        },
        enabled: gm_ids.length > 0,
        staleTime: Infinity,
    });
};
const App = ({ gm_ids, stanzaElement, prioritizedOrganism = [] }) => {
    const dispatchStanzaEvent = reactExports.useCallback((eventName, detail) => {
        if (!stanzaElement)
            return;
        const e = new CustomEvent(eventName, { bubbles: true, composed: true, detail });
        stanzaElement.dispatchEvent(e);
    }, [stanzaElement]);
    const dataQuery = useDataQuery(gm_ids, dispatchStanzaEvent);
    if (!dataQuery.data)
        return jsx(Wrapper, { children: "Loading..." });
    return (jsx(Wrapper, { children: jsx(ScrollableTable, { data: dataQuery.data, prioritizedOrganism: prioritizedOrganism }) }));
};
const Wrapper = styled("div")({
    minHeight: 100,
    backgroundColor: THEME.COLOR.WHITE,
    borderRadius: 5,
    padding: THEME.SIZE.S1,
});

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const gm_ids = stringToArray(this.params.gm_ids);
        const prioritizedOrganism = this.params.prioritized_tax_ids
            ? stringToArray(this.params.prioritized_tax_ids)
            : [];
        return jsx(App, { gm_ids, stanzaElement: this.root, prioritizedOrganism });
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
	"@id": "gmdb-media-alignment-table-by-components",
	"stanza:label": "Media alignment table by components",
	"stanza:definition": "Aligns media based on their included components",
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
		"stanza:key": "prioritized_tax_ids",
		"stanza:type": "string",
		"stanza:example": "123456,12345",
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
//# sourceMappingURL=gmdb-media-alignment-table-by-components.js.map
