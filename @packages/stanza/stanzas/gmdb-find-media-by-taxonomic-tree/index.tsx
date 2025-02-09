import React from "react";
import { TogoMediumReactStanza } from "%stanza/components/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/App";

type StanzaParameters = {};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    return <App stanzaElement={this.root} />;
  }
}
