import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-component-detail/App";
import React from "react";

type StanzaParameters = {
  gmo_id: string;
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const gmo_id = this.params.gmo_id;
    return <App stanzaElement={this.root} gmo_id={gmo_id} />;
  }
}
