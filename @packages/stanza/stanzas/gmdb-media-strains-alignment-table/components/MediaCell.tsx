import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC, useEffect, useRef, useState } from "react";
import { makeCellHeight } from "%stanza/stanzas/gmdb-media-strains-alignment-table/functions/processMediaCell";
import { CellInfo } from "%stanza/stanzas/gmdb-media-strains-alignment-table/functions/types";
import { THEME } from "%stanza/styles/theme";

type Props = {} & CellInfo;

export const useToolTipEnabled = () => {
  const labelRef = useRef<HTMLSpanElement>(null);
  // cannot use useMemo as it depends on the ref;
  // instead, use useEffect to update the state
  const [toolTipEnabled, setToolTipEnabled] = useState(false);
  useEffect(() => {
    const offsetWidth = labelRef.current?.offsetWidth;
    const scrollWidth = labelRef.current?.scrollWidth;
    setToolTipEnabled(!!scrollWidth && !!offsetWidth && scrollWidth > offsetWidth);
  }, [labelRef]);
  return { labelRef, toolTipEnabled };
};

export const MediaCell: FC<Props> = ({ label, id, size }) => {
  const { labelRef, toolTipEnabled } = useToolTipEnabled();
  return (
    <Wrapper style={{ height: `${makeCellHeight(size)}px` }}>
      <a href={`/medium/${id}`}>{id}</a>
      <div className={"label-wrapper"}>
        <Tooltip
          title={label}
          placement={"top"}
          arrow
          disableHoverListener={!toolTipEnabled}
        >
          <span
            ref={labelRef}
            className={"label"}
          >
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
