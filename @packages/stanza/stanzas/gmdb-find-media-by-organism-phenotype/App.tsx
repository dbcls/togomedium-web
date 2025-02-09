import React, { FC } from "react";
import { AppContainer } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/AppContainer";

type Props = {
  stanzaElement?: ShadowRoot;
};

const App: FC<Props> = ({ stanzaElement }) => {
  const dispatchEvent = (gmIds: string[]) => {
    if (!stanzaElement) return;
    //
    stanzaElement.dispatchEvent(
      new CustomEvent("STANZA_RUN_ACTION", { bubbles: true, composed: true, detail: gmIds })
    );
  };

  return <AppContainer dispatchEvent={dispatchEvent} />;
};

export default App;
