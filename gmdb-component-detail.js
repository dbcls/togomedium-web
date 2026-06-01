import { d as defineStanzaElement } from './stanza-0294ba58.js';
import { s as styled, T as THEME, j as jsx, a as jsxs, F as Fragment, b as TogoMediumReactStanza } from './StanzaReactProvider-6021d3e7.js';
import { o as object, s as string, a as array, m as makeApiUrl, g as getData } from './makeApiUrl-bc69b05b.js';
import { m as makeLinkPath, P as PATH_COMPONENT, g as getLinkTarget } from './getLinkTarget-9ee27b52.js';
import { d as decodeHTMLEntities } from './decodeHtmlEntities-9696853d.js';
import { C as ColorButton, a as ColWrapper } from './ColWrapper-9efe3dc9.js';
import { I as InfoId, a as InfoTitle, S as SubHeading } from './SubHeading-4bfbc512.js';
import { S as StandardParagraph, W as WikipediaView, f as fetchWikipediaData } from './fetchWikipediaData-4f89b3b0.js';
import { S as StanzaWrapper } from './StanzaWrapper-9552a4ac.js';
import { T as TagList } from './TagList-9992f5dd.js';
import { u as useQuery } from './useQuery-c819e3b3.js';
import './isArray-56c7d056.js';

const PATH_COMPONENT_DETAIL = "/gmdb_component_by_gmoid";
const componentClassSchema = object({
    gmo_id: string(),
    uri: string(),
    label_en: string(),
});
object({
    pref_label: string(),
    id: string(),
    label_ja: string(),
    alt_labels_en: array(string()),
    alt_labels_ja: array(string()),
    super_classes: array(componentClassSchema),
    sub_classes: array(componentClassSchema),
    properties: array(componentClassSchema),
    roles: array(componentClassSchema),
    links: array(string()),
});
object({
    gmo_id: string(),
});

const LinkList = styled("ul")({
    li: {
        display: "flex",
        gap: 8,
    },
    a: {
        color: THEME.STANZA_COLOR.PRIMARY_DARK,
    },
});

const StanzaView = ({ prefLabel, gmoId, altLabels, properties, roles, superClasses, subClasses, links, wikipediaData, }) => {
    return (jsx(StanzaWrapper, { children: jsxs(ColWrapper, { children: [jsxs("div", { children: [jsxs(InfoId, { children: [jsx("span", { children: "GMO ID: " }), jsx("span", { children: gmoId })] }), jsx(InfoTitle, { children: decodeHTMLEntities(prefLabel) }), !!altLabels.length && (jsxs(StandardParagraph, { children: [altLabels.length === 1 ? "Alternative label" : "Alternative labels", ":", jsx("br", {}), altLabels.map((str, i, arr) => (jsx("span", { children: `${decodeHTMLEntities(str)}${addLastComma(i, arr)}` }, str)))] })), jsxs("div", { children: [!!properties.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: properties.length === 1 ? "Component type" : "Component types" }), jsx(StandardParagraph, { children: properties.map((item, i, arr) => (jsx("span", { children: `${item.label_en}${addLastComma(i, arr)}` }, i))) })] })), !!roles.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: roles.length === 1 ? "Role" : "Roles" }), jsx("ul", { children: roles.map((item, i) => (jsx("li", { children: item.label_en }, i))) })] })), !!superClasses.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: superClasses.length === 1 ? "Super class" : "Super classes" }), jsx(LinkList, { children: superClasses.map((item, i) => (jsxs("li", { children: [jsx("a", { href: makeLinkPath(`${PATH_COMPONENT}${item.gmo_id}`), target: getLinkTarget(`${PATH_COMPONENT}${item.gmo_id}`), children: item.gmo_id }), jsx("span", { children: decodeHTMLEntities(item.label_en) })] }, i))) })] })), !!subClasses.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: subClasses.length === 1 ? "Sub class" : "Sub classes" }), jsx(LinkList, { children: subClasses.map((item, i) => (jsxs("li", { children: [jsx("a", { href: makeLinkPath(`${PATH_COMPONENT}${item.gmo_id}`), target: getLinkTarget(`${PATH_COMPONENT}${item.gmo_id}`), children: item.gmo_id }), jsx("span", { children: decodeHTMLEntities(item.label_en) })] }, i))) })] })), !!links.length && (jsxs(Fragment, { children: [jsx(SubHeading, { children: links.length === 1 ? "External link" : "External links" }), jsx(TagList, { children: links.map((item, i) => (jsx(ColorButton, { href: item.uri, target: getLinkTarget(item.uri), children: item.label }, i))) })] }))] })] }), wikipediaData && jsx(WikipediaView, { ...wikipediaData })] }) }));
};
const addLastComma = (index, arr) => {
    return index === arr.length - 1 ? "" : ", ";
};

const parseData = (res) => {
    return {
        prefLabel: res.pref_label,
        gmoId: res.id,
        altLabels: res.alt_labels_en,
        properties: res.properties,
        roles: res.roles,
        superClasses: res.super_classes,
        subClasses: res.sub_classes,
        links: res.links
            .filter((str) => !!getLinkLabel(str))
            .map((str) => ({
            label: getLinkLabel(str),
            uri: str,
        })),
    };
};
const getLinkLabel = (link) => {
    switch (true) {
        case /pccompound\/.+/.test(link):
            return "PubChem";
        case /wikipedia/.test(link):
            return "Wikipedia";
        // case /ncicb/.test(link):
        //   return "NCI Thesaurus";
        case /CHEBI/.test(link):
            return "ChEBI";
        case /SNOMEDCT/.test(link):
            return "SNOMED-CT";
        case /dsmz/.test(link):
            return "MediaDive";
        default:
            return null;
    }
};

const apiUrl = makeApiUrl(PATH_COMPONENT_DETAIL);
const useComponentDataQuery = (gmo_id) => {
    const { data, isLoading } = useQuery({
        queryKey: [{ gmo_id }],
        queryFn: async () => {
            const result = await getData(apiUrl, {
                gmo_id,
            });
            if (!result.body) {
                throw new Error("No data found");
            }
            return parseData(result.body);
        },
        staleTime: Infinity,
    });
    return { componentData: data, isLoading };
};
const useWikipediaQuery = (component) => {
    const wikipediaLink = component?.links.find((item) => item.label === "Wikipedia");
    const { data } = useQuery({
        queryKey: [{ wikipedia: wikipediaLink?.uri }],
        queryFn: async () => await fetchWikipediaData(wikipediaLink?.uri ?? ""),
        staleTime: Infinity,
        enabled: wikipediaLink !== undefined,
    });
    return data;
};
const App = ({ gmo_id }) => {
    const { componentData, isLoading } = useComponentDataQuery(gmo_id);
    const wikipediaData = useWikipediaQuery(componentData);
    if (isLoading || !componentData)
        return jsx(Fragment, { children: "Loading..." });
    return jsx(StanzaView, { ...componentData, wikipediaData: wikipediaData });
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const gmo_id = this.params.gmo_id;
        return jsx(App, { stanzaElement: this.root, gmo_id: gmo_id });
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
	"@id": "gmdb-component-detail",
	"stanza:label": "Component detail",
	"stanza:definition": "Provides detailed information about a specific component identified by a unique GMO ID.",
	"stanza:type": "Stanza",
	"stanza:display": "Text",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda (YOHAK)",
	"stanza:address": "satoshionoda@yohak.design",
	"stanza:contributor": [
],
	"stanza:created": "2021-03-07",
	"stanza:updated": "2025-03-22",
	"stanza:parameter": [
	{
		"stanza:key": "gmo_id",
		"stanza:example": "GMO_001005",
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
//# sourceMappingURL=gmdb-component-detail.js.map
