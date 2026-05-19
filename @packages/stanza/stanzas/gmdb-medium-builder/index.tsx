import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-medium-builder/App";
import { appStore } from "%stanza/stanzas/gmdb-medium-builder/state/appStore";
import React from "react";

type StanzaParameters = {
  source_gm_id?: string;
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    this.reduxStore = appStore;
    const sourceGmId = this.params.source_gm_id;
    return <App sourceGmId={sourceGmId} />;
  }
}
