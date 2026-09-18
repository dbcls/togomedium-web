import React from "react";
import { TogoMediumReactStanza } from "../../components/providers/StanzaReactProvider";
import { readStringParameter } from "../../utils/parameters";
import App from "./App";

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const strain_id = readStringParameter(this.params.strain_id, "strain_id");
    return <App stanzaElement={this.root} strain_id={strain_id} />;
  }
}

type StanzaParameters = {
  strain_id: string;
};
