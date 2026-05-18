import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-medium-builder/App";
import { appStore } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import React from "react";

type StanzaParameters = {
  gm_id?: string;
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    this.reduxStore = appStore;
    const gmId = this.params.gm_id;
    return <App gmId={gmId} />;
  }
}
