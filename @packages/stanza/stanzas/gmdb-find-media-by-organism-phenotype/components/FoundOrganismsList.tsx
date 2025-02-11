import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { Pagination } from "%stanza/components/media-finder/Pagination";
import { OrganismListItem } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismListItem";
import { useOrganismList } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/hooks/useOrganismList";
import { useOrganismQuery } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/hooks/useOrganismQuery";
import { useOrganismPaginationMutators } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/organismPagination";
import { THEME } from "%stanza/styles/theme";

type Props = {};

export const FoundOrganismsList: FC<Props> = () => {
  const { data, isLoading, isPlaceholderData } = useOrganismQuery();
  const { list, toggleOrganismSelection } = useOrganismList(data);
  const { next, prev } = useOrganismPaginationMutators();

  return (
    <Wrapper>
      <div>
        {(isLoading || isPlaceholderData) && (
          <LoadingIndicator>
            <CircularProgress
              color="inherit"
              size={40}
            />
          </LoadingIndicator>
        )}
        <InfoText>{getInfoText(data?.total, isLoading)}</InfoText>
        <Inner>
          {(list ?? []).map((item) => (
            <OrganismListItem
              key={item.id}
              {...item}
              onClick={toggleOrganismSelection}
            />
          ))}
        </Inner>
        {!!data?.total && !isLoading && (
          <Pagination
            total={data.total}
            current={data.offset}
            displayLength={data.limit}
            onClickNext={next}
            onClickPrev={prev}
          />
        )}
      </div>
    </Wrapper>
  );
};

const getInfoText = (organismLength: number | undefined, isLoading: boolean): string => {
  if (isLoading) {
    return "Loading...";
  }
  if (!organismLength) {
    return "No organisms found";
  } else if (organismLength === 1) {
    return "1 organism found";
  } else {
    return `${organismLength} organisms found`;
  }
};

const Wrapper = styled("div")({
  position: "relative",
});

const InfoText = styled("p")({
  fontSize: "18px",
  fontWeight: THEME.FONT_WEIGHT.BOLD,
  marginBottom: THEME.SIZE.S1,
});

const Inner = styled("div")({
  maxHeight: "100%",
  overflowY: "auto",
});

const LoadingIndicator = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: THEME.COLOR.GRAY700,
});
