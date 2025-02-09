import React, { FC, useMemo, useState } from "react";
import { Pagination } from "%stanza/components/media-finder/Pagination";
import { OrganismListItem } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismListItem";
import {
  useSelectedOrganismsMutators,
  useSelectedOrganismsState,
} from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/states/selectedOrganisms";

type Props = {};

const SHOW_COUNT = 10;
export const SelectedOrganismsList: FC<Props> = () => {
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
    <div>
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
