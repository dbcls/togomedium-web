import { styled } from "@mui/material/styles";
import React, { FC, useEffect } from "react";
import { ActionPane } from "%stanza/components/media-finder/ActionPane";
import { FoundMediaList } from "%stanza/components/media-finder/FoundMediaList";
import { MediaTab } from "%stanza/components/media-finder/MediaTab";
import { SelectedMediaList } from "%stanza/components/media-finder/SelectedMediaList";
import { useFoundMediaState } from "%stanza/state/media-finder/foundMedia";
import {
  useMediaTabFocusMutators,
  useMediaTabFocusState,
} from "%stanza/state/media-finder/mediaTabFocus";
import { THEME } from "%stanza/styles/theme";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

export const MediaPane: FC<Props> = ({ dispatchEvent }) => {
  const { tabFocus } = useTabFocus();
  return (
    <Wrapper>
      <Media>
        <MediaTab />
        <Contents>
          {tabFocus === "Found media" && <FoundMediaList />}
          {tabFocus === "Selected media" && <SelectedMediaList />}
        </Contents>
      </Media>
      {tabFocus === "Selected media" && (
        <ActionPane
          actionLabel={"Compare media"}
          dispatchEvent={dispatchEvent}
        />
      )}
    </Wrapper>
  );
};

const useTabFocus = () => {
  const tabFocus = useMediaTabFocusState();
  const { setMediaTabFocus } = useMediaTabFocusMutators();
  const foundMedia = useFoundMediaState();
  useEffect(() => {
    setMediaTabFocus("Found media");
  }, [foundMedia]);
  return { tabFocus };
};

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  gap: THEME.SIZE.S1,
});

const Media = styled("div")({
  padding: THEME.SIZE.S1,
  borderRadius: THEME.ROUND.BASE,
  backgroundColor: THEME.COLOR.WHITE,
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
});

const Contents = styled("div")({
  paddingBlock: THEME.SIZE.S2,
  paddingInline: THEME.SIZE.S1,
  flexGrow: 1,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
});
