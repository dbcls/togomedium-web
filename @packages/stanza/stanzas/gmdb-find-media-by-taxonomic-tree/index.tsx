import { TaxonomyType } from "%core/types/TaxonomyType";
import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/App";
import { readOptionalStringParameter } from "%stanza/utils/parameters";
import React from "react";

type StanzaParameters = {
  taxonomy_type?: TaxonomyType;
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const taxonomyType = readOptionalStringParameter(this.params.taxonomy_type, "taxonomy_type");
    if (taxonomyType !== undefined && taxonomyType !== "NCBI" && taxonomyType !== "GTDB") {
      throw new TypeError('Stanza parameter "taxonomy_type" must be "NCBI" or "GTDB".');
    }
    return <App stanzaElement={this.root} taxonomyType={taxonomyType} />;
  }
}
