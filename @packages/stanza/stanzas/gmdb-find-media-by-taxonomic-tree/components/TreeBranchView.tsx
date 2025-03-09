import { SxProps, Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import React, { FC, PropsWithChildren } from "react";
import { getLinkTarget } from "%core/network/getLinkTarget";
import {
  IconCompact,
  IconExpand,
  IconLoading,
  IconNoChildren,
} from "%stanza/components/icons/icons";
import { THEME } from "%stanza/styles/theme";

export type CheckStatus = "none" | "checked" | "grouped" | "indeterminate";
export type ToggleIconStatus = "none" | "expand" | "compact" | "loading";

type Props = {
  label: string;
  id: string;
  check: CheckStatus;
  toggle: ToggleIconStatus;
  isOpen: boolean;
  toolTipLabel?: string;
  tag?: string;
  linkString?: string;
  linkURL?: string;
  onClickCheck: (id: string) => void;
  onToggleChildren: (id: string) => void;
  isHighlighted?: boolean;
} & PropsWithChildren;

export const TreeBranchView: FC<Props> = ({
  label,
  linkString,
  linkURL,
  id,
  check,
  tag,
  isOpen,
  onClickCheck,
  onToggleChildren,
  children,
  toolTipLabel = "",
  toggle,
  isHighlighted = false,
}) => {
  return (
    <Wrapper>
      <Inner className={isHighlighted ? "highlighted" : ""}>
        <Left>
          <span onClick={() => onToggleChildren(id)}>
            <ToggleIcon status={toggle} />
          </span>
          <Tooltip
            arrow
            title={toolTipLabel}
            placement={"top-start"}
            slotProps={{ popper: { disablePortal: true } }}
          >
            <span>{label}</span>
          </Tooltip>
          {tag && <TagTip>{tag}</TagTip>}
          {linkString && linkURL && (
            <a
              href={linkURL}
              target={getLinkTarget(linkURL)}
            >
              [{linkString}]
            </a>
          )}
        </Left>
        <Checkbox
          checked={check === "checked" || check === "grouped"}
          indeterminate={check === "indeterminate"}
          onClick={() => onClickCheck(id)}
        />
      </Inner>
      {isOpen && !!children && <ChildrenWrapper>{children}</ChildrenWrapper>}
    </Wrapper>
  );
};

const ToggleIcon: FC<{ status: ToggleIconStatus }> = ({ status }) => {
  switch (status) {
    case "none":
      return <IconNoChildren sx={iconStyle} />;
    case "expand":
      return <IconExpand sx={clickableIconStyle} />;
    case "compact":
      return <IconCompact sx={clickableIconStyle} />;
    case "loading":
      return <IconLoading sx={iconStyle} />;
  }
};

const Wrapper = styled("li")({
  marginTop: "-1px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const Inner = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexGrow: 1,
  backgroundColor: THEME.COLOR.WHITE,
  padding: "0 8px",
  border: `1px solid ${THEME.COLOR.GRAY_LINE}`,

  ["&.highlighted"]: {
    backgroundColor: THEME.COLOR.PRIMARY_PALE,
  },
});

const Left = styled("div")({
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  gap: 8,
  lineHeight: 1,
  fontSize: 16,
  a: {
    fontSize: 14,
    color: THEME.COLOR.PRIMARY,
  },
});

const iconStyle: SxProps = {
  display: "block",
  color: THEME.COLOR.GRAY300,
  width: 24,
  height: 24,
};
const clickableIconStyle: SxProps = {
  ...iconStyle,
  cursor: "pointer",
  color: THEME.COLOR.GRAY700,
};

const ChildrenWrapper = styled("ul")({
  paddingLeft: 16,
});

const TagTip = styled("span")({
  fontSize: 12,
  backgroundColor: THEME.COLOR.GRAY400,
  color: THEME.COLOR.WHITE,
  padding: "4px 6px",
  borderRadius: 5,
});
