import { Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { PATH_MEDIUM } from "%core/consts";
import { getLinkTarget } from "%core/network/getLinkTarget";
import { makeLinkPath } from "%core/network/makeLinkPath";
import { THEME } from "%stanza/styles/theme";
import { LabelInfo } from "%stanza/utils/labelInfo";

type Props = {
  isChecked: boolean;
  onClick: (info: LabelInfo) => void;
} & LabelInfo;

export type MediaListItemInfo = Omit<Props, "onClick">;

export const MediaListItem: FC<Props> = ({ id, label, isChecked, onClick }) => {
  const url = `${PATH_MEDIUM}${id}`;
  return (
    <Wrapper>
      <IdCol
        href={makeLinkPath(url)}
        target={getLinkTarget(url)}
      >
        {id}
      </IdCol>
      <LabelCol>
        <Tooltip
          title={label}
          placement={"top"}
          arrow
          slotProps={{ popper: { disablePortal: true } }}
        >
          <span>{label}</span>
        </Tooltip>
      </LabelCol>
      <CheckCol>
        <Checkbox
          checked={isChecked}
          onClick={() => onClick({ id, label })}
          // sx={{ padding: 5 }}
        />
      </CheckCol>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  backgroundColor: THEME.COLOR.WHITE,
  border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
  padding: `0 ${THEME.SIZE.S1}px`,
  justifyContent: "space-between",
  alignItems: "center",
  gap: THEME.SIZE.S2,
  "& + &": {
    borderTop: "none",
  },
});

const IdCol = styled("a")({
  flexShrink: 0,
  flexGrow: 0,
  width: 90,
  color: THEME.COLOR.PRIMARY,
  textDecoration: "none",
});

const LabelCol = styled("span")({
  flexGrow: 1,
  flexShrink: 1,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
});

const CheckCol = styled("span")({
  flexShrink: 0,
});
