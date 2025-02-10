import { styled } from "@mui/material/styles";
import React, { ComponentProps, FC } from "react";
import { FooterCell } from "%stanza/stanzas/gmdb-media-alignment-table/components/FooterCell";
import { WIDTH_COMPACT, WIDTH_EXPANDED } from "%stanza/stanzas/gmdb-media-alignment-table/consts";
import { useIsMediaExpendedState } from "%stanza/stanzas/gmdb-media-alignment-table/states/isMediaExpanded";
import { useIsOrganismsExpendedState } from "%stanza/stanzas/gmdb-media-alignment-table/states/isOrganismsExpanded";
import { THEME } from "%stanza/styles/theme";

type Props = {
  components: ComponentProps<typeof FooterCell>[];
};

export const FooterRow: FC<Props> = ({ components }) => {
  const isMediaExpanded = useIsMediaExpendedState();
  const isOrganismsExpanded = useIsOrganismsExpendedState();
  return (
    <Wrapper>
      <InfoSpacer className={isMediaExpanded ? "expand" : "compact"} />
      <InfoSpacer className={isOrganismsExpanded ? "expand" : "compact"} />
      {components.map((component) => (
        <FooterCell
          {...component}
          key={component.id}
        />
      ))}
      <ComponentSpacer />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  gap: 1,
  width: "100%",
  "& > *": {
    flexGrow: 0,
    flexShrink: 0,
  },
});

const InfoSpacer = styled("div")({
  backgroundColor: THEME.COLOR.WHITE,
  "&.expand": {
    width: WIDTH_EXPANDED,
  },
  "&.compact": {
    width: WIDTH_COMPACT,
  },
});

const ComponentSpacer = styled("div")({
  backgroundColor: THEME.COLOR.WHITE,
  flexGrow: "1 !important",
});
