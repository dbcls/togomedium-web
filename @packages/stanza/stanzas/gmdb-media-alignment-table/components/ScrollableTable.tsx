import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { MediaAlignmentTableResponse } from "%stanza/api/media-alignment-table/types";
import { AlignmentTable } from "%stanza/stanzas/gmdb-media-alignment-table/components/AlignmentTable";
import { HeaderRow } from "%stanza/stanzas/gmdb-media-alignment-table/components/HeaderRow";
import { InfoColumns } from "%stanza/stanzas/gmdb-media-alignment-table/components/InfoColumns";
import { THEME } from "%stanza/styles/theme";

type Props = { data: MediaAlignmentTableResponse; prioritizedOrganism?: string[] };

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
