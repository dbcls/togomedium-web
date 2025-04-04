import React from "react";
import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-taxon-detail/App";

type StanzaParameters = {
  tax_id: string;
};
export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const tax_id = this.params.tax_id;
    return (
      <App
        stanzaElement={this.root}
        tax_id={tax_id}
      />
    );
  }
}
