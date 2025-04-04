import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { MediaComponentAlignmentTableResponse } from "%api/mediaComponentAlignment/definitions";
import { THEME } from "%core/theme";
import { HeaderCell } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/HeaderCell";
import { MediaRow } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/MediaRow";
import {
  WIDTH_COMPACT,
  WIDTH_EXPANDED,
} from "%stanza/stanzas/gmdb-media-alignment-table-by-components/consts";
import {
  useIsMediaExpandedMutators,
  useIsMediaExpendedState,
} from "%stanza/stanzas/gmdb-media-alignment-table-by-components/states/isMediaExpanded";
import {
  useIsOrganismsExpandedMutators,
  useIsOrganismsExpendedState,
} from "%stanza/stanzas/gmdb-media-alignment-table-by-components/states/isOrganismsExpanded";

type Props = { data: MediaComponentAlignmentTableResponse; prioritizedOrganism: string[] };

export const InfoColumns: FC<Props> = ({ data, prioritizedOrganism = [] }) => {
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
  return (
    <Wrapper>
      <Header>
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
      </Header>
      {data.media.map((m) => {
        const organisms = m.organisms.map((taxid) => {
          const organism = data.organisms.find((o) => o.tax_id === taxid);
          const id: string = organism ? organism.tax_id : "";
          const label: string = organism ? organism.name : "";
          return { id, label };
        });
        return (
          <MediaRow
            key={m.gm_id}
            medium={{ id: m.gm_id, label: m.name }}
            organisms={organisms}
            components={[]}
            prioritizedOrganism={prioritizedOrganism}
          />
        );
      })}
      <SpacerRow>
        <Spacer className={isMediaExpanded ? "expanded" : "compact"} />
        <Spacer className={isOrganismsExpanded ? "expanded" : "compact"} />
      </SpacerRow>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  gap: "1px",
  flexDirection: "column",
  backgroundColor: THEME.COLOR.GRAY_LINE,
  width: "fit-content",
  height: "100%",
  padding: "1px 0 1px 1px",
  boxSizing: "border-box",
  //
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 2,
});

const Header = styled("div")({
  width: "fit-content",
  display: "flex",
  gap: "1px",
});

const SpacerRow = styled("div")({
  flexGrow: 1,
  gap: "1px",
  display: "flex",
  borderRight: `1px solid transparent`,
});
const Spacer = styled("span")({
  backgroundColor: THEME.COLOR.WHITE,
  "&.expanded": {
    width: WIDTH_EXPANDED,
  },
  "&.compact": {
    width: WIDTH_COMPACT,
  },
});
