import { THEME } from "%core/theme";
import { PhenotypeSearchArea } from "%stanza/stanzas/gmdb-find-media-by-organism-phenotype/components/PhenotypeSearchArea";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";

type Props = {};

export const PhenotypeSection: FC<Props> = () => {
  return (
    <Wrapper>
      <PhenotypeSearchArea />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  backgroundColor: THEME.COLOR.WHITE,
  flexGrow: 1,
});
