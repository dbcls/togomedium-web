import { s as styled, T as THEME } from './StanzaReactProvider-b083349e.js';

const InfoId = styled("div")({
    display: "flex",
    alignItems: "center",
    "& span": {
        fontWeight: 300,
        fontSize: 16,
    },
    "& .tag-list": {
        display: "flex",
        marginLeft: 20,
        gap: 4,
        alignItems: "center",
    },
    a: {
        color: THEME.STANZA_COLOR.PRIMARY_DARK,
    },
});

const InfoTitle = styled("div")({
    fontSize: 40,
    margin: "24px 0 16px",
    fontWeight: 300,
    lineHeight: 0.9,
    "& small": {
        fontSize: 24,
        marginLeft: 10,
    },
});

const SubHeading = styled("h3")({
    fontWeight: 600,
    marginTop: 24,
    marginBottom: 8,
    fontSize: 20,
});

export { InfoId as I, SubHeading as S, InfoTitle as a };
//# sourceMappingURL=SubHeading-993ed209.js.map
