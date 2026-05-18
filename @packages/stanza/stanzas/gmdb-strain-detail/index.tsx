import React from "react";
import { TogoMediumReactStanza } from "../../components/providers/StanzaReactProvider";
import App from "./App";

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const strain_id = this.params.strain_id;
    return <App stanzaElement={this.root} strain_id={strain_id} />;
  }
}

type StanzaParameters = {
  strain_id: string;
};
