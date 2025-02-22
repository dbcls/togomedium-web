import { styled } from "@mui/material/styles";
import React, { FC, useMemo } from "react";
import {
  lineageRanks,
  MediaStrainsAlignmentResponse,
} from "%api/mediaStrainsAlignment/definitions";
import { NotFound } from "%stanza/components/atoms/NotFound";
import { MediaCol } from "%stanza/stanzas/gmdb-media-strains-alignment-table/components/MediaCol";
import { TaxonCol } from "%stanza/stanzas/gmdb-media-strains-alignment-table/components/TaxonCol";
import { processDisplayData } from "%stanza/stanzas/gmdb-media-strains-alignment-table/functions/processMediaCell";
import { useFilterRankState } from "%stanza/stanzas/gmdb-media-strains-alignment-table/states/filterRank";
import { useFilterTaxonState } from "%stanza/stanzas/gmdb-media-strains-alignment-table/states/filterTaxon";
import { THEME } from "%stanza/styles/theme";

type Props = { data: MediaStrainsAlignmentResponse; hideMedia?: boolean };

export const AppContainer: FC<Props> = ({ data, hideMedia = false }) => {
  const filterTaxon = useFilterTaxonState();
  const filterRank = useFilterRankState();
  const displayData = useMemo(
    () => processDisplayData(data, filterTaxon, filterRank),
    [data, filterTaxon, filterRank]
  );
  return displayData.media.length ? (
    <Container>
      {!hideMedia && <MediaCol mediaList={displayData.media} />}
      <TaxonContainer>
        {lineageRanks
          .concat()
          .reverse()
          .map((rank, index) => (
            <TaxonCol
              rank={rank}
              taxonList={displayData.taxon[rank]}
              key={index}
            />
          ))}
      </TaxonContainer>
    </Container>
  ) : (
    <NotFound />
  );
};

const Container = styled("div")({
  display: "flex",
  gap: "2px",
  padding: "1px",
  backgroundColor: THEME.COLOR.GRAY_LINE,
  width: "fit-content",
});

const TaxonContainer = styled("div")({
  display: "flex",
  gap: "1px",
});
