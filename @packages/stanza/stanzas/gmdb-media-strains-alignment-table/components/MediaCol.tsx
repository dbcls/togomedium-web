import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { MediaCell } from "%stanza/stanzas/gmdb-media-strains-alignment-table/components/MediaCell";
import { CellInfo } from "%stanza/stanzas/gmdb-media-strains-alignment-table/functions/types";
import { THEME } from "%stanza/styles/theme";

type Props = { mediaList: CellInfo[] };

export const MediaCol: FC<Props> = ({ mediaList }) => {
  return (
    <Wrapper>
      <EmptyCell />
      {mediaList.map((info, index) => (
        <MediaCell
          key={index}
          {...info}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  width: "200px",
});

const EmptyCell = styled("div")({
  height: "24px",
  backgroundColor: THEME.COLOR.WHITE,
});
