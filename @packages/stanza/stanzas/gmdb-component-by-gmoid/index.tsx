import React from "react";
import App from "./App";
import { TogoMediumReactStanza } from "../../components/StanzaReactProvider";

type StanzaParameters = {
  gmo_id: string;
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const gmo_id = this.params.gmo_id;
    return <App stanzaElement={this.root} gmo_id={gmo_id} />;
  }
}
