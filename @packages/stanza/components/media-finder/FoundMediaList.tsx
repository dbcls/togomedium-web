import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import React, { FC, useEffect, useState } from "react";
import { THEME } from "%core/theme";
import { MediaListItem, MediaListItemInfo } from "%stanza/components/media-finder/MediaListItem";
import { Pagination } from "%stanza/components/media-finder/Pagination";
import { QueryInfo } from "%stanza/components/media-finder/QueryInfo";
import { useFoundMediaState } from "%stanza/state/media-finder/foundMedia";
import { useIsMediaLoadingState } from "%stanza/state/media-finder/isMediaLoading";
import { useMediaPaginationMutators } from "%stanza/state/media-finder/mediaPagination";
import {
  useSelectedMediaMutators,
  useSelectedMediaState,
} from "%stanza/state/media-finder/selectedMedia";
import { hasIdOfLabel, LabelInfo } from "%stanza/utils/labelInfo";

type Props = {};

export const FoundMediaList: FC<Props> = () => {
  const { next, prev } = useMediaPaginationMutators();
  const { data, toggleChecked, isLoading, response } = useFoundMedia();
  return (
    <Wrapper>
      <QueryInfo />
      <InfoText>{getInfoText(response.total, isLoading)}</InfoText>
      <ListWrapper>
        {isLoading && (
          <LoadingIndicator>
            <CircularProgress
              color="inherit"
              size={40}
            />
          </LoadingIndicator>
        )}
        <div>
          {data.map((item) => (
            <MediaListItem
              key={item.id}
              {...item}
              onClick={toggleChecked}
            />
          ))}
        </div>
        {!!response.total && !isLoading && (
          <Pagination
            total={response.total}
            current={response.offset}
            displayLength={response.limit}
            onClickNext={next}
            onClickPrev={prev}
          />
        )}
      </ListWrapper>
    </Wrapper>
  );
};

const useFoundMedia = () => {
  const [data, setData] = useState<MediaListItemInfo[]>([]);
  const response = useFoundMediaState();
  const isLoading = useIsMediaLoadingState();
  const selectedMedia = useSelectedMediaState();
  const { toggleMediumSelection } = useSelectedMediaMutators();
  const toggleChecked = (info: LabelInfo) => {
    toggleMediumSelection(info);
  };

  useEffect(() => {
    const result: MediaListItemInfo[] = response.contents.map((medium) => {
      return {
        id: medium.gm_id,
        label: medium.name,
        isChecked: hasIdOfLabel(selectedMedia, medium.gm_id),
      };
    });
    setData(result);
  }, [response, selectedMedia]);

  return { data, toggleChecked, isLoading, response };
};

const Wrapper = styled("div")({
  backgroundColor: THEME.COLOR.WHITE,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  flexGrow: 1,
});

const ListWrapper = styled("div")({
  maxHeight: "100%",
  position: "relative",
});

const InfoText = styled("p")({
  fontSize: "18px",
  fontWeight: THEME.FONT_WEIGHT.BOLD,
  marginTop: THEME.SIZE.S3,
  marginBottom: THEME.SIZE.S1,
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

const getInfoText = (mediaLength: number, isLoading: boolean): string => {
  if (isLoading) {
    return "Loading...";
  }
  if (mediaLength === 0) {
    return "No media found";
  } else if (mediaLength === 1) {
    return "1 medium found";
  } else {
    return `${mediaLength} media found`;
  }
};
