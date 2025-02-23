import React from "react";
import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/App";
import { stringToArray } from "%stanza/utils/string";

type StanzaParameters = {
  gm_ids: string;
  hide_media?: "true" | "false";
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const gmIds = stringToArray(this.params.gm_ids);
    const hideMedia = this.params.hide_media === "true";
    return <App {...{ hideMedia, gmIds, stanzaElement: this.root }} />;
  }
}
