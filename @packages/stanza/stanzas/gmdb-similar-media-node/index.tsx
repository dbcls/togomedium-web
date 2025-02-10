import React from "react";
import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-similar-media-node/App";

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const gmId = this.params.gm_id;
    return (
      <App
        stanzaElement={this.root}
        gmId={gmId}
      />
    );
  }
}

type StanzaParameters = {
  gm_id: string;
};
