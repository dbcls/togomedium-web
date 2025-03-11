import React from "react";
import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/App";
import { TaxonomyType } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/states/taxonomyType";

type StanzaParameters = {
  taxonomy_type: TaxonomyType;
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const params = this.params as StanzaParameters;
    const taxonomyType = params?.taxonomy_type;
    return (
      <App
        stanzaElement={this.root}
        taxonomyType={taxonomyType}
      />
    );
  }
}
