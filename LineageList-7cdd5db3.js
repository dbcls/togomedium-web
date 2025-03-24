import { s as styled, T as THEME, j as jsx, a as jsxs } from './StanzaReactProvider-6984324a.js';
import { l as lineageRanks } from './definitions-2845d052.js';
import { b as PATH_TAXON } from './consts-deffa432.js';
import { m as makeLinkPath, g as getLinkTarget } from './getLinkTarget-54075a13.js';
import { c as capitalizeFirstLetter, m as makeSpeciesName } from './string-679c835b.js';

const LineageList = ({ lineage }) => {
    return (jsx(LineageListWrapper, { children: lineageRanks
            .filter((rank) => !!lineage[rank] && lineage[rank].label !== "NA")
            .map((rank, index) => {
            const item = lineage[rank];
            return (jsx(LineageItem, { rank: rank, label: item.label, id: item.taxid.toString() }, index));
        }) }));
};
const LineageItem = ({ rank, label, id }) => (jsxs("li", { children: [jsx("span", { children: capitalizeFirstLetter(rank) }), jsx("a", { href: makeLinkPath(`${PATH_TAXON}${id}`), target: getLinkTarget(`${PATH_TAXON}${id}`), children: rank === "species" ? makeSpeciesName(label) : label })] }));
const LineageListWrapper = styled("ul")({
    display: "flex",
    gap: 8,
    li: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
        borderRadius: 5,
        span: {
            width: "100%",
            textAlign: "center",
            borderBottom: `1px solid ${THEME.COLOR.GRAY_LINE}`,
            padding: "4px 8px",
            fontWeight: 500,
        },
        a: {
            padding: "4px 8px",
            color: THEME.STANZA_COLOR.PRIMARY_DARK,
        },
    },
});

export { LineageList as L };
//# sourceMappingURL=LineageList-7cdd5db3.js.map
