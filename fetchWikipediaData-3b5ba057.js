import { s as styled, T as THEME, a as jsxs, j as jsx } from './StanzaReactProvider-b083349e.js';

const StandardParagraph = styled("p")({
    fontSize: 16,
    fontWeight: 300,
    "& span": {
        fontWeight: 300,
        fontSize: 16,
    },
});

const WikipediaView = ({ thumb, description, link }) => (jsxs(WikipediaInfo, { children: [jsxs("p", { children: [thumb && (jsx("img", { src: thumb, alt: "" })), description] }), jsx("cite", { children: jsx("a", { href: link, target: "_blank", rel: "noreferrer", children: "From Wikipedia" }) })] }));
const WikipediaInfo = styled("div")({
    marginTop: 32,
    width: 336,
    border: `1px ${THEME.COLOR.GRAY300} dashed`,
    padding: 8,
    borderRadius: 5,
    height: "fit-content",
    lineHeight: 1.3,
    "& cite": {
        display: "block",
        textAlign: "right",
        marginTop: 8,
        "& a": {
            color: THEME.STANZA_COLOR.PRIMARY_DARK,
        },
    },
});

const fetchWikipediaData = async (link) => {
    const key = link.split("/").pop();
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${key}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data)
        return { link };
    return { thumb: data.thumbnail?.source, description: data.extract, link };
};

export { StandardParagraph as S, WikipediaView as W, fetchWikipediaData as f };
//# sourceMappingURL=fetchWikipediaData-3b5ba057.js.map
