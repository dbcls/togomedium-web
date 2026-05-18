import { StanzaView } from "%stanza/stanzas/gmdb-similar-media-node/components/StanzaView";
import React, { FC } from "react";

type Props = {
  stanzaElement?: ShadowRoot;
  gmId: string;
};

const App: FC<Props> = ({ gmId }) => {
  return <StanzaView gmId={gmId} />;
};

export default App;
