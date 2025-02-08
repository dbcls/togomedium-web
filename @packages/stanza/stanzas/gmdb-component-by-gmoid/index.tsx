import React from "react";
import { TogoMediumReactStanza } from "%stanza/components/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-component-by-gmoid/App";

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
