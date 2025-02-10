import React from "react";
import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-find-media-by-components/App";

type StanzaParameters = {};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    return <App stanzaElement={this.root} />;
  }
}
