import { SxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC, SyntheticEvent, useEffect, useRef, useState } from "react";
import { Ease } from "yohak-tools";
import { LineageRank } from "%api/mediaStrainsAlignment/definitions";
import { TaxonCell } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/components/TaxonCell";
import { useFilterRankMutators } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/states/filterRank";
import { CellInfo } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/types";
import { THEME } from "%stanza/styles/theme";
import { capitalizeFirstLetter } from "%stanza/utils/string";

type Props = {
  rank: LineageRank;
  taxonList: CellInfo[][];
};

export const TaxonCol: FC<Props> = ({ rank, taxonList }) => {
  const { changeFilterRank } = useFilterRankMutators();
  const [isFolded, setIsFolded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onClickRank = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsFolded((prev) => {
      const result = !prev;
      changeFilterRank(rank, result);
      return result;
    });
  };
  useEffect(() => {
    const isFolded = rank === "superkingdom" || rank === "phylum" || rank === "class";
    if (isFolded) {
      setIsFolded(true);
      changeFilterRank(rank, true);
    }
  }, []);
  useEffect(() => {
    if (!wrapperRef.current) return;
    setTimeout(() => {
      wrapperRef.current!.style.display = !isFolded ? "flex" : "none";
    }, 16);
  }, [isFolded]);
  return (
    <Wrapper sx={isFolded ? foldedStyle : null}>
      {!isFolded && <RankCell onClick={onClickRank}>{capitalizeFirstLetter(rank)}</RankCell>}
      <AllTaxonWrapper ref={wrapperRef}>
        {taxonList.map((list, index) => (
          <MediumTaxonWrapper key={index}>
            {list.map((info, index) => (
              <TaxonCell
                key={index}
                {...info}
                rank={rank}
                isFolded={isFolded}
              />
            ))}
          </MediumTaxonWrapper>
        ))}
      </AllTaxonWrapper>
      {isFolded && (
        <FoldedCover onClick={onClickRank}>
          <span>{capitalizeFirstLetter(rank)}</span>
        </FoldedCover>
      )}
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  position: "relative",
  height: "100%",
  minHeight: "72px",
  transitionDuration: "0.4s",
  transitionTimingFunction: Ease._4_IN_OUT_QUART,
  overflow: "hidden",
  width: "200px",
});

const foldedStyle: SxProps = {
  width: "36px",
};

const FoldedCover = styled("div")({
  width: "100%",
  height: "100%",
  backgroundColor: THEME.COLOR.WHITE,
  position: "absolute",
  top: 0,
  left: 0,
  paddingTop: "8px",
  paddingRight: "8px",
  cursor: "pointer",
  span: {
    display: "block",
    transformOrigin: "left top",
    transform: "translateX(24px) rotate(90deg)",
    fontWeight: THEME.FONT_WEIGHT.BOLD,
  },
});

const RankCell = styled("div")({
  cursor: "pointer",
  backgroundColor: THEME.COLOR.WHITE,
  height: "24px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "8px",
  fontWeight: THEME.FONT_WEIGHT.BOLD,
});

const AllTaxonWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  flexShrink: 0,
});

const MediumTaxonWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1px",
  flexShrink: 0,
});
