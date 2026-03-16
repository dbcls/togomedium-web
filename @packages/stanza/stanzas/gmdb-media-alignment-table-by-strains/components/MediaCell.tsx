import { PATH_MEDIUM } from "%core/consts";
import { getLinkTarget } from "%core/network/getLinkTarget";
import { makeLinkPath } from "%core/network/makeLinkPath";
import { THEME } from "%core/theme";
import { makeCellHeight } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/functions/processMediaCell";
import { useToolTipEnabled } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/functions/useToolTipEnabled";
import { CellInfo } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/types";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";

type Props = {} & CellInfo;

export const MediaCell: FC<Props> = ({ label, id, size }) => {
  const { labelRef, toolTipEnabled } = useToolTipEnabled();
  return (
    <Wrapper style={{ height: `${makeCellHeight(size)}px` }}>
      <a href={makeLinkPath(`${PATH_MEDIUM}${id}`)} target={getLinkTarget(`${PATH_MEDIUM}${id}`)}>
        {id}
      </a>
      <div className={"label-wrapper"}>
        <Tooltip
          slotProps={{ popper: { disablePortal: true } }}
          title={label}
          placement={"top"}
          arrow
          disableHoverListener={!toolTipEnabled}
        >
          <span ref={labelRef} className={"label"}>
            {label}
          </span>
        </Tooltip>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  width: "200px",
  display: "flex",
  flexDirection: "column",
  // backgroundColor: `${COLOR_WHITE}`,
  backgroundColor: THEME.COLOR.WHITE,
  padding: "8px 8px 0",
  fontSize: "14px",
  a: {
    color: THEME.COLOR.PRIMARY,
    textDecoration: "none",
    width: "fit-content",
  },
  ".label-wrapper": {
    position: "relative",
  },
  ".label": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    height: "16px",
    flexShrink: 0,
  },
});
