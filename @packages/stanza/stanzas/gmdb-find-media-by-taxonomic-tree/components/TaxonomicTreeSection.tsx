import React, { FC } from "react";
import { TaxonomicTreeBranch } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/TaxonomicTreeBranch";

type Props = {};

export const TaxonomicTreeSection: FC<Props> = () => {
  return (
    <div>
      <div>
        <TaxonomicTreeBranch id="2157" />
        <TaxonomicTreeBranch id="2" />
        <TaxonomicTreeBranch id="2759" />
      </div>
    </div>
  );
};
