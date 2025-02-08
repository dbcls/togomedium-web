import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { COLOR_WHITE } from "../../../styles/variables";

type Props = { showLoading: boolean; errorMessage: string } & AcceptsEmotion;

export const LoadingCover: FC<Props> = ({ css, className, showLoading, errorMessage }) => {
  const isShow = showLoading || errorMessage !== "";
  return (
    <Wrapper
      css={[css]}
      className={`${className} ${isShow && "active"}`}
    >
      {showLoading && <CircularProgress />}
      {!!errorMessage && errorMessage}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLOR_WHITE};
  font-size: 18px;
  font-weight: bold;
  opacity: 0;
  pointer-events: none;
  transition-duration: 0.1s;
  transition-property: opacity;
  transition-timing-function: linear;
  &.active {
    opacity: 1;
    pointer-events: auto;
  }
`;
