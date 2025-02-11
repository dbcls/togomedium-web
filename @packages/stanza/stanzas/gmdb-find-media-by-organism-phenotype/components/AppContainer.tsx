import React, { FC } from "react";
import { MediaPane } from "%stanza/components/media-finder/MediaPane";
import { AppWrapper } from "%stanza/components/styled/AppWrapper";
import { QueryPane } from "%stanza/components/styled/QueryPane";
import { SubPane } from "%stanza/components/styled/SubPane";
import { OrganismPane } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/OrganismPane";
import { PhenotypeSection } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/PhenotypeSection";
import { useMediaLoadFromOrganismSelection } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/hooks/useMediaLoadFromOrganismSelection";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
};

export const AppContainer: FC<Props> = ({ dispatchEvent }) => {
  useMediaLoadFromOrganismSelection();
  return (
    <AppWrapper>
      <QueryPane>
        <PhenotypeSection />
      </QueryPane>
      <SubPane>
        <OrganismPane />
      </SubPane>
      <SubPane>
        <MediaPane dispatchEvent={dispatchEvent} />
      </SubPane>
    </AppWrapper>
  );
};
