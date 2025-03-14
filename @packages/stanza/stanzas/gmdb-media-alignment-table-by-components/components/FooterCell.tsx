import { SxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { decodeHTMLEntities } from "%core/string/decodeHtmlEntities";
import { THEME } from "%core/theme";
import { IconBlank, IconCompact, IconExpand } from "%stanza/components/icons/icons";
import { WIDTH_ALIGNMENT_CELL } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/consts";
import { useComponentTreeMutators } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/states/componentTree";

type Props = {
  label: string;
  level: number;
  hasChildren: boolean;
  isOpen: boolean;
  id: string;
};

export const FooterCell: FC<Props> = ({ label, level, hasChildren, isOpen, id }) => {
  const { toggleComponent } = useComponentTreeMutators();
  const onClickFooterItem = (id: string) => toggleComponent(id);

  const Icon = hasChildren ? (
    isOpen ? (
      <IconCompact
        sx={clickableIconStyle}
        onClick={() => onClickFooterItem(id)}
      />
    ) : (
      <IconExpand
        sx={clickableIconStyle}
        onClick={() => onClickFooterItem(id)}
      />
    )
  ) : (
    <IconBlank sx={iconStyle} />
  );

  return (
    <Wrapper>
      {new Array(level).fill(null).map((r, index) => (
        <span
          key={index}
          className="spacer"
        />
      ))}
      {Icon}
      <span className={"text"}>{decodeHTMLEntities(label)}</span>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  boxSizing: "border-box",
  width: WIDTH_ALIGNMENT_CELL,
  backgroundColor: THEME.COLOR.WHITE,
  whiteSpace: "nowrap",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: THEME.SIZE.S1,
  paddingBottom: THEME.SIZE.S4,
  "& > .text": {
    writingMode: "vertical-rl",
    transform: "translateX(-1px)",
  },
  "& > .spacer": {
    display: "block",
    height: THEME.SIZE.S3,
    flexGrow: 0,
    flexShrink: 0,
  },
});

const iconStyle: SxProps = {
  marginBottom: THEME.SIZE.S1,
  width: 24,
  height: 24,
};

const clickableIconStyle: SxProps = {
  ...iconStyle,
  cursor: "pointer",
};
