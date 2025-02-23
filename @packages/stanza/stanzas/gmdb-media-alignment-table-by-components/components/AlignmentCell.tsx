import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { PATH_COMPONENT } from "%core/consts";
import { makeLinkPath } from "%core/network/makeLinkPath";
import { THEME } from "%stanza/styles/theme";

export type AlignmentCellState = "grouped" | "available" | "none";

type Props = {
  state: AlignmentCellState;
  label: string;
  id: string;
};

export const AlignmentCell: FC<Props> = ({ state, label, id }) => {
  return (
    <Wrapper>
      <Tooltip
        title={label}
        placement={"top"}
        arrow
        slotProps={{ popper: { disablePortal: true } }}
      >
        <a
          href={makeLinkPath(`${PATH_COMPONENT}${id}`)}
          target="_blank"
          className={`icon-${state} icon`}
          rel="noreferrer"
        >
          <span />
        </a>
      </Tooltip>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  boxSizing: "border-box",
  backgroundColor: THEME.COLOR.WHITE,
  // padding: SIZE1,
  padding: THEME.SIZE.S1,
  display: "flex",
  width: "fit-content",
  alignItems: "center",
  flexGrow: 0,
  ".icon": {
    display: "flex",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  ".icon-available > span": {
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: THEME.COLOR.PRIMARY,
  },
  ".icon-grouped > span": {
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    border: `2px solid ${THEME.COLOR.PRIMARY}`,
  },
  ".icon-none > span": {
    display: "none",
    boxSizing: "border-box",
    width: "100%",
    height: 4,
    backgroundColor: THEME.COLOR.GRAY,
    borderRadius: 4,
  },
});
