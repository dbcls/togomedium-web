import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { PATH_TAXON } from "%stanza/components/consts";
import { THEME } from "%stanza/styles/theme";
import { LabelInfo } from "%stanza/utils/labelInfo";

type Props = {
  isChecked: boolean;
  onClick: (info: LabelInfo) => void;
} & LabelInfo;

export const OrganismListItem: FC<Props> = ({ id, label, isChecked, onClick }) => {
  return (
    <Wrapper>
      <ListInner>
        <LabelCol>{label}</LabelCol>
        <IdCol
          href={`${PATH_TAXON}${id}`}
          target="_blank"
          rel="noreferrer"
        >
          [tax_id:{id}]
        </IdCol>
      </ListInner>
      <CheckCol>
        <Checkbox
          checked={isChecked}
          onClick={() => onClick({ id, label })}
        />
      </CheckCol>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: THEME.COLOR.WHITE,
  border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
  paddingInline: THEME.SIZE.S1,
  alignItems: "center",
  "& + &": {
    borderTop: "none",
  },
});

const ListInner = styled("div")({
  display: "flex",
  gap: THEME.SIZE.S2,
  flexShrink: 0,
  flexGrow: 0,
  width: "calc(100% - 40px)",
});

const IdCol = styled("a")({
  flexShrink: 0,
  flexGrow: 0,
  width: 100,
  color: THEME.COLOR.PRIMARY,
  textDecoration: "none",
});

const LabelCol = styled("span")({
  flexGrow: 0,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
});

const CheckCol = styled("span")({
  flexShrink: 0,
  flexGrow: 0,
});
