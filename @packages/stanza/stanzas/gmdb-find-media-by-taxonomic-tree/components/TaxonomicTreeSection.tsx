import React, { FC, useMemo } from "react";
import { TaxonomicTreeBranch } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TaxonomicTreeBranch";
import {
  gtdbSuperkingdoms,
  ncbiSuperkingdoms,
  TaxonInfo,
} from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/taxonList";
import { useTaxonomyType } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/taxonomyType";
import { LoadingCover } from "%stanza/stanzas/gmdb-meta-list/components/LoadingCover";

type Props = {
  showLoading: boolean;
};

export const TaxonomicTreeSection: FC<Props> = ({ showLoading }) => {
  const type = useTaxonomyType();
  const superKingdoms = useMemo<TaxonInfo[]>(() => {
    return type === "GTDB" ? gtdbSuperkingdoms : ncbiSuperkingdoms;
  }, [type]);
  return (
    <div style={{ position: "relative" }}>
      <LoadingCover
        showLoading={showLoading}
        errorMessage={""}
      />
      <div>
        {superKingdoms.map((superKingdom) => (
          <TaxonomicTreeBranch
            key={superKingdom.id}
            id={superKingdom.id}
          />
        ))}
      </div>
    </div>
  );
};
