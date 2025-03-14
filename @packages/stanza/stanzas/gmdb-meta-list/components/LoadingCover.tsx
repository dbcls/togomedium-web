import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { THEME } from "%core/theme";

type Props = { showLoading: boolean; errorMessage: string };

export const LoadingCover: FC<Props> = ({ showLoading, errorMessage }) => {
  const isShow = showLoading || errorMessage !== "";
  return (
    <Wrapper className={isShow ? "active" : ""}>
      {showLoading && <CircularProgress />}
      {!!errorMessage && errorMessage}
    </Wrapper>
  );
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
