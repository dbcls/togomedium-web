import { styled } from "@mui/material/styles";
import React, { ComponentProps, FC } from "react";
import { AlignmentCell } from "./AlignmentCell";
import { InfoCell } from "./InfoCell";
import { PATH_MEDIUM, PATH_TAXON } from "%core/consts";
import { THEME } from "%core/theme";
import { useIsMediaExpendedState } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/states/isMediaExpanded";
import { useIsOrganismsExpendedState } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/states/isOrganismsExpanded";
import { LabelInfo } from "%stanza/utils/labelInfo";

type Props = {
  medium: LabelInfo;
  organisms: LabelInfo[];
  components: ComponentProps<typeof AlignmentCell>[];
  prioritizedOrganism?: string[];
};

export const MediaRow: FC<Props> = ({
  medium,
  organisms,
  components,
  prioritizedOrganism = [],
}) => {
  const isMediaExpanded = useIsMediaExpendedState();
  const isOrganismsExpanded = useIsOrganismsExpendedState();
  return (
    <Wrapper>
      <InfoCell
        info={[medium]}
        expanded={isMediaExpanded}
        linkBase={PATH_MEDIUM}
      />
      <InfoCell
        info={organisms.length ? organisms : [{ id: "", label: "No organisms found" }]}
        expanded={isOrganismsExpanded}
        linkBase={PATH_TAXON}
        priority={prioritizedOrganism}
      />
      {components.map((component) => (
        <AlignmentCell
          {...component}
          key={component.id}
        />
      ))}
      <Spacer />
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

const Spacer = styled("div")({
  backgroundColor: THEME.COLOR.WHITE,
  flexGrow: "1 !important",
});
