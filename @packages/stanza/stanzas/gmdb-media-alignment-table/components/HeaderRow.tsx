import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { HeaderCell } from "%stanza/stanzas/gmdb-media-alignment-table/components/HeaderCell";
import {
  useIsMediaExpandedMutators,
  useIsMediaExpendedState,
} from "%stanza/stanzas/gmdb-media-alignment-table/states/isMediaExpanded";
import {
  useIsOrganismsExpandedMutators,
  useIsOrganismsExpendedState,
} from "%stanza/stanzas/gmdb-media-alignment-table/states/isOrganismsExpanded";
import { THEME } from "%stanza/styles/theme";

type Props = { scrollable?: boolean };

export const HeaderRow: FC<Props> = ({ scrollable = false }) => {
  const isMediaExpanded = useIsMediaExpendedState();
  const isOrganismsExpanded = useIsOrganismsExpendedState();
  const { setIsMediaExpanded } = useIsMediaExpandedMutators();
  const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();

  const onClickMediaExpandIcon = () => {
    setIsMediaExpanded(!isMediaExpanded);
  };
  const onClickOrganismExpandIcon = () => {
    setIsOrganismsExpanded(!isOrganismsExpanded);
  };

  const Wrapper = scrollable ? ScrollableWrapper : DefaultWrapper;

  return (
    <Wrapper>
      <HeaderCell
        label={"Media"}
        isExpanded={isMediaExpanded}
        onClickIcon={onClickMediaExpandIcon}
      />
      <HeaderCell
        label={"Organisms"}
        isExpanded={isOrganismsExpanded}
        onClickIcon={onClickOrganismExpandIcon}
      />
      <Components>Components</Components>
    </Wrapper>
  );
};

const DefaultWrapper = styled("div")({
  display: "flex",
  gap: "1px",
  width: "100%",
  "& > *": {
    flexGrow: 0,
    flexShrink: 0,
  },
});

const ScrollableWrapper = styled("div")({
  display: "flex",
  gap: "1px",
  width: "100%",
  "& > *": {
    flexGrow: 0,
    flexShrink: 0,
  },
  position: "absolute",
  top: 0,
  left: 0,
  border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
  backgroundColor: THEME.COLOR.GRAY_LINE,
});

const Components = styled("div")({
  backgroundColor: THEME.COLOR.WHITE,
  display: "flex",
  alignItems: "center",
  padding: THEME.SIZE.S1,
  flexGrow: "1 !important",
});
