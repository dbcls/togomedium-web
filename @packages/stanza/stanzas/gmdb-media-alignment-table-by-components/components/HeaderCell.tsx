import { SxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { THEME } from "%core/theme";
import { IconCompact, IconExpand } from "%stanza/components/icons/icons";
import {
  WIDTH_COMPACT,
  WIDTH_EXPANDED,
} from "%stanza/stanzas/gmdb-media-alignment-table-by-components/consts";

type Props = {
  label: string;
  onClickIcon: () => void;
  isExpanded: boolean;
};

export const HeaderCell: FC<Props> = ({ label, onClickIcon, isExpanded }) => {
  return (
    <Wrapper className={isExpanded ? "expanded" : "compact"}>
      <span>{label}</span>
      {isExpanded ? (
        <IconCompact
          sx={iconStyle}
          onClick={onClickIcon}
        />
      ) : (
        <IconExpand
          sx={iconStyle}
          onClick={onClickIcon}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  backgroundColor: THEME.COLOR.WHITE,
  alignItems: "center",
  justifyContent: "space-between",
  padding: THEME.SIZE.S1,
  boxSizing: "border-box",
  "&.expanded": {
    width: WIDTH_EXPANDED,
  },
  "&.compact": {
    width: WIDTH_COMPACT,
  },
});

const iconStyle: SxProps = {
  fontSize: 24,
  color: THEME.COLOR.GRAY700,
  cursor: "pointer",
};
