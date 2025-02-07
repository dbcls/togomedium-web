import { css } from "@emotion/react";
import React, { FC, useMemo, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { MediaListItem } from "./MediaListItem";
import { Pagination } from "./Pagination";
import {
  useSelectedMediaMutators,
  useSelectedMediaState,
} from "../../state/media-finder/selectedMedia";

type Props = {} & AcceptsEmotion;

const SHOW_COUNT = 10;
export const SelectedMediaList: FC<Props> = ({ css, className }) => {
  const selectedMedia = useSelectedMediaState();
  const { toggleMediumSelection } = useSelectedMediaMutators();
  const [current, setCurrent] = useState<number>(0);
  const next = () => {
    setCurrent(current + SHOW_COUNT);
  };
  const prev = () => {
    setCurrent(current - SHOW_COUNT);
  };
  const data = useMemo(
    () => selectedMedia.filter((_, i) => i >= current).filter((_, i) => i < SHOW_COUNT),
    [selectedMedia, current]
  );

  return (
    <div
      css={[selectedMediaList, css]}
      className={className}
    >
      <div>
        {data.map((item) => (
          <MediaListItem
            key={item.id}
            {...item}
            isChecked={true}
            onClick={() => {
              toggleMediumSelection(item);
            }}
          />
        ))}
      </div>
      {!!selectedMedia.length && (
        <Pagination
          total={selectedMedia.length}
          current={current}
          displayLength={SHOW_COUNT}
          onClickNext={next}
          onClickPrev={prev}
        />
      )}
    </div>
  );
};

const selectedMediaList = css``;
