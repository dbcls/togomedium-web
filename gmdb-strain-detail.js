import { d as defineStanzaElement } from './stanza-0294ba58.js';
import { j as jsx, a as jsxs, F as Fragment, b as TogoMediumReactStanza } from './StanzaReactProvider-6021d3e7.js';
import { g as getLinkTarget } from './getLinkTarget-9ee27b52.js';
import { a as ColWrapper, C as ColorButton } from './ColWrapper-9efe3dc9.js';
import { I as InfoId, a as InfoTitle, S as SubHeading } from './SubHeading-4bfbc512.js';
import { L as LineageList } from './LineageList-5eb88492.js';
import { S as StanzaWrapper } from './StanzaWrapper-9552a4ac.js';
import { T as TagList } from './TagList-9992f5dd.js';
import { o as object, s as string, a as array, n as number, g as getData, m as makeApiUrl } from './makeApiUrl-bc69b05b.js';
import { u as useQuery } from './useQuery-c819e3b3.js';
import './definitions-aea592e4.js';
import './string-679c835b.js';
import './isArray-56c7d056.js';

const StanzaView = ({ strainId, strainName, infoSources, taxonomy }) => {
    return (jsx(StanzaWrapper, { children: jsx(ColWrapper, { children: jsxs("div", { children: [jsxs(InfoId, { children: [jsx("span", { children: "Strain Id: " }), jsx("span", { children: strainId })] }), jsx(InfoTitle, { children: strainName }), jsx(SubHeading, { children: infoSources.length === 1 ? "Source strain" : "Source strains" }), jsx(TagList, { children: infoSources.map((source, index) => (jsx(ColorButton, { href: source.url, target: getLinkTarget(source.url), children: source.label }, index))) }), taxonomy && (jsxs("div", { children: [jsx(SubHeading, { children: "Taxonomic Lineage" }), jsx(LineageList, { lineage: taxonomy.lineage })] }))] }) }) }));
};

const strainDetailOtherStrainSchema = object({
    other_strain_id: string(),
    other_strain_link: string(),
});
const strainDetailStrainSchema = object({
    strain_id: string(),
    strain_name: string(),
    other_strain_id_list: array(strainDetailOtherStrainSchema),
});
const strainDetailLineageItemSchema = object({
    uri: string(),
    taxid: number(),
    label: string(),
    rank: string(),
});
const strainDetailTaxonomySchema = object({
    scientific_name: string(),
    taxid: number(),
    rank: string(),
    authority_name: string(),
    lineage: array(strainDetailLineageItemSchema),
});
object({
    strain: strainDetailStrainSchema,
    taxonomy: strainDetailTaxonomySchema,
});
object({
    strain_id: string(),
});
const PATH_STRAIN_DETAIL = "/gmdb_strain_by_strainid";

const parseData = (body) => {
    const strainId = body.strain.strain_id;
    const strainName = body.strain.strain_name;
    const infoSources = body.strain.other_strain_id_list.map((item) => ({
        url: item.other_strain_link,
        label: item.other_strain_id,
    }));
    const taxonomy = body.taxonomy
        ? {
            name: body.taxonomy.scientific_name,
            taxId: body.taxonomy.taxid.toString(),
            rank: body.taxonomy.rank,
            authorityName: body.taxonomy.authority_name,
            lineage: body.taxonomy.lineage.reduce((accum, current) => {
                return {
                    ...accum,
                    [current.rank]: {
                        taxid: current.taxid.toString(),
                        label: current.label,
                    },
                };
            }, {}),
        }
        : null;
    return {
        strainId,
        strainName,
        infoSources,
        taxonomy,
    };
};

const getStrainData = async (strain_id) => {
    const result = await getData(makeApiUrl(PATH_STRAIN_DETAIL), {
        strain_id,
    });
    if (!result.body?.strain) {
        throw new Error("No strain data found");
    }
    return parseData(result.body);
};

const useStrainDataQuery = (strain_id) => {
    const { data, isLoading } = useQuery({
        queryKey: ["strain", strain_id],
        queryFn: async () => getStrainData(strain_id),
        staleTime: Infinity,
    });
    return { strainData: data, isLoading };
};
const App = ({ strain_id }) => {
    const { strainData, isLoading } = useStrainDataQuery(strain_id);
    if (isLoading)
        return jsx(Fragment, { children: "Loading..." });
    if (!strainData)
        return jsx(Fragment, { children: "No data found" });
    return jsx(StanzaView, { ...strainData });
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const strain_id = this.params.strain_id;
        return jsx(App, { stanzaElement: this.root, strain_id: strain_id });
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
	"@id": "gmdb-strain-detail",
	"stanza:label": "Strain detail",
	"stanza:definition": "Provides detailed information about a specific strain.",
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
		"stanza:key": "strain_id",
		"stanza:example": "S6357",
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
//# sourceMappingURL=gmdb-strain-detail.js.map
