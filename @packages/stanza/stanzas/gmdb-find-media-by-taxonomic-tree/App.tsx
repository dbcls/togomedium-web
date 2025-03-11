import React, { FC } from "react";
import { TaxonomyType } from "%core/types/TaxonomyType";
import { AppContainer } from "%stanza/stanzas/gmdb-find-media-by-taxonomic-tree/components/AppContainer";

type Props = {
  stanzaElement?: ShadowRoot;
  taxonomyType?: TaxonomyType;
};

const App: FC<Props> = ({ stanzaElement, taxonomyType = "NCBI" }) => {
  const dispatchEvent = (gmIds: string[]) => {
    if (!stanzaElement) return;
    //
    stanzaElement.dispatchEvent(
      new CustomEvent("STANZA_RUN_ACTION", { bubbles: true, composed: true, detail: gmIds })
    );
  };

  return (
    <AppContainer
      dispatchEvent={dispatchEvent}
      taxonomyType={taxonomyType === "GTDB" ? "GTDB" : "NCBI"}
    />
  );
};

export default App;
