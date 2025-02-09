import React, { FC } from "react";
import { ComponentSelect } from "%stanza/stanzas/gmdb-find-media-by-components/components/ComponentSelect";
import { useSelectedAttributesMutators } from "%stanza/stanzas/gmdb-find-media-by-components/states/selectedAttributes";

type Props = {};

export const AttributesSection: FC<Props> = () => {
  const { setSelectedAttributes } = useSelectedAttributesMutators();
  const onChangeSelection = (ids: string[]) => {
    setSelectedAttributes({ gmo_ids: ids });
  };

  return (
    <div>
      <ComponentSelect onChangeSelection={onChangeSelection} />
    </div>
  );
};
