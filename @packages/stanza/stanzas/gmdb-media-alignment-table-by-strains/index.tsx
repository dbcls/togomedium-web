import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-media-alignment-table-by-strains/App";
import { readOptionalStringParameter, readStringParameter } from "%stanza/utils/parameters";
import { stringToArray } from "%stanza/utils/string";
import React from "react";

type StanzaParameters = {
  gm_ids: string;
  hide_media?: "true" | "false";
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const params = this.params;
    const gmIds = stringToArray(readStringParameter(params.gm_ids, "gm_ids"));
    const hideMedia = readOptionalStringParameter(params.hide_media, "hide_media") === "true";
    return <App {...{ hideMedia, gmIds, stanzaElement: this.root }} />;
  }
}
