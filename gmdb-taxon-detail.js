import { d as defineStanzaElement } from './stanza-3bc73db1.js';
import { s as styled, T as THEME, j as jsx, a as jsxs, F as Fragment, b as TogoMediumReactStanza } from './StanzaReactProvider-6984324a.js';
import { u as useQuery } from './useQuery-8b12d83b.js';
import { C as ColorButton, a as ColWrapper } from './ColWrapper-29086544.js';
import { I as InfoId, a as InfoTitle, S as SubHeading } from './SubHeading-37d9b2c1.js';
import { L as LineageList } from './LineageList-7cdd5db3.js';
import { S as StandardParagraph, W as WikipediaView, f as fetchWikipediaData } from './fetchWikipediaData-32ce1ccc.js';
import { S as StanzaWrapper } from './StanzaWrapper-34fcc0ed.js';
import { m as makeApiUrl, g as getData } from './getData-deef20ca.js';
import './index-7a88ba65.js';
import './definitions-2845d052.js';
import './consts-deffa432.js';
import './getLinkTarget-54075a13.js';
import './string-679c835b.js';

const CapsuleList = ({ labels }) => (jsx(CapsuleListWrapper, { children: labels.map((label, index) => (jsx("li", { children: label }, index))) }));
const CapsuleListWrapper = styled("ul")({
    display: "flex",
    marginTop: THEME.SIZE.S1,
    marginBottom: -THEME.SIZE.S1,
    flexWrap: "wrap",
    li: {
        border: `1px solid ${THEME.STANZA_COLOR.PRIMARY}`,
        padding: `${THEME.SIZE.S05}px ${THEME.SIZE.S1 * 1.25}px`,
        borderRadius: THEME.ROUND.BASE * 4,
        marginRight: THEME.SIZE.S1,
        marginBottom: THEME.SIZE.S1,
    },
});

const linkNCBI = "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=";
const linkTogoGenome = "http://togogenome.org/organism/";
const StanzaView = ({ taxid, scientificName, authorityName, lineage, typeMaterials, otherTypeMaterials, wikipediaData, }) => {
    return (jsx(StanzaWrapper, { children: jsxs(ColWrapper, { children: [jsxs("div", { children: [jsxs(InfoId, { children: [jsx("span", { children: "Taxonomy ID: " }), jsx("span", { children: taxid }), jsxs("div", { className: "tag-list", children: [jsx(ColorButton, { target: "_blank", href: `${linkNCBI}${taxid}`, rel: "noreferrer", children: "NCBI" }), jsx(ColorButton, { target: "_blank", href: `${linkTogoGenome}${taxid}`, rel: "noreferrer", children: "TogoGenome" })] })] }), jsx(InfoTitle, { children: scientificName }), authorityName && (jsxs(StandardParagraph, { children: ["Authority name:", jsx("br", {}), authorityName] })), jsxs("div", { children: [jsx(SubHeading, { children: "Lineage" }), jsx(LineageList, { lineage: lineage })] }), !!typeMaterials.length && (jsxs("div", { children: [jsx(SubHeading, { children: "Type strains" }), jsx(CapsuleList, { labels: typeMaterials })] })), !!otherTypeMaterials.length && (jsx("div", { children: otherTypeMaterials.map((mat, index) => (jsxs("div", { children: [jsxs(SubHeading, { children: ["Heterotypic synonyms: ", mat.key, " "] }), jsx(CapsuleList, { labels: mat.labels })] }, index))) }))] }), wikipediaData?.description && !lineage.species && jsx(WikipediaView, { ...wikipediaData })] }) }));
};

const taxonDetailURL = makeApiUrl("gmdb_organism_by_taxid");

const unescapeJsonString = (str) => {
    return str?.replace(/\\/g, "");
};

const parseLineage = (lineage) => lineage.reduce((accum, current) => {
    return current.label === "NA"
        ? { ...accum }
        : {
            ...accum,
            [current.rank]: {
                taxid: current.taxid.toString(),
                label: current.label,
            },
        };
}, {});

const parseData = (body) => {
    const taxid = body.taxid.toString();
    const scientificName = body.scientific_name;
    const authorityName = unescapeJsonString(body.authority_name);
    const lineage = parseLineage(body.lineage);
    const typeMaterials = body.type_material.map((item) => item.label);
    const otherTypeMaterials = parseOtherTypeMaterial(body.other_type_material);
    return { taxid, scientificName, authorityName, lineage, typeMaterials, otherTypeMaterials };
};
const parseOtherTypeMaterial = (data) => {
    return data
        .map((obj) => obj.name)
        .reduce((a, b) => {
        if (a.indexOf(b) < 0) {
            a.push(b);
        }
        return a;
    }, [])
        .map((key) => ({
        key,
        labels: data.filter((item) => item.name === key).map((elm) => elm.label),
    }));
};
const getTaxonData = async (tax_id) => {
    const result = await getData(taxonDetailURL, {
        tax_id,
    });
    if (!result.body) {
        throw new Error("No data found");
    }
    return parseData(result.body);
};

const useTaxonDataQuery = (tax_id) => {
    const { data, isLoading } = useQuery({
        queryKey: [{ tax_id }],
        queryFn: async () => getTaxonData(tax_id),
        staleTime: Infinity,
    });
    return { taxonData: data, isLoading };
};
const useWikipediaQuery = (scientificName) => {
    const wikipediaLink = `https://en.wikipedia.org/wiki/${scientificName}`;
    const { data } = useQuery({
        queryKey: ["wikipedia", scientificName],
        queryFn: async () => await fetchWikipediaData(wikipediaLink),
        staleTime: Infinity,
        enabled: scientificName !== undefined,
    });
    return data;
};
const App = ({ tax_id }) => {
    const { taxonData, isLoading } = useTaxonDataQuery(tax_id);
    const wikipediaData = useWikipediaQuery(taxonData?.scientificName);
    if (isLoading || !taxonData)
        return jsx(Fragment, { children: "Loading..." });
    return (jsx(StanzaView, { ...taxonData, wikipediaData: wikipediaData }));
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const tax_id = this.params.tax_id;
        return (jsx(App, { stanzaElement: this.root, tax_id: tax_id }));
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
	"@id": "gmdb-taxon-detail",
	"stanza:label": "Taxon detail",
	"stanza:definition": "Provides detailed information about a taxonomic entity, utilizing the provided NCBI TaxId",
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
		"stanza:key": "tax_id",
		"stanza:example": "1301",
		"stanza:description": "NCBI TaxId",
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
    + "!!!</p>\n";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-taxon-detail.js.map
