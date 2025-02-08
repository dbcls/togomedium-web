import { css } from "@emotion/react";
import React, { FC, useMemo } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { MediaCol } from "./MediaCol";
import { TaxonCol } from "./TaxonCol";
import { MediaStrainsAlimentResponse } from "../../../api/media_strains_alignment/types";
import { COLOR_GRAY_LINE } from "../../../styles/variables";
import { processDisplayData } from "../functions/processMediaCell";
import { lineageRanks } from "../functions/types";
import { useFilterRankState } from "../states/filterRank";
import { useFilterTaxonState } from "../states/filterTaxon";

type Props = { data: MediaStrainsAlimentResponse; hideMedia?: boolean } & AcceptsEmotion;

export const AppContainer: FC<Props> = ({ data, hideMedia = false }) => {
  const filterTaxon = useFilterTaxonState();
  const filterRank = useFilterRankState();
  const displayData = useMemo(
    () => processDisplayData(data, filterTaxon, filterRank),
    [data, filterTaxon, filterRank]
  );
  return displayData.media.length ? (
    <div css={appContainer}>
      {!hideMedia && <MediaCol mediaList={displayData.media} />}
      <div css={taxonContainer}>
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
      </div>
    </div>
  ) : (
    <p>NO RESULT FOUND</p>
  );
};

const appContainer = css`
  display: flex;
  gap: 2px;
  padding: 1px;
  background-color: ${COLOR_GRAY_LINE};
  width: fit-content;
`;
const taxonContainer = css`
  display: flex;
  gap: 1px;
`;
