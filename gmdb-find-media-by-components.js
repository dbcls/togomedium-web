import { d as defineStanzaElement } from './stanza-ee9dc64c.js';
import { j as jsx, l as atom, m as useAtomValue, o as useSetAtom, a as jsxs, b as TogoMediumReactStanza } from './StanzaReactProvider-b083349e.js';
import { u as useMediaPaginationState, a as useFoundMediaMutators, b as useQueryDataMutators, c as useIsMediaLoadingMutators, d as useMediaPaginationMutators, n as nullListResponse, Q as QueryPane, M as MediaPane, S as SubPane, A as AppWrapper } from './ListApi-115ba089.js';
import { r as reactExports, j as jsx$1 } from './index-ef9d40bc.js';
import { u as useQuery } from './getLinkTarget-f23444d4.js';
import { m as makeApiUrl, g as getData } from './getData-1442ae18.js';
import { d as decodeHTMLEntities } from './decodeHtmlEntities-9696853d.js';
import { T as TextField, C as Chip, A as Autocomplete } from './TextField-ebad9552.js';
import './DefaultPropsProvider-c607464a.js';
import './isHostComponent-b55b8d7a.js';
import './Tooltip-f4db4da8.js';
import './createSvgIcon-d354a6e3.js';
import './consts-deffa432.js';

const componentsWithComponentsURL = makeApiUrl("gmdb_components_with_components");

const parseLabelInfo = (res, selectedIds) => {
    return res
        .map((item) => ({
        id: item.gmo_id,
        label: item.name.includes(";") ? decodeHTMLEntities(item.name) : item.name,
        japaneseName: item.japanese_name,
    }))
        .filter((item) => !selectedIds.includes(item.id));
};

const ComponentSelect = ({ onChangeSelection }) => {
    const [selectedIds, setSelectedIds] = reactExports.useState([]);
    const { data, isPending } = useQuery({
        queryKey: ["componentsOfComponents", { selectedIds }],
        queryFn: async () => {
            const gmo_ids = selectedIds.join(",");
            const response = await getData(componentsWithComponentsURL, { gmo_ids });
            if (!response.body)
                throw new Error("No response body");
            return parseLabelInfo(response.body, selectedIds);
        },
    });
    return (jsx(Autocomplete, { multiple: true, filterSelectedOptions: true, filterOptions: (options, params) => {
            return options.filter((option) => {
                const label = option.label.toLowerCase();
                const japaneseName = option.japaneseName.toLowerCase();
                const filter = params.inputValue.toLowerCase();
                return label.includes(filter) || japaneseName.includes(filter);
            });
        }, onChange: (_e, v) => {
            const ids = v.map((v) => v.id);
            setSelectedIds(ids);
            onChangeSelection(ids);
        }, disablePortal: true, options: data || [], loading: isPending, getOptionLabel: (option) => option.label, renderInput: (params) => (jsx(TextField, { ...params, label: "Components" })), renderTags: (value, getTagProps) => value.map((option, index) => (jsx$1(Chip, { variant: "outlined", ...getTagProps({ index }), label: option.label, key: option.id }))) }));
};

const selectedAttributes = atom({ gmo_ids: [] });
const useSelectedAttributesState = () => {
    return useAtomValue(selectedAttributes);
};
const useSelectedAttributesMutators = () => {
    const setSelectedAttributes = useSetAtom(selectedAttributes);
    return { setSelectedAttributes };
};

const AttributesSection = () => {
    const { setSelectedAttributes } = useSelectedAttributesMutators();
    const onChangeSelection = (ids) => {
        setSelectedAttributes({ gmo_ids: ids });
    };
    return (jsx("div", { children: jsx(ComponentSelect, { onChangeSelection: onChangeSelection }) }));
};

const listMediaByAttributesURL = makeApiUrl("gmdb_media_by_attributes");

const SHOW_COUNT = 10;
const useMediaLoadFromComponents = () => {
    const page = useMediaPaginationState();
    const selectedAttributes = useSelectedAttributesState();
    const { setFoundMedia } = useFoundMediaMutators();
    const { setQueryData } = useQueryDataMutators();
    const { setIsMediaLoading } = useIsMediaLoadingMutators();
    const { reset } = useMediaPaginationMutators();
    const query = useQuery({
        queryKey: [selectedAttributes, { page }],
        queryFn: async () => {
            const gmo_ids = selectedAttributes.gmo_ids.join(",");
            if (gmo_ids.length === 0)
                return nullListResponse;
            //
            const response = await getData(listMediaByAttributesURL, {
                gmo_ids,
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
        setQueryData({ gmo_ids: selectedAttributes.gmo_ids });
    }, [selectedAttributes, setQueryData]);
    reactExports.useEffect(() => {
        query.data ? setFoundMedia(query.data) : "";
    }, [query.data, setFoundMedia]);
    reactExports.useEffect(() => {
        setIsMediaLoading(query.isLoading || query.isPlaceholderData);
    }, [query.isLoading, query.isPlaceholderData, setIsMediaLoading]);
    reactExports.useEffect(() => {
        reset();
    }, [reset, selectedAttributes]);
};

const AppContainer = ({ dispatchEvent }) => {
    useMediaLoadFromComponents();
    return (jsxs(AppWrapper, { children: [jsx(QueryPane, { children: jsx(AttributesSection, {}) }), jsx(SubPane, { children: jsx(MediaPane, { dispatchEvent: dispatchEvent }) })] }));
};

const App = ({ stanzaElement }) => {
    const dispatchEvent = (gmIds) => {
        if (!stanzaElement)
            return;
        //
        stanzaElement.dispatchEvent(new CustomEvent("STANZA_RUN_ACTION", { bubbles: true, composed: true, detail: gmIds }));
        // console.log("dispatch", { detail: gmIds });
    };
    return jsx(AppContainer, { dispatchEvent: dispatchEvent });
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        return jsx(App, { stanzaElement: this.root });
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
	"@id": "gmdb-find-media-by-components",
	"stanza:label": "Media finder by components",
	"stanza:definition": "Retrieves media by filtering relevant components",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda (YOHAK)",
	"stanza:address": "satoshionoda@yohak.design",
	"stanza:contributor": [
],
	"stanza:created": "2022-01-01",
	"stanza:updated": "2025-03-22",
	"stanza:parameter": [
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
//# sourceMappingURL=gmdb-find-media-by-components.js.map
