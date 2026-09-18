import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-similar-media-node/App";
import { readStringParameter } from "%stanza/utils/parameters";
import React from "react";

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const gmId = readStringParameter(this.params.gm_id, "gm_id");
    return <App stanzaElement={this.root} gmId={gmId} />;
  }
}

type StanzaParameters = {
  gm_id: string;
};
