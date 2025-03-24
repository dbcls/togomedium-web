import { s as styled, T as THEME, a as jsxs, j as jsx } from './StanzaReactProvider-6984324a.js';
import { C as CircularProgress } from './isHostComponent-7889d775.js';

const LoadingCover = ({ showLoading, errorMessage }) => {
    const isShow = showLoading || errorMessage !== "";
    return (jsxs(Wrapper, { className: isShow ? "active" : "", children: [showLoading && jsx(CircularProgress, {}), !!errorMessage && errorMessage] }));
};
const Wrapper = styled("div")({
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

export { LoadingCover as L };
//# sourceMappingURL=LoadingCover-79a3edc9.js.map
