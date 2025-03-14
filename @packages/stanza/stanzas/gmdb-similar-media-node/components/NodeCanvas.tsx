import { styled } from "@mui/material/styles";
import React, { FC, useEffect, useRef } from "react";
import { THEME } from "%core/theme";
import { drawGraph } from "%stanza/stanzas/gmdb-similar-media-node/utils/drawGraph";
import { GraphData } from "%stanza/stanzas/gmdb-similar-media-node/utils/useGraphData";

type Props = { data: GraphData };

export const NodeCanvas: FC<Props> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    drawGraph(ref.current, data);
  }, [ref, data]);
  return <Wrapper ref={ref}></Wrapper>;
};

const Wrapper = styled("div")({
  background: THEME.COLOR.WHITE,
  minHeight: 600,
});
