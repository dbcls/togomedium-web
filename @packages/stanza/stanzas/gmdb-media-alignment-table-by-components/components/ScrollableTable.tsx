import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { MediaComponentAlignmentTableResponse } from "%api/mediaComponentAlignment/definitions";
import { THEME } from "%core/theme";
import { AlignmentTable } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/AlignmentTable";
import { HeaderRow } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/HeaderRow";
import { InfoColumns } from "%stanza/stanzas/gmdb-media-alignment-table-by-components/components/InfoColumns";

type Props = { data: MediaComponentAlignmentTableResponse; prioritizedOrganism?: string[] };

export const ScrollableTable: FC<Props> = ({ data, prioritizedOrganism = [] }) => {
  return (
    <Wrapper>
      <HeaderRow scrollable={true} />
      <InfoColumns
        data={data}
        prioritizedOrganism={prioritizedOrganism}
      />
      <div className="inner">
        <AlignmentTable
          data={data}
          prioritizedOrganism={prioritizedOrganism}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  position: "relative",
  overflow: "hidden",
  backgroundColor: THEME.COLOR.GRAY_LINE,
  "& > .inner": {
    overflowX: "auto",
  },
});
