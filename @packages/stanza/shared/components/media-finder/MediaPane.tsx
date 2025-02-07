import { css } from "@emotion/react";
import React, { FC, useEffect } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { ActionPane } from "./ActionPane";
import { FoundMediaList } from "./FoundMediaList";
import { MediaTab } from "./MediaTab";
import { SelectedMediaList } from "./SelectedMediaList";
import { useFoundMediaState } from "../../state/media-finder/foundMedia";
import {
  useMediaTabFocusMutators,
  useMediaTabFocusState,
} from "../../state/media-finder/mediaTabFocus";
import { COLOR_WHITE, ROUNDED_CORNER, SIZE1, SIZE2 } from "../../styles/variables";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
} & AcceptsEmotion;

export const MediaPane: FC<Props> = ({ css, className, dispatchEvent }) => {
  const { tabFocus } = useTabFocus();
  return (
    <div css={wrapper}>
      <div
        css={[media, css]}
        className={className}
      >
        <MediaTab />
        <div css={contents}>
          {tabFocus === "Found media" && <FoundMediaList />}
          {tabFocus === "Selected media" && <SelectedMediaList />}
        </div>
      </div>
      {tabFocus === "Selected media" && (
        <ActionPane
          actionLabel={"Compare media"}
          dispatchEvent={dispatchEvent}
        />
      )}
    </div>
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

const wrapper = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: ${SIZE1};
`;

const media = css`
  ${ROUNDED_CORNER};
  padding: ${SIZE1};
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const contents = css`
  padding: ${SIZE2} ${SIZE1};
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;
