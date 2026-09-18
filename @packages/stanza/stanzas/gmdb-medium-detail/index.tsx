import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import { App } from "%stanza/stanzas/gmdb-medium-detail/App";
import { readStringParameter } from "%stanza/utils/parameters";

type StanzaParameters = {
  gm_id: string;
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const gm_id = readStringParameter(this.params.gm_id, "gm_id");
    return <App gm_id={gm_id} />;
  }
}
