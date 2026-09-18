import { TogoMediumReactStanza } from "%stanza/components/providers/StanzaReactProvider";
import App from "%stanza/stanzas/gmdb-meta-list/App";
import { readOptionalStringParameter, readStringParameter } from "%stanza/utils/parameters";
import React from "react";

export type StanzaParameters = {
  api_url: string;
  limit?: string;
  title?: string;
  column_names?: string;
  column_sizes?: string;
  web_font?: string;
};
export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const params = this.params;
    const apiUrl = readStringParameter(params.api_url, "api_url");
    const limit = parseInt(readOptionalStringParameter(params.limit, "limit") ?? "20");
    const title = readOptionalStringParameter(params.title, "title") ?? "";
    const columNames = readOptionalStringParameter(params.column_names, "column_names") === "true";
    const columnSizes = (readOptionalStringParameter(params.column_sizes, "column_sizes") ?? "")
      .split(",")
      .map((s) => parseInt(s));
    const webFont =
      readOptionalStringParameter(params.web_font, "web_font") ?? "Fira Sans Condensed";
    return (
      <App
        stanzaElement={this.root}
        apiUrl={apiUrl}
        initialLimit={limit}
        title={title}
        showColumnNames={columNames}
        columnSizes={columnSizes}
        webFont={webFont}
      />
    );
  }
}
