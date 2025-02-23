import React from "react";
import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-media-alignment-table-by-components/App";
import { stringToArray } from "%stanza/utils/string";

type StanzaParameters = {
  gm_ids: string;
  prioritized_tax_ids?: string;
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const gm_ids = stringToArray(this.params.gm_ids);
    const prioritizedOrganism = this.params.prioritized_tax_ids
      ? stringToArray(this.params.prioritized_tax_ids)
      : [];
    return <App {...{ gm_ids, stanzaElement: this.root, prioritizedOrganism }} />;
  }
}
