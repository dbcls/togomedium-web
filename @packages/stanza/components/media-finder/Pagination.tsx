import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { THEME } from "%stanza/styles/theme";

type Props = {
  total: number;
  current: number;
  displayLength: number;
  onClickNext: () => void;
  onClickPrev: () => void;
};

export const Pagination: FC<Props> = ({
  total,
  current,
  displayLength,
  onClickNext,
  onClickPrev,
}) => {
  return (
    <Wrapper>
      <div>
        {current > 0 && (
          <input
            type="button"
            value={"PREV"}
            onClick={onClickPrev}
          />
        )}
        {current + displayLength < total && (
          <input
            type="button"
            value={"NEXT"}
            onClick={onClickNext}
          />
        )}
      </div>
      <div>{makeDisplayMessage(total, current, displayLength)}</div>
    </Wrapper>
  );
};

const makeDisplayMessage = (total: number, current: number, displayLength: number) => {
  switch (true) {
    case current + displayLength > total:
      return `Showing ${current + 1} to ${total} of total ${total} items`;
    default:
      return `Showing ${current + 1} to ${current + displayLength} of total ${total} items`;
  }
};

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginTop: THEME.SIZE.S1,
  "& input[type='button']": {
    cursor: "pointer",
    paddingInline: THEME.SIZE.S1,
    marginRight: THEME.SIZE.S1,
  },
});
