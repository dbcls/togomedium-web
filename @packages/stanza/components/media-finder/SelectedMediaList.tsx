import React, { FC, useMemo, useState } from "react";
import { MediaListItem } from "%stanza/components/media-finder/MediaListItem";
import { Pagination } from "%stanza/components/media-finder/Pagination";
import {
  useSelectedMediaMutators,
  useSelectedMediaState,
} from "%stanza/state/media-finder/selectedMedia";

type Props = {};

const SHOW_COUNT = 10;
export const SelectedMediaList: FC<Props> = () => {
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
    <div>
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
