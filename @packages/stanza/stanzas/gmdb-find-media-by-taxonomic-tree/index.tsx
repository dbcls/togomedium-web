import React from "react";
import App from "./App";
import { TogoMediumReactStanza } from "../../components/StanzaReactProvider";

type StanzaParameters = {};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    return <App stanzaElement={this.root} />;
  }
}
