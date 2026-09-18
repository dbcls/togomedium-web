import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-media-alignment-table-by-components/App";
import { readOptionalStringParameter, readStringParameter } from "%stanza/utils/parameters";
import { stringToArray } from "%stanza/utils/string";
import React from "react";

type StanzaParameters = {
  gm_ids: string;
  prioritized_tax_ids?: string;
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const params = this.params;
    const gm_ids = stringToArray(readStringParameter(params.gm_ids, "gm_ids"));
    const prioritizedTaxIds = readOptionalStringParameter(
      params.prioritized_tax_ids,
      "prioritized_tax_ids",
    );
    const prioritizedOrganism = prioritizedTaxIds ? stringToArray(prioritizedTaxIds) : [];
    return <App {...{ gm_ids, stanzaElement: this.root, prioritizedOrganism }} />;
  }
}
