import { d as defineStanzaElement } from './stanza-ee9dc64c.js';
import { s as styled, j as jsx, T as THEME, a as jsxs, F as Fragment, b as TogoMediumReactStanza } from './StanzaReactProvider-b083349e.js';
import { m as makeLinkPath, g as getLinkTarget, u as useQuery } from './getLinkTarget-f23444d4.js';
import { r as reactExports } from './index-ef9d40bc.js';
import { n as nanoid, N as NotFound } from './index.browser-0883b6be.js';
import { S as StanzaWrapper } from './StanzaWrapper-1f2bb82c.js';
import { S as Slider } from './Slider-fa6f7527.js';
import { d as decodeHTMLEntities } from './decodeHtmlEntities-9696853d.js';
import { C as CircularProgress } from './isHostComponent-b55b8d7a.js';
import { m as makeFormBody } from './getData-b994dab1.js';
import './DefaultPropsProvider-c607464a.js';

const AngleLeftIcon = ({ sx }) => {
    return (jsx(Wrapper$7, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512", sx: sx, children: jsx("path", { d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" }) }));
};
const Wrapper$7 = styled("svg")({});

const AngleRightIcon = ({ sx }) => {
    return (jsx(Wrapper$6, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512", sx: sx, children: jsx("path", { d: "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" }) }));
};
const Wrapper$6 = styled("svg")({});

const DoubleAngleLeftIcon = ({ sx }) => {
    return (jsx(Wrapper$5, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", sx: sx, children: jsx("path", { d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" }) }));
};
const Wrapper$5 = styled("svg")({});

const DoubleAngleRightIcon = ({ sx }) => {
    return (jsx(Wrapper$4, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", sx: sx, children: jsx("path", { d: "M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" }) }));
};
const Wrapper$4 = styled("svg")({});

const getPagination = (props) => {
    const { totalPages, currentPage } = props;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(start + 4, totalPages);
    const result = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    let startNum = result[0] - 1;
    while (result.length < 5 && startNum > 1) {
        result.unshift(startNum);
        startNum -= 1;
    }
    return result;
};

const BottomController = ({ total, offset, limit, setOffset }) => {
    const totalPages = reactExports.useMemo(() => Math.ceil(total / limit), [total, limit]);
    const currentPage = reactExports.useMemo(() => Math.ceil(offset / limit) + 1, [offset, limit]);
    const [tempCurrentPage, setTempCurrentPage] = reactExports.useState(currentPage);
    const pagination = reactExports.useMemo(() => {
        return getPagination({ totalPages, currentPage: tempCurrentPage });
    }, [totalPages, currentPage, tempCurrentPage]);
    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;
    const changePage = (page) => {
        setOffset((page - 1) * limit);
    };
    const commitPageInput = (val) => {
        if (val <= 0 || isNaN(val)) {
            changePage(1);
        }
        else if (val >= totalPages) {
            changePage(totalPages);
        }
        else {
            changePage(val);
        }
    };
    reactExports.useEffect(() => {
        setTempCurrentPage(currentPage);
    }, [currentPage]);
    //
    if (totalPages <= 1)
        return null;
    return (jsxs(Wrapper$3, { children: [jsxs(Pagination, { children: [!isFirst ? (jsx(IconWrapper, { onClick: () => changePage(1), children: jsx(DoubleAngleLeftIcon, {}) })) : (jsx(IconDummy, {})), !isFirst ? (jsx(IconWrapper, { onClick: () => changePage(currentPage - 1), children: jsx(AngleLeftIcon, {}) })) : (jsx(IconDummy, {})), jsx(PageNums, { children: pagination.map((p) => (jsx("li", { onClick: () => {
                                changePage(p);
                            }, className: p === tempCurrentPage ? "active" : "", children: p }, p))) }), !isLast ? (jsx(IconWrapper, { onClick: () => changePage(currentPage + 1), children: jsx(AngleRightIcon, {}) })) : (jsx(IconDummy, {})), !isLast ? (jsx(IconWrapper, { onClick: () => changePage(totalPages), children: jsx(DoubleAngleRightIcon, {}) })) : (jsx(IconDummy, {}))] }), jsxs(Right, { children: [totalPages > 5 && (jsx(SliderWrapper, { children: jsx(StyledSlider, { value: tempCurrentPage, min: 1, max: totalPages, "aria-label": "Default", valueLabelDisplay: "auto", onChange: (e, v) => {
                                setTempCurrentPage(v);
                            }, onChangeCommitted: (e, v) => {
                                changePage(v);
                            } }) })), jsxs(Info, { children: [jsx("span", { children: "Page" }), jsx(CurrentPageInput, { type: "number", value: tempCurrentPage, onChange: (e) => {
                                    setTempCurrentPage(parseInt(e.target.value));
                                }, onBlur: () => {
                                    commitPageInput(tempCurrentPage);
                                }, onKeyUp: (e) => {
                                    if (e.key === "Enter") {
                                        commitPageInput(tempCurrentPage);
                                    }
                                } }), jsxs("span", { children: ["of ", totalPages] })] })] })] }));
};
const StyledSlider = styled(Slider)({
    color: THEME.STANZA_COLOR.PRIMARY,
});
const Wrapper$3 = styled("div")({
    marginTop: 12,
    display: "flex",
    justifyContent: "space-between",
});
const CurrentPageInput = styled("input")({
    width: 64,
    display: "inline-block",
    marginInline: 8,
    paddingInline: 4,
});
const Right = styled("div")({
    display: "flex",
    gap: 20,
});
const Info = styled("div")({
    fontSize: "14px",
    whiteSpace: "nowrap",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});
const SliderWrapper = styled("div")({
    width: 240,
});
const Pagination = styled("div")({
    display: "flex",
    height: 26,
});
const IconWrapper = styled("div")({
    height: 24,
    width: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    svg: {
        fill: THEME.COLOR.GRAY500,
        height: 18,
        width: "auto",
    },
});
const IconDummy = styled("div")({
    height: "24px",
    width: "24px",
});
const PageNums = styled("ul")({
    backgroundColor: THEME.STANZA_COLOR.PRIMARY,
    width: "fit-content",
    display: "flex",
    padding: "1px",
    gap: "1px",
    li: {
        backgroundColor: THEME.COLOR.WHITE,
        fontSize: "14px",
        minWidth: "28px",
        height: "24px",
        paddingInline: "2px",
        boxSizing: "border-box",
        lineHeight: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
        "&.active": {
            backgroundColor: THEME.STANZA_COLOR.PRIMARY,
            color: THEME.COLOR.WHITE,
            fontWeight: "bold",
        },
    },
});

const ListTable = ({ data, columnSizes, showColumnNames, limit }) => {
    const extraRows = Array(Math.max(0, limit - data.contents.length))
        .fill(null)
        .map(() => nanoid());
    return (jsxs(Wrapper$2, { children: [showColumnNames && (jsx("thead", { children: jsx("tr", { children: data.columns.map((column, index) => {
                        const size = columnSizes[index];
                        const isSizeEnabled = !!size && data.columns.length === columnSizes.length;
                        return (jsx("th", { style: isSizeEnabled ? { width: `${size}%` } : {}, children: column.label }, column.key));
                    }) }) })), jsxs("tbody", { children: [data.contents.map((row, i) => (jsx("tr", { children: data.columns.map((column) => {
                            const key = column.key;
                            const item = row[key];
                            const noWrap = !!column.nowrap;
                            return (jsx("td", { style: noWrap ? { whiteSpace: "nowrap" } : {}, children: jsx(CellContent, { item: item }) }, key));
                        }) }, i))), extraRows.map((rowId) => (jsx("tr", { children: data.columns.map((column) => {
                            const key = column.key;
                            return jsx("td", { children: "-" }, key);
                        }) }, rowId)))] })] }));
};
const CellContent = ({ item }) => {
    if (typeof item === "string") {
        return jsx(Fragment, { children: decodeHTMLEntities(item) });
    }
    if (typeof item === "number") {
        return jsx(Fragment, { children: item });
    }
    return (jsx("a", { href: makeLinkPath(item.href), target: getLinkTarget(item.href), rel: "noreferrer", children: decodeHTMLEntities(item.label) }));
};
const Wrapper$2 = styled("table")({
    border: "1px solid #ccc",
    width: "100%",
    fontSize: "16px",
    borderCollapse: "collapse",
    "& td, & th": {
        padding: "6px 8px",
        borderBottom: "1px solid #ccc",
        textAlign: "left",
        lineHeight: 1.2,
    },
    "& tr:nth-of-type(2n)": {
        backgroundColor: "#f6f6f6",
    },
    "& a": {
        color: THEME.STANZA_COLOR.PRIMARY_DARK,
        textDecoration: "none",
    },
});

const LoadingCover = ({ showLoading, errorMessage }) => {
    const isShow = showLoading || errorMessage !== "";
    return (jsxs(Wrapper$1, { className: isShow ? "active" : "", children: [showLoading && jsx(CircularProgress, {}), !!errorMessage && errorMessage] }));
};
const Wrapper$1 = styled("div")({
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: THEME.COLOR.WHITE,
    fontSize: "18px",
    fontWeight: "bold",
    opacity: 0,
    pointerEvents: "none",
    transitionDuration: "0.1s",
    transitionProperty: "opacity",
    transitionTimingFunction: "linear",
    "&.active": {
        opacity: 1,
        pointerEvents: "auto",
    },
});

const TopInfo = ({ total, limit, setLimit, setOffset }) => {
    const [tempLimit, setTempLimit] = reactExports.useState(limit);
    const onCommitLimit = (val) => {
        let newLimit = val;
        if (val < 1 || isNaN(val)) {
            newLimit = 1;
        }
        else if (val >= 100) {
            newLimit = 100;
        }
        else if (val > total) {
            newLimit = total;
        }
        setLimit(newLimit);
        setTempLimit(newLimit);
        setOffset(0);
    };
    reactExports.useEffect(() => {
        setTempLimit(limit);
    }, [limit]);
    return (jsxs(Wrapper, { children: [jsxs(Total, { children: ["Total: ", total, " items"] }), jsx("span", { children: "/" }), jsxs("p", { children: [jsx("span", { children: "Show" }), jsx(NumInput, { type: "number", value: tempLimit, onChange: (e) => {
                            setTempLimit(parseInt(e.target.value));
                        }, onBlur: () => {
                            onCommitLimit(tempLimit);
                        }, onKeyUp: (e) => {
                            if (e.key === "Enter") {
                                onCommitLimit(tempLimit);
                            }
                        } }), jsx("span", { children: "items per page" })] })] }));
};
const Wrapper = styled("div")({
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "14px",
    gap: "8px",
    paddingBottom: "4px",
    paddingRight: "8px",
    alignItems: "baseline",
});
const Total = styled("p")({
    display: "flex",
    alignItems: "center",
});
const NumInput = styled("input")({
    width: "48px",
    display: "inline-block",
    marginInline: "8px",
    paddingInline: "4px",
});

const StanzaView = ({ data, title, showColumnNames, columnSizes, offset, setOffset, limit, setLimit, showLoading, errorMessage, }) => {
    return (jsxs("div", { children: [title && (jsx(Header, { children: jsx("h2", { children: title }) })), jsx(StanzaWrapper, { children: data.contents.length === 0 ? (jsx(NotFound, {})) : (jsxs(Fragment, { children: [jsx(TopInfo, { total: data.total, limit, setLimit, setOffset }), jsxs("div", { style: { position: "relative" }, children: [jsx(ListTable, { data, showColumnNames, columnSizes, limit }), jsx(LoadingCover, { showLoading, errorMessage })] }), jsx(BottomController, { total: data.total, offset, limit, setOffset })] })) })] }));
};
const Header = styled("header")({
    h2: {
        WebkitFontSmoothing: "antialiased",
        fontSize: "24px",
        fontWeight: 600,
        marginBottom: "8px",
        paddingLeft: "8px",
    },
});

const fetchData = async (url, offset, limit) => {
    // return fetchDummy(query, offset, limit);
    return fetchLive(url, offset, limit);
};
const fetchLive = async (url, offset, limit) => {
    const [uri, query] = separateURL(url);
    const response = await fetch(uri, makeOptions({ offset, limit }, query));
    if (response.status !== 200) {
        return {
            status: response.status,
            message: response.statusText,
            body: undefined,
        };
    }
    const body = await response.json();
    return {
        status: 200,
        body,
    };
};
const separateURL = (url) => {
    const separated = /(.*)\?(.*)/.exec(url);
    let uri, query;
    if (separated) {
        uri = separated[1];
        query = separated[2];
    }
    else {
        uri = url;
        query = "";
    }
    return [uri, query];
};
const makeOptions = (params, query) => {
    const body = `${filterQuery(query)}&${makeFormBody(params)}`;
    return {
        method: "POST",
        mode: "cors",
        body,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
};
const filterQuery = (query) => {
    if (!query) {
        return "";
    }
    let isOmitted = false;
    const result = query
        .split("&")
        .filter((str) => {
        const reg = /(.*)=(.*)/.exec(str);
        const [key, value] = [reg[1], reg[2]];
        switch (key) {
            case "limit":
            case "offset":
                isOmitted = true;
                return false;
            default:
                return true;
        }
    })
        .join("&");
    if (isOmitted) {
        console.warn("limit and offset on API_URL have been omitted as they are set from the Stanza");
    }
    // console.log(result);
    return result;
};

const useTableData = (apiUrl, initialLimit = 100) => {
    const [offset, setOffset] = reactExports.useState(0);
    const [limit, setLimit] = reactExports.useState(initialLimit);
    const { data, isLoading, error, isPlaceholderData } = useQuery({
        queryKey: [{ offset }, { limit }, { apiUrl }],
        queryFn: async () => {
            const response = await fetchData(apiUrl, offset, limit);
            return response.body;
        },
        placeholderData: (previousData) => previousData,
        staleTime: Infinity,
    });
    const errorMessage = error?.message || "";
    const updateLimit = () => {
        data && data.total < limit ? setLimit(data.total) : "";
    };
    reactExports.useEffect(() => {
        updateLimit();
    }, [data]);
    const showLoading = isLoading || isPlaceholderData;
    return { offset, setOffset, limit, setLimit, showLoading, data, errorMessage };
};
const App = ({ apiUrl, initialLimit, title, showColumnNames, columnSizes, webFont }) => {
    const { offset, setOffset, limit, setLimit, showLoading, data, errorMessage } = useTableData(apiUrl, initialLimit);
    if (!data) {
        return jsx(Fragment, { children: errorMessage });
    }
    return (jsx(StanzaView, { data,
        title,
        showColumnNames,
        columnSizes,
        offset,
        setOffset,
        limit: !isNaN(limit) ? limit : data.total,
        setLimit,
        showLoading,
        errorMessage }));
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const params = this.params;
        const apiUrl = params.api_url;
        const limit = parseInt(params.limit ?? "20");
        const title = params.title ?? "";
        const columNames = params.column_names === "true";
        const columnSizes = (params.column_sizes ?? "").split(",").map((s) => parseInt(s));
        const webFont = params.web_font ?? "Fira Sans Condensed";
        return (jsx(App, { stanzaElement: this.root, apiUrl: apiUrl, initialLimit: limit, title: title, showColumnNames: columNames, columnSizes: columnSizes, webFont: webFont }));
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
	"@id": "gmdb-meta-list",
	"stanza:label": "Meta list",
	"stanza:definition": "General list stanza for TogoMedium",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda (YOHAK)",
	"stanza:address": "satoshionoda@yohak.design",
	"stanza:contributor": [
],
	"stanza:created": "2021-02-19",
	"stanza:updated": "2025-03-22",
	"stanza:parameter": [
	{
		"stanza:key": "api_url",
		"stanza:example": "https://togomedium.org/sparqlist/api/list_media",
		"stanza:description": "URL of the SPARQList API with queries",
		"stanza:required": true
	},
	{
		"stanza:key": "limit",
		"stanza:example": "10",
		"stanza:description": "limit",
		"stanza:required": true
	},
	{
		"stanza:key": "title",
		"stanza:example": "Media of Glucose",
		"stanza:description": "title",
		"stanza:required": false
	},
	{
		"stanza:key": "column_names",
		"stanza:example": "true",
		"stanza:description": "whether display column names",
		"stanza:required": true
	},
	{
		"stanza:key": "column_sizes",
		"stanza:example": "15,15,70",
		"stanza:description": "column sizes from left. should be separated with comma",
		"stanza:required": false
	}
],
	"stanza:menu-placement": "none",
	"stanza:style": [
	{
		"stanza:key": "--color-primary",
		"stanza:type": "color",
		"stanza:default": "#8FC31F",
		"stanza:description": "highlight color of the UI"
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
//# sourceMappingURL=gmdb-meta-list.js.map
