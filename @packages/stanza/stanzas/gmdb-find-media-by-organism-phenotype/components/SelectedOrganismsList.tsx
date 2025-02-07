import { css } from "@emotion/react";
import React, { FC, useEffect, useMemo, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { OrganismListItem } from "./OrganismListItem";
import { Pagination } from "../../../shared/components/media-finder/Pagination";
import { LabelInfo } from "../../../shared/utils/labelInfo";
import {
  useSelectedOrganismsMutators,
  useSelectedOrganismsState,
} from "../states/selectedOrganisms";

type Props = {} & AcceptsEmotion;

const SHOW_COUNT = 10;
export const SelectedOrganismsList: FC<Props> = ({ css, className }) => {
  const selectedOrganisms = useSelectedOrganismsState();
  const { toggleOrganismSelection } = useSelectedOrganismsMutators();
  const [current, setCurrent] = useState<number>(0);
  const next = () => {
    setCurrent(current + SHOW_COUNT);
  };
  const prev = () => {
    setCurrent(current - SHOW_COUNT);
  };
  const data = useMemo(
    () => selectedOrganisms.filter((item, i) => i >= current).filter((item, i) => i < SHOW_COUNT),
    [selectedOrganisms, current]
  );
  return (
    <div
      css={[selectedOrganismsList, css]}
      className={className}
    >
      <div>
        {data.map((item) => (
          <OrganismListItem
            key={item.id}
            {...item}
            isChecked={true}
            onClick={() => {
              toggleOrganismSelection(item);
            }}
          />
        ))}
      </div>
      {!!selectedOrganisms.length && (
        <Pagination
          total={selectedOrganisms.length}
          current={current}
          displayLength={SHOW_COUNT}
          onClickNext={next}
          onClickPrev={prev}
        />
      )}
    </div>
  );
};

const selectedOrganismsList = css``;
