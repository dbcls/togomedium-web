import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-medium-builder/App";
import React from "react";

type StanzaParameters = {};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    return <App />;
  }
}
