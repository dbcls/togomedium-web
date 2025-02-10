import React, { FC, useEffect } from "react";
import { StanzaWrapper } from "%stanza/components/styled/StanzaWrapper";
import { NodeCanvas } from "%stanza/stanzas/gmdb-similar-media-node/components/NodeCanvas";
import { useGraphData } from "%stanza/stanzas/gmdb-similar-media-node/utils/useGraphData";

type Props = {
  gmId: string;
};

export const StanzaView: FC<Props> = ({ gmId }) => {
  const { graphData } = useGraphData(gmId);
  useEffect(() => {
    console.log(graphData);
  }, [graphData]);
  return (
    <StanzaWrapper>
      <NodeCanvas data={graphData} />
    </StanzaWrapper>
  );
};
