import React, { FC } from "react";
import { MediaPane } from "%stanza/components/media-finder/MediaPane";
import { AppWrapper } from "%stanza/components/styled/AppWrapper";
import { QueryPane } from "%stanza/components/styled/QueryPane";
import { SubPane } from "%stanza/components/styled/SubPane";
import { AttributesSection } from "%stanza/stanzas/gmdb-find-media-by-components/components/AttributesSection";
import { useMediaLoadFromComponents } from "%stanza/stanzas/gmdb-find-media-by-components/hooks/useMediaLoadFromComponents";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

export const AppContainer: FC<Props> = ({ dispatchEvent }) => {
  useMediaLoadFromComponents();
  return (
    <AppWrapper>
      <QueryPane>
        <AttributesSection />
      </QueryPane>
      <SubPane>
        <MediaPane dispatchEvent={dispatchEvent} />
      </SubPane>
    </AppWrapper>
  );
};
