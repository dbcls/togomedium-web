import { SxProps, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC, useEffect, useMemo } from "react";
import { LineageRank } from "%api/mediaStrainsAlignment/definitions";
import { getLinkTarget } from "%core/network/getLinkTarget";
import { makeLinkPath } from "%core/network/makeLinkPath";
import { FilterIcon } from "%stanza/components/icons/FilterIcon";
import { useToolTipEnabled } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/components/MediaCell";
import { makeCellHeight } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/functions/processMediaCell";
import {
  useFilterTaxonMutators,
  useFilterTaxonState,
} from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/states/filterTaxon";
import { CellInfo } from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/types";
import { THEME } from "%stanza/styles/theme";
import { makeSpeciesName } from "%stanza/utils/string";

type Props = { rank: LineageRank; isFolded: boolean } & CellInfo;
type ToMemoizeProps = Props & { wrapperRef: React.RefObject<HTMLDivElement | null> };

export const TaxonCell: FC<Props> = (props) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!wrapperRef.current) return;
    const size = props.isFolded ? 1 : props.size;
    wrapperRef.current.style.height = makeCellHeight(size) + "px";
    // console.log("set height", size, props.id, props.isFolded);
  }, [props.size, props.isFolded]);
  return useMemo(
    () => (
      <ToMemoize
        {...props}
        wrapperRef={wrapperRef}
      />
    ),
    [props.id]
  );
};

const ToMemoize: FC<ToMemoizeProps> = ({ wrapperRef, label, id, rank }) => {
  const filterId = useFilterTaxonState();
  const pathRoot = rank === "strain" ? "/strain/" : "/taxon/";
  const { setFilterTaxon } = useFilterTaxonMutators();
  const onClickFilter = () => {
    setFilterTaxon(id);
  };
  const { labelRef, toolTipEnabled } = useToolTipEnabled();
  // console.log("render TaxonCell", rank, size);
  return (
    <Wrapper ref={wrapperRef}>
      {!!label && (
        <>
          <a
            href={makeLinkPath(`${pathRoot}${id}`)}
            target={getLinkTarget(`${pathRoot}${id}`)}
          >
            {id}
          </a>
          <div className={"label-wrapper"}>
            <Tooltip
              title={makeLabel(label, rank)}
              placement={"top"}
              arrow
              disableHoverListener={!toolTipEnabled}
              slotProps={{ popper: { disablePortal: true } }}
            >
              <span
                className={"label"}
                ref={labelRef}
              >
                {makeLabel(label, rank)}
              </span>
            </Tooltip>
          </div>
          <FilterIconWrapper onClick={onClickFilter}>
            <FilterIcon sx={id === filterId ? filterIconColorActive : filterIconColorInactive} />
          </FilterIconWrapper>
        </>
      )}
      {!label && <>{""}</>}
    </Wrapper>
  );
};

const makeLabel = (label: string, rank: LineageRank): string => {
  switch (rank) {
    case "strain":
      return makeSpeciesName(label);
    case "species":
      return makeSpeciesName(label);
    default:
      return label;
  }
};

const Wrapper = styled("div")({
  position: "relative",
  width: 200,
  display: "flex",
  flexDirection: "column",
  backgroundColor: THEME.COLOR.WHITE,
  padding: "8px 8px 0",
  fontSize: 14,
  "& a": {
    color: THEME.COLOR.PRIMARY,
    textDecoration: "none",
    width: "fit-content",
  },

  ".label-wrapper": {
    position: "relative",
  },

  ".label": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
    height: 16,
    flexShrink: 0,
  },
});

const FilterIconWrapper = styled("span")({
  width: 16,
  height: 16,
  position: "absolute",
  top: 8,
  right: 8,
  cursor: "pointer",
  svg: {
    display: "block",
    width: 16,
    height: 16,
  },
});
const filterIconColorInactive: SxProps = {
  fill: THEME.COLOR.GRAY400,
};
const filterIconColorActive: SxProps = {
  fill: THEME.COLOR.PRIMARY,
};
