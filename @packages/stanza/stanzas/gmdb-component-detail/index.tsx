import React from "react";
import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-component-detail/App";

type StanzaParameters = {
  gmo_id: string;
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const gmo_id = this.params.gmo_id;
    return (
      <App
        stanzaElement={this.root}
        gmo_id={gmo_id}
      />
    );
  }
}
