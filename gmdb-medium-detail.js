import { d as defineStanzaElement } from './stanza-3bc73db1.js';
import { s as styled, j as jsx, T as THEME, a as jsxs, F as Fragment, b as TogoMediumReactStanza } from './StanzaReactProvider-6984324a.js';
import { u as useQuery } from './useQuery-8b12d83b.js';
import { m as makeLinkPath, g as getLinkTarget } from './getLinkTarget-54075a13.js';
import { d as decodeHTMLEntities } from './decodeHtmlEntities-9696853d.js';
import { I as InfoId, a as InfoTitle, S as SubHeading } from './SubHeading-37d9b2c1.js';
import { S as StanzaWrapper } from './StanzaWrapper-34fcc0ed.js';
import { a as PATH_MEDIUM, P as PATH_COMPONENT } from './consts-deffa432.js';
import { g as getMedia } from './getMedia-b567754c.js';
import './index-7a88ba65.js';
import './index-b1a62205.js';
import './getData-deef20ca.js';

const RecipeComment = ({ comment }) => {
    return jsx(Wrapper, { children: parseText(comment) });
};
const Wrapper = styled("div")({
    margin: "4px 0",
});
const parseText = (str) => {
    return decodeHTMLEntities(str.replace(/℃/g, "°C"));
};

const RecipeTable = ({ name, items, referenceId }) => {
    return (jsxs("div", { children: [jsxs(TitleWrapper, { children: [jsx("h4", { children: name }), referenceId && (jsxs("span", { children: ["(See also ", jsx("a", { href: makeLinkPath(`${PATH_MEDIUM}${referenceId}`), children: referenceId }), ")"] }))] }), jsxs(Table, { children: [jsx("thead", { children: jsxs("tr", { children: [jsx("th", { className: "id", children: "GMO ID" }), jsx("th", { className: "name", children: "Component" }), jsx("th", { className: "name", children: "Original label" }), jsx("th", { className: "volume", children: "\u00A0" }), jsx("th", { className: "volume", children: "Amount" })] }) }), jsx("tbody", { children: items.map((item, index) => {
                            const url = `${PATH_COMPONENT}${item.id}`;
                            return (jsxs("tr", { children: [jsx("td", { className: "id", children: jsx("a", { href: makeLinkPath(url), target: getLinkTarget(url), children: item.id }) }), jsx("td", { className: "name", children: decodeHTMLEntities(item.componentLabel) }), jsx("td", { className: "name", children: jsx("span", { children: item.componentName.replace(/\(see.*\)/, "(see below)") }) }), jsxs("td", { className: "volume", children: [jsx("span", { children: item.concValue }), jsx("span", { children: item.concUnit })] }), jsxs("td", { className: "volume", children: [jsx("span", { children: item.volume }), jsx("span", { children: item.unit })] })] }, index));
                        }) })] })] }));
};
const TitleWrapper = styled("div")({
    marginTop: 16,
    display: "flex",
    gap: 16,
    span: {
        paddingTop: 2,
    },
    a: {
        color: THEME.STANZA_COLOR.PRIMARY_DARK,
    },
    h4: {
        fontSize: 18,
    },
});
const Table = styled("table")({
    width: "100%",
    borderCollapse: "collapse",
    margin: "4px 0 16px",
    border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
    a: {
        color: THEME.STANZA_COLOR.PRIMARY_DARK,
    },
    th: {
        border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
        padding: 8,
        textAlign: "left",
    },
    td: {
        border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
        padding: 8,
        textAlign: "left",
    },
    tbody: {
        tr: {
            "&:nth-of-type(odd)": {
                backgroundColor: "#f2f2f2",
            },
        },
    },
    ".id": {
        width: "10%",
        whiteSpace: "nowrap",
    },
    ".name": {
        width: "35%",
    },
    ".volume": {
        width: "10%",
        whiteSpace: "nowrap",
        span: {
            display: "inline-block",
            "&:first-of-type": {
                width: "60%",
                textAlign: "right",
                boxSizing: "border-box",
                paddingRight: 4,
            },
            "&:last-of-type": {
                width: "40%",
            },
        },
    },
});

const StanzaView = ({ id, originalId, srcUrl, srcLabel, name, ph, components, extraComponents, }) => {
    return (jsxs(StanzaWrapper, { children: [jsxs(InfoId, { children: [jsx("span", { children: "Growth Medium ID:\u00A0" }), jsx("span", { children: id })] }), srcUrl && (jsxs(InfoId, { children: [jsx("span", { children: "Information source:\u00A0" }), jsx("a", { href: srcUrl, target: getLinkTarget(srcUrl), rel: "noreferrer", children: originalId || srcLabel || id })] })), jsxs(InfoTitle, { children: ["[", id, "] ", name && name !== "(Unnamed medium)" && decodeHTMLEntities(name), ph && jsxs("small", { children: ["(pH", ph, ")"] })] }), components.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: "Components" }), components.map((component, index) => {
                        if ("comment" in component) {
                            return (jsx(RecipeComment, { ...component }, index));
                        }
                        else {
                            return (jsx(RecipeTable, { ...component }, index));
                        }
                    })] })), extraComponents.map((item, i) => {
                return (jsx("div", { children: item.components.map((component, index) => {
                        if (!component)
                            return jsx(Fragment, {});
                        if ("comment" in component) {
                            return (jsx(RecipeComment, { ...component }, index));
                        }
                        else {
                            return (jsx(RecipeTable, { ...component, referenceId: item.id }, index));
                        }
                    }) }, i));
            })] }));
};

const useMediaDataQuery = (gm_id) => {
    const { data, isLoading } = useQuery({
        queryKey: [{ gm_id }],
        queryFn: async () => getMedia(gm_id),
        staleTime: Infinity,
        enabled: gm_id !== undefined,
    });
    return { mediaData: data, isLoading };
};
const App = ({ gm_id }) => {
    const { mediaData, isLoading } = useMediaDataQuery(gm_id);
    if (isLoading || !mediaData)
        return jsx(Fragment, { children: "Loading..." });
    return jsx(StanzaView, { ...mediaData });
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const gm_id = this.params.gm_id;
        return jsx(App, { gm_id: gm_id });
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
	"@id": "gmdb-medium-detail",
	"stanza:label": "Medium detail",
	"stanza:definition": "Provides detailed information about a specific medium.",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda (YOHAK)",
	"stanza:address": "satoshionoda@yohak.design",
	"stanza:contributor": [
],
	"stanza:created": "2021-03-05",
	"stanza:updated": "2025-03-22",
	"stanza:parameter": [
	{
		"stanza:key": "gm_id",
		"stanza:example": "NBRC_M249",
		"stanza:description": "",
		"stanza:required": true
	}
],
	"stanza:menu-placement": "none",
	"stanza:style": [
	{
		"stanza:key": "--color-primary",
		"stanza:type": "color",
		"stanza:default": "#8FC31F",
		"stanza:description": "highlighted color of the UI"
	}
]
};

var templates = [
  
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-medium-detail.js.map
